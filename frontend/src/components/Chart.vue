<!--suppress CommaExpressionJS -->
<template>
	<div>
		<v-btn @click="resetZoom" class="mb-4">
			Reset Zoom
		</v-btn>
		<div id="umf-d3-chart"></div>
		<ToolTipItem :id="tooltipDivId" class="d3-tooltip" :item="toolTipData"/>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import { event as currentEvent } from 'd3-selection';
import d3 from '../plugins/d3-importer';
import ToolTipItem from './ToolTipItem.vue';

export default {
	name: 'Chart',
	components: { ToolTipItem },
	props: {
		chartDivId: {
			type: String,
			default: 'umf-d3-chart',
		},
		tooltipDivId: {
			type: String,
			default: 'd3-tooltip-div',
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
			lastTransform: null,
		};
	},
	mounted() {
		this.$watch(
			() => ((this.width, this.height, Date.now())), () => {
				d3.select(`#${this.chartDivId}`).selectAll('*').remove();
				d3.select(`#${this.tooltipDivId}`).remove();
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
		}),
		svgWidth() {
			return this.minWidth < this.width ? this.width : this.minWidth;
		},
		svgHeight() {
			return this.minHeight < this.height ? this.height : this.minHeight;
		},
		displayWidth() {
			return this.svgWidth - this.margin.left - this.margin.right;
		},
		displayHeight() {
			return this.svgHeight - this.margin.top - this.margin.bottom;
		},
	},
	methods: {
		setUpChart() {
			this.setupSvg();
			this.setupDimensions();
			this.updateChart();
		},
		setupSvg() {
			// Our svg size includes the margins
			this.svg = d3.select(`#${this.chartDivId}`).append('svg')
				.attr('width', this.svgWidth)
				.attr('height', this.svgHeight)
				.append('g');

			// Define the div for the tooltip
			this.tooltipDiv = d3.select(`#${this.tooltipDivId}`).style('visibility', 'hidden');
		},
		setupDimensions() {
			// This transparent background rectangle gives user something to click & drag.
			this.svg.append('rect')
				.attr('width', this.displayWidth)
				.attr('height', this.displayHeight)
				.style('fill', 'transparent');
			this.svg.append('defs').append('svg:clipPath')
				.attr('id', 'clip')
				.append('svg:rect')
				.attr('width', this.displayWidth)
				.attr('height', this.displayHeight)
				.attr('x', 0)
				.attr('y', 0);
		},
		updateChart() {
			if (this.items.length < 1) {
				return;
			}

			this.setupAxis();
			this.setupZoom();

			const myThis = this;
			const size = 30;
			const recipeSymbol = d3.symbol().type(d3.symbolSquare).size(size);

			this.scatterPlot = this.svg.append('g')
				.attr('id', 'scatterPlot')
				.attr('clip-path', 'url(#clip)')
				.attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

			const node = this.scatterPlot.selectAll('.dot')
				.data(this.items)
				.enter()
				.append('g')
				.attr('class', 'dot')
				.attr('transform', (d) => `translate(${this.x(new Date(d.startDate, 1, 1)) - 1},${this.y(d.yPos) - size / 4})`);

			node.append('path')
				.attr('d', recipeSymbol)
				.attr('opacity', 1)
				.attr('class', (d) => d.type)
				.attr('stroke-width', 1)
				.attr('stroke', 'rgb(255,255,255)')
				.on('mouseover', (d) => {
					d3.select(`.d3r-${d.id}`).classed('active', true);
					myThis.toolTipData = d;
					const headerElement = document.getElementsByTagName('header')[0];
					const mouseX = currentEvent.pageX;
					const mouseY = currentEvent.pageY - headerElement.getBoundingClientRect().height;
					const rect = myThis.tooltipDiv.node().getBoundingClientRect();
					myThis.tooltipDiv
						.style('left', `${this.calculateToolTipX(mouseX, rect.width)}px`)
						.style('top', `${this.calculateToolTipY(mouseY, rect.height)}px`)
						.style('visibility', 'visible');
				})
				.on('mouseout', (d) => {
					d3.select(`.d3r-${d.id}`).classed('active', false);
					myThis.toolTipData = {};
					myThis.tooltipDiv.style('visibility', 'hidden');
				});
		},
		setupAxis() {
			const yStack = {};
			const xMinMax = d3.extent(this.items, (d) => {
				yStack[d.startDate] = (yStack[d.startDate] || 0) + 1;
				// eslint-disable-next-line no-param-reassign
				d.yPos = yStack[d.startDate];
				return d.startDate;
			});

			/* X Axis */
			this.x = d3.scaleTime()
				.domain([
					new Date(xMinMax[0], 1, 1),
					new Date(xMinMax[1], 1, 1),
				]).nice()
				.range([0, this.displayWidth]);

			this.xAxis = d3.axisBottom(this.x);

			this.gX = this.svg.append('g')
				.classed('axis xaxis', true)
				.attr('transform', `translate(${this.margin.left},${this.svgHeight - this.margin.bottom})`)
				.call(this.xAxis);

			/* Y Axis */
			this.y = d3.scaleLinear()
				.domain([0, Math.max.apply(null, Object.values(yStack))]).nice()
				.range([this.displayHeight, 0]);

			this.yAxis = d3.axisLeft(this.y).ticks(this.y.domain()[1] / 20);

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
				.scaleExtent([1, 10])
				.translateExtent(extend)
				.on('zoom', this.zoomed);
			this.svg.call(this.zoom);
		},
		zoomed() {
			const { transform } = currentEvent;
			this.scatterPlot.selectAll('.dot')
				.attr(
					'transform',
					(d) => `translate(${transform.applyX(this.x(new Date(d.startDate, 1, 1)) - 1)},${transform.applyY(this.y(d.yPos))})`,
				);
			this.gX.call(this.xAxis.scale(transform.rescaleX(this.x)));
			this.gY.call(this.yAxis.scale(transform.rescaleY(this.y)));
			this.lastTransform = transform;
		},
		calculateToolTipX(mouseX, toolTipWidth, margin = 10) {
			if (mouseX - (toolTipWidth / 2) - margin < 0) {
				return margin;
			}
			if (mouseX + (toolTipWidth / 2) + margin > window.innerWidth) {
				return window.innerWidth - 5 * margin - toolTipWidth;
			}
			return mouseX - (toolTipWidth / 2);
		},
		calculateToolTipY(mouseY, toolTipHeight, margin = 10) {
			if (mouseY - toolTipHeight - margin < 0) {
				return mouseY + 10;
			}
			return mouseY - toolTipHeight - margin;
		},
		reset() {
			d3.selectAll('.dot').remove();
			d3.selectAll('#scatterPlot').remove();
			d3.selectAll('.axis').remove();
			this.updateChart();
			if (this.lastTransform !== null) {
				this.svg.call(this.zoom.transform, this.lastTransform);
			}
		},
		resetZoom() {
			this.svg.call(this.zoom.transform, d3.zoomIdentity);
		},
	},
};
</script>

<style>
.axis.xaxis text {
	fill: rgba(0, 0, 0, 0.5);
}

.axis.yaxis text {
	fill: rgba(0, 0, 0, 0.5);
}

.axis path,
.axis line {
	fill: none;
	stroke: rgba(0, 0, 0, 0.1);
	shape-rendering: crispEdges;
}

.x.axis path {
	display: none;
}

.graphic {
	fill: rgb(72, 138, 63)
}

.archival {
	fill: rgb(226, 161, 74)
}

.painting {
	fill: rgb(66, 116, 173)
}

.d3-tooltip {
	position: absolute;
	top: 0;
	left: 0;
	overflow: hidden;
	text-align: center;
	pointer-events: none;
	z-index: 999999;
}
</style>
