<template>
	<div :id="chartDivId">
		<ChartLegend id="chart-legend" />
		<ToolTipItem ref="tooltip" :id="tooltipDivId" class="chart-tooltip" :item="toolTipData" />
		<ChartControlBar
			class="chart-controls"
			:min-zoom-level="zoomLevels[0]"
			:max-zoom-level="zoomLevels[1]"
			@zoomIn="onZoomIn"
			@zoomOut="onZoomOut"
			@resetZoom="onResetZoom"
		/>
	</div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import d3 from '../../../plugins/d3-importer';
import ToolTipItem from './ToolTipItem.vue';
import colors from '../../../plugins/colors';
import ChartControlBar from './ChartControlBar.vue';
import ChartLegend from './ChartLegend.vue';

export default {
	name: 'Chart',
	components: { ChartControlBar, ChartLegend, ToolTipItem },
	props: {
		chartDivId: {
			type: String,
			default: 'cranach-chart',
		},
		tooltipDivId: {
			type: String,
			default: 'cranach-chart-tooltip',
		},
		height: {
			type: Number,
			default: 700,
		},
		width: {
			type: Number,
			default: 1780,
		},
		minHeight: {
			type: Number,
			default: 200,
		},
		minWidth: {
			type: Number,
			default: 200,
		},
		margin: {
			type: Object,
			default: () => ({
				left: 30,
				right: 30,
				top: 10,
				bottom: 20,
			}),
		},
		isZoomActive: {
			type: Boolean,
			default: true,
		},
	},
	data() {
		return {
			x: null,
			y: null,
			xAxis: null,
			yAxis: null,
			gX: null,
			gY: null,
			svg: null,
			scatterPlot: null,
			zoom: null,
			tooltipDiv: null,
			toolTipData: {},
			maxSymbolSizeInPx: 36,
			zoomLevels: [1, 10],
			chartLegendHeight: 30,
		};
	},
	mounted() {
		this.$watch(
			() => ((this.width, this.height, Date.now())), () => {
				d3.select(`#${this.chartDivId}`).selectAll('svg').remove();
				this.setUpChart();
			},
		);
		this.$watch(
			() => ((this.isZoomActive, this.items, Date.now())), () => {
				this.reset();
			},
		);
		this.setUpChart();
	},
	computed: {
		...mapState({
			items: (state) => state.items,
			lastTransform: (state) => state.chartZoomTransform,
			yearFilter: (state) => state.activeFilters.find((f) => f.name === 'yearFilter'),
		}),
		svgWidth() {
			return this.minWidth < this.width ? this.width : this.minWidth;
		},
		svgHeight() {
			return this.minHeight < this.height ? this.height - this.chartLegendHeight : this.minHeight;
		},
		displayWidth() {
			return this.svgWidth - this.margin.left - this.margin.right;
		},
		displayHeight() {
			return this.svgHeight - this.margin.top - this.margin.bottom;
		},
		colors() {
			return this.$vuetify.theme.isDark ? this.$vuetify.theme.themes.dark : this.$vuetify.theme.themes.light;
		},
	},
	watch: {
		yearFilter: 'onResetZoom',
	},
	methods: {
		...mapMutations([
			'setChartZoomTransform',
		]),
		...mapGetters([
			'getXAxisDomain',
		]),
		setUpChart() {
			this.setupSvg();
			this.setupDimensions();
			this.updateChart();
		},
		setupSvg() {
			// Our svg size includes the margins
			this.svg = d3.select(`#${this.chartDivId}`)
				.style('position', 'relative')
				.style('height', `${this.height}px`)
				.append('svg')
				.attr('width', this.svgWidth)
				.attr('height', this.svgHeight)
				.append('g')
				.on('touchstart', this.dismissToolTip, { passive: true });

			// Define the div for the tooltip
			this.tooltipDiv = d3.select(`#${this.tooltipDivId}`).style('visibility', 'hidden');
		},
		setupDimensions() {
			// This transparent background rectangle gives user something to click & drag.
			this.svg.append('rect')
				.attr('width', this.displayWidth)
				.attr('height', this.displayHeight)
				.style('fill', 'transparent')
				.attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);
			// This clip path is used to crop/hide data items on zooming. This is the view box of all items.
			this.svg.append('defs').append('svg:clipPath')
				.attr('id', 'clip')
				.append('svg:rect')
				.attr('width', this.displayWidth)
				.attr('height', this.displayHeight);
		},
		updateChart() {
			if (this.items.length < 1) {
				return;
			}

			this.setupAxis();
			this.setupZoom();

			this.scatterPlot = this.svg.append('g')
				.attr('id', 'scatterPlot')
				.attr('clip-path', 'url(#clip)')
				.attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

			const node = this.scatterPlot.selectAll('.dot')
				.data(this.items)
				.enter()
				.append('g')
				.attr('class', (d) => `dot dot-${d.id}`)
				.attr('transform', (d) => `translate(${this.getXCoordinateOfItem(d)},${this.getYCoordinateOfItem(d)})`);
			node.append('path')
				.attr('d', this.getItemSymbol())
				.attr('opacity', (d) => (d.imageUrl ? 1 : 0.5))
				.attr('fill', (d) => colors.getCategoryColors()[d.type])
				.on('touchstart mouseover', (event, d) => {
					event.preventDefault();
					const isTouchEvent = event.type === 'touchstart';

					if (isTouchEvent) {
						event.stopPropagation();
						this.dismissToolTip();
					}

					d3.select(`.dot-${d.id} path`)
						.attr('stroke', this.colors.primary)
						.attr('stroke-width', 0.5)
						.attr('stroke-opacity', 0.6)
						.attr('transform', 'scale(1.5)');

					this.toolTipData = d;
					this.toolTipData.isTouchDevice = isTouchEvent;

					let pageX;
					let pageY;
					const boundingRect = d3.select(`#${this.chartDivId}`).node().getBoundingClientRect();
					if (isTouchEvent) {
						pageX = event.touches[0].pageX - boundingRect.x;
						pageY = event.touches[0].pageY - event.touches[0].radiusY - boundingRect.y;
					} else {
						pageX = event.pageX - boundingRect.x;
						pageY = event.pageY - boundingRect.y;
					}

					const left = window.innerWidth - pageX > this.$refs.tooltip.maxToolTipWidth
						? pageX
						: window.innerWidth - this.$refs.tooltip.maxToolTipWidth;
					const xOffset = this.calculateToolTipXOffset(pageX, this.$refs.tooltip.maxToolTipWidth);
					const yOffset = this.calculateToolTipYOffset(pageY, this.$refs.tooltip.maxToolTipHeight);

					this.tooltipDiv
						.style('left', `${left}px`)
						.style('top', `${pageY}px`)
						.style('transform', `translate(${xOffset}%, ${yOffset}px)`)
						.style('visibility', 'visible')
						.style('pointer-events', isTouchEvent ? '' : 'none');
				}, { passive: false })
				.on('touchend', (event) => event.preventDefault(), { passive: false })
				.on('mouseout', this.dismissToolTip, { passive: true })
				.on('click', () => {
					if (this.toolTipData.type !== 'graphic') {
						window.open(`${this.toolTipData.detailUrl}`, '_blank');
					}
				}, { passive: true });
		},
		setupAxis() {
			const yStack = {};
			const yMinMax = d3.extent(this.items, (d) => {
				const sortingYear = d.sortingDate ? Math.floor(d.sortingDate) : d.startDate;
				yStack[sortingYear] = (yStack[sortingYear] || 0) + 1;
				// eslint-disable-next-line no-param-reassign
				d.yPos = yStack[sortingYear];
				return d.yPos;
			});

			/* X Axis */
			const [start, end] = this.getXAxisDomain();
			this.x = d3.scaleTime()
				.domain([
					new Date(start, 0, 1),
					new Date(end, 0, 1),
				])
				.range([0, this.displayWidth]);

			this.xAxis = d3.axisBottom(this.x);

			this.gX = this.svg.append('g')
				.classed('axis xaxis', true)
				.attr('transform', `translate(${this.margin.left},${this.svgHeight - this.margin.bottom})`)
				.call(this.xAxis);

			/* Y Axis */
			this.y = d3.scaleLinear()
				.domain([0.5, yMinMax[1] + 1])
				.range([this.displayHeight, 0]);

			this.yAxis = d3.axisLeft(this.y)
				.tickFormat((t) => (Math.floor(t) - t !== 0 ? '' : t));

			this.gY = this.svg.append('g')
				.classed('axis yaxis', true)
				.attr('transform', `translate(${this.margin.left},${this.margin.top})`)
				.call(this.yAxis);
		},
		setupZoom() {
			if (!this.isZoomActive) {
				return;
			}
			const extend = [[0, 0], [this.displayWidth, this.displayHeight]];
			this.zoom = d3.zoom()
				.extent(extend)
				.translateExtent(extend)
				.scaleExtent(this.zoomLevels)
				.on('zoom', this.zoomed);
			this.svg.call(this.zoom)
				.on('wheel.zoom', null)
				.on('dblclick.zoom', null);
		},
		zoomed(event) {
			const { transform } = event;
			// --- scaling axes to transformed value
			this.gX.call(this.xAxis.scale(transform.rescaleX(this.x)));
			this.gY.call(this.yAxis.scale(transform.rescaleY(this.y)));

			// --- apply transform on each item in chart
			const node = this.scatterPlot.selectAll('.dot')
				.attr(
					'transform',
					(d) => `translate(${transform.applyX(this.getXCoordinateOfItem(d))},${transform.applyY(this.getYCoordinateOfItem(d))})`,
				);

			// --- rescale symbol of items in chart
			node.selectAll('path').attr('d', this.getItemSymbol());
			// save transform to reset it when filters are applied
			this.setChartZoomTransform(transform);
		},
		calculateItemSymbolSize() {
			if (this.scatterPlot === null || this.scatterPlot.node() === null) {
				return 6;
			}
			const symbolYPadding = 1;
			const boundingRect = this.scatterPlot.node().getBoundingClientRect();
			const heightDiff = Math.max(0, boundingRect.height - this.displayHeight);
			const pxSizeByHeight = Math.floor((this.displayHeight + heightDiff) / this.y.domain()[1]) - symbolYPadding;

			const symbolXPadding = 3;
			const [from, to] = this.x.domain();
			const widthDiff = Math.max(0, boundingRect.width - this.displayWidth);
			const pxSizeByWidth = Math.floor((this.displayWidth + widthDiff) / (to.getFullYear() - from.getFullYear())) - symbolXPadding;

			return Math.min(...[pxSizeByHeight, pxSizeByWidth, this.maxSymbolSizeInPx]);
		},
		getItemSymbol() {
			const size = this.calculateItemSymbolSize();
			return d3.symbol().type(d3.symbolSquare).size(size ** 2);
		},
		dismissToolTip() {
			d3.select(`.dot-${this.toolTipData.id} path`)
				.attr('stroke', 'none')
				.attr('transform', 'scale(1)');

			this.toolTipData = {};
			this.tooltipDiv.style('visibility', 'hidden');
		},
		calculateToolTipXOffset(mouseX, toolTipWidth) {
			let xOffset = -50;
			const toolTipHalfWidth = toolTipWidth / 2;

			if (mouseX - toolTipHalfWidth < 0) {
				xOffset = ((mouseX - this.margin.left) / toolTipWidth) * -100;
			} else if (mouseX + toolTipHalfWidth > window.innerWidth) {
				xOffset = 0;
			}

			return xOffset;
		},
		calculateToolTipYOffset(mouseY, toolTipHeight, margin = 10) {
			if (mouseY - toolTipHeight - margin < 0) {
				return margin;
			}
			return -toolTipHeight - margin;
		},
		getXCoordinateOfItem({ sortingDate, startDate }) {
			const sortingYear = sortingDate ? Math.floor(sortingDate) : startDate;
			return this.x(new Date(sortingYear, 1, 1)) - 1;
		},
		getYCoordinateOfItem({ yPos }) {
			return this.y(yPos);
		},
		reset() {
			d3.selectAll('.dot').remove();
			d3.selectAll('#scatterPlot').remove();
			d3.selectAll('.axis').remove();
			this.updateChart();
			this.svg.call(this.zoom.transform, this.lastTransform);
		},
		onZoomIn() {
			this.svg.call(this.zoom.scaleBy, 1.2);
		},
		onZoomOut() {
			this.svg.call(this.zoom.scaleBy, 0.8);
		},
		onResetZoom() {
			this.svg.call(this.zoom.transform, d3.zoomIdentity);
		},
	},
};
</script>

<style lang="scss">
#cranach-chart svg {
	touch-action: pan-y !important;
}
.axis.xaxis text {
	fill: var(--v-primary-lighten1);
}

.axis.yaxis text {
	fill: var(--v-primary-lighten1);
}

.axis path,
.axis line {
	fill: none;
	stroke: var(--v-primary-lighten5);
	shape-rendering: crispEdges;
}

.x.axis path {
	display: none;
}

.chart-tooltip {
	position: absolute;
	top: 0;
	left: 0;
	overflow: hidden;
	z-index: 999999;
}

.chart-controls{
	position: absolute;
	right: 0;
	z-index: 999999;
}
</style>
