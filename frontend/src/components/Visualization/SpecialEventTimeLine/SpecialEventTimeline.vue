<template>
	<div class="special-event-timeline" :style="`margin:0 ${margin.right}px 0 ${margin.left}px;height:${svgHeight}px`">
		<EventToolTipItem
			:id="toolTipId"
			:item="toolTipData"
			:max-width="toolTipMaxWidth"
			:max-height="toolTipMaxHeight"
		/>
        <svg
			:id="`${timeLineId}`"
			:width="lineWidth"
			:height="svgHeight"
		/>
	</div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import d3 from '@/plugins/d3-importer';
import EventToolTipItem from './EventToolTipItem.vue';

export default {
	name: 'SpecialEventTimeline',
	components: { EventToolTipItem },
	props: {
		width: {
			type: Number,
			default: 1780,
		},
		height: {
			type: Number,
			default: 10,
		},
		margin: {
			type: Object,
			default: () => ({
				left: 20,
				right: 30,
				top: 10,
				bottom: 20,
			}),
		},
		eventList: {
			type: Array,
			required: true,
		},
		eventCategory: {
			type: String,
			required: true,
		},
		color: {
			type: String,
			default: 'red',
		},
	},
	data: () => ({
		toolTipData: {},
		toolTip: null,
		componentId: `${Date.now().valueOf()}`,
		svg: null,
	}),
	computed: {
		...mapState({
			zoomTransform: (state) => state.chartZoomTransform,
		}),
		svgHeight() {
			return this.height + this.margin.top + this.margin.bottom;
		},
		lineThickness() {
			return this.height / 4;
		},
		lineWidth() {
			return this.width - this.margin.left - this.margin.right;
		},
		eventCircleRadius() {
			return this.height / 2;
		},
		toolTipMaxWidth() {
			return this.width * 0.4;
		},
		toolTipMaxHeight() {
			return this.height * 15;
		},
		timeLineId() {
			return `specialEventTimeline-${this.componentId}`;
		},
		toolTipId() {
			return `tooltip-${this.componentId}`;
		},
		xAxis() {
			const [from, to] = this.getXAxisDomain();
			return d3.scaleTime()
				.domain([
					new Date(`${from}-01-01`),
					new Date(`${to}-01-01`),
				])
				.range([0, this.lineWidth]);
		},
		colors() {
			return this.$vuetify.theme.isDark ? this.$vuetify.theme.themes.dark : this.$vuetify.theme.themes.light;
		},
	},
	watch: {
		zoomTransform: 'zoom',
		eventList: 'drawSvg',
		xAxis: 'drawSvg',
	},
	mounted() {
		this.drawSvg();
	},
	methods: {
		...mapGetters([
			'getXAxisDomain',
		]),
		drawSvg() {
			if (this.svg !== null) {
				this.svg.selectAll('*').remove();
			}

			this.svg = d3.select(`#${this.timeLineId}`);
			this.toolTip = d3.select(`#${this.toolTipId}`).style('visibility', 'hidden');
			if (this.eventList.length < 2) {
				return;
			}
			this.drawTimeLine();
			this.drawEvents();
		},
		drawTimeLine() {
			this.svg.append('line')
				.attr('x1', this.getXCoordinate(this.eventList[0]))
				.attr('x2', this.getXCoordinate(this.eventList[this.eventList.length - 1]))
				.attr('y1', this.svgHeight / 2)
				.attr('y2', this.svgHeight / 2)
				.attr('stroke', this.color)
				.attr('stroke-width', this.lineThickness);
		},
		drawEvents() {
			this.svg.selectAll()
				.data(this.eventList)
				.enter()
				.append('circle')
				.attr('class', (d) => `circle-${d.startDate}`)
				.attr('cx', (d) => this.getXCoordinate(d))
				.attr('cy', this.svgHeight / 2)
				.attr('r', this.eventCircleRadius)
				.attr('fill', this.color)
				.on('mouseover', (event, d) => {
					this.svg.select(`.circle-${d.startDate}`)
						.attr('stroke', this.colors.primary)
						.attr('stroke-width', 1.5)
						.attr('stroke-opacity', 0.6)
						.attr('r', this.eventCircleRadius * 1.5);
					this.showToolTip(event, d);
				})
				.on('mouseout', (event, d) => {
					this.svg.select(`.circle-${d.startDate}`)
						.attr('stroke', 'none')
						.attr('r', this.eventCircleRadius);
					this.dismissToolTip();
				});
		},
		getXCoordinate({ startDate }) {
			return this.xAxis(new Date(startDate)) - 1;
		},
		showToolTip(event, item) {
			this.toolTipData = {
				...item,
				eventCategory: this.eventCategory,
			};

			let xOffset = -50;
			const yOffset = event.y - 60;
			const toolTipHalfWidth = this.toolTipMaxWidth / 2;
			if (event.x - toolTipHalfWidth < 0) {
				xOffset = ((event.x - this.margin.left) / this.toolTipMaxWidth) * -100;
			} else if (event.x + toolTipHalfWidth > window.innerWidth) {
				xOffset -= (100 * (this.margin.right + (event.x + toolTipHalfWidth - window.innerWidth))) / this.toolTipMaxWidth;
			}

			this.toolTip
				.style('left', `${event.x}px`)
				.style('top', `${yOffset}px`)
				.style('transform', `translate(${xOffset}%, -107%)`)
				.style('visibility', 'visible');
		},
		dismissToolTip() {
			this.toolTip.style('visibility', 'hidden');
		},
		zoom() {
			this.svg.select('line')
				.attr('x1', this.zoomTransform.applyX(this.getXCoordinate(this.eventList[0])))
				.attr('x2', this.zoomTransform.applyX(this.getXCoordinate(this.eventList[this.eventList.length - 1])));
			this.svg.selectAll('circle').attr('cx', (d) => this.zoomTransform.applyX(this.getXCoordinate(d)));
		},
	},
};
</script>
