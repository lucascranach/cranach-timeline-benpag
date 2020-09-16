<template>
	<div>
		<EventToolTipItem :id="toolTipId" :item="toolTipData" :max-width="toolTipMaxWidth"/>
        <svg id="specialEventTimeline" :width="width" :height="height">
            <g :transform="`translate(${margin.left},0)`">
                <line
                    :id="toolTipId+'-line'"
                    :x1="eventList[0]  ? xAxis(new Date(eventList[0].startDate)) : 0" :y1="height / 2"
                    :x2="eventList[0]  ? xAxis(new Date(eventList[eventList.length - 1].startDate)) : 0" :y2="height / 2"
                    :stroke="color" :stroke-width="lineThickness"
                />
                <circle
                    v-for="(item,key) in eventList" :key="key"
                    v-show="xAxis(new Date(item.startDate)) >= 0"
                    :r="lineThickness" :fill="color"
                    :cx="xAxis(new Date(item.startDate))" :cy="height / 2"
                    @mouseover="showToolTip($event, item)"
                    @mouseleave="dismissToolTip()"
                />
            </g>
        </svg>
	</div>
</template>

<script>
import { scaleTime } from 'd3-scale';
import { mapGetters } from 'vuex';
import { select } from 'd3-selection';
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
		toolTipId: `toolTip-${Date.now().valueOf()}`,
		timelineBoundaries: {
			start: 0,
			end: 0,
		},
	}),
	computed: {
		lineThickness() {
			return this.height / 2;
		},
		lineWidth() {
			return this.width - this.margin.left - this.margin.right;
		},
		toolTipMaxWidth() {
			return this.width * 0.25;
		},
		xAxis() {
			return scaleTime()
				.domain([
					new Date(`${this.sortedYears[0]}-01-01`),
					new Date(`${this.sortedYears[this.sortedYears.length - 1]}-01-01`),
				])
				.nice()
				.range([0, this.lineWidth]);
		},
		sortedYears() {
			return this.getItems().map((item) => item.startDate).sort();
		},
	},
	mounted() {
		this.toolTip = select(`#${this.toolTipId.toString()}`);
	},
	methods: {
		...mapGetters([
			'getItems',
		]),
		showToolTip(event, item) {
			this.toolTipData = item;
			const xOffset = event.x > this.toolTipMaxWidth / 2 ? -50 : -((event.x - this.margin.left) / this.toolTipMaxWidth) * 100;
			this.toolTip
				.style('left', `${event.x}px`)
				.style('top', `${event.layerY}px`)
				.style('transform', `translate(${xOffset}%, -107%)`)
				.style('visibility', 'visible');
		},
		dismissToolTip() {
			this.toolTip
				.style('visibility', 'hidden');
		},
	},
};
</script>
