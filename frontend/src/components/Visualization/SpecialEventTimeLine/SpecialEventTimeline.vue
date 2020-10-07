<template>
	<div :style="`margin-left:${margin.left}px;`">
		<EventToolTipItem :id="toolTipId" :item="toolTipData" :max-width="toolTipMaxWidth"/>
        <svg :id="`${timeLineId}`" :width="lineWidth" :height="height"></svg>
	</div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import d3 from '@/plugins/d3-importer';
import { event as d3Event } from 'd3-selection';
import EventToolTipItem from './EventToolTipItem.vue';

export default {
	name: 'SpecialEventTimeline.vue',
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
		color: {
			type: String,
			default: 'red',
		},
	},
	data: () => ({
		toolTipData: {},
		toolTip: null,
		componentId: `${Date.now().valueOf()}`,
		timelineBoundaries: {
			start: 0,
			end: 0,
		},
		svg: null,
	}),
	computed: {
		...mapState({
			items: (state) => state.items,
			yearRange: (state) => state.chartYearRange,
			zoomTransform: (state) => state.chartZoomTransform,
		}),
		lineThickness() {
			return this.height / 2;
		},
		lineWidth() {
			return this.width - this.margin.left - this.margin.right;
		},
		toolTipMaxWidth() {
			return this.width * 0.25;
		},
		timeLineId() {
			return `specialEventTimeline-${this.componentId}`;
		},
		toolTipId() {
			return `tooltip-${this.componentId}`;
		},
		xAxis() {
			const [from, to] = this.getStaticXAxisDomain();
			return d3.scaleTime()
				.domain([
					new Date(`${from}-01-01`),
					new Date(`${to}-01-01`),
				])
				.range([0, this.lineWidth]);
		},
	},
	watch: {
		zoomTransform: 'zoom',
		eventList: 'drawSvg',
	},
	mounted() {
		this.drawSvg();
	},
	methods: {
		...mapGetters([
			'getStaticXAxisDomain',
		]),
		drawSvg() {
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
				.attr('y1', this.lineThickness)
				.attr('y2', this.lineThickness)
				.attr('stroke', this.color)
				.attr('stroke-width', this.lineThickness);
		},
		drawEvents() {
			this.svg.selectAll()
				.data(this.eventList)
				.enter()
				.append('circle')
				.attr('cx', (d) => this.getXCoordinate(d))
				.attr('cy', this.height / 2)
				.attr('r', this.lineThickness)
				.attr('fill', this.color)
				.on('mouseover', this.showToolTip)
				.on('mouseout', this.dismissToolTip);
		},
		getXCoordinate({ startDate }) {
			return this.xAxis(new Date(startDate)) - 1;
		},
		showToolTip(item) {
			this.toolTipData = item;
			const xOffset = d3Event.x > this.toolTipMaxWidth / 2 ? -50 : -((d3Event.x - this.margin.left) / this.toolTipMaxWidth) * 100;
			this.toolTip
				.style('left', `${d3Event.x}px`)
				.style('top', `${d3Event.layerY}px`)
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
