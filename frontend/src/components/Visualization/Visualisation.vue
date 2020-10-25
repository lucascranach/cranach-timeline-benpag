<template>
	<div>
		<h1
			v-show="!this.hasItems()">
			{{ $t('no_filter_elements') }}
		</h1>
		<div v-show="this.hasItems()">
			<Chart
				:width="chartWidth"
				:height="chartHeight"
				:margin="chartMargins"
			/>
			<SpecialEventTimeline
				:width="chartWidth"
				:height="eventTimeLineHeight"
				:margin="eventTimeLineMargins"
				:event-list="events.cranachElder"
				:color="colors.turquoise"
			/>
			<SpecialEventTimeline
				:width="chartWidth"
				:height="eventTimeLineHeight"
				:margin="eventTimeLineMargins"
				:event-list="events.cranachYounger"
				:color="colors.rose"
			/>
			<SpecialEventTimeline
				:width="chartWidth"
				:height="eventTimeLineHeight"
				:margin="eventTimeLineMargins"
				:event-list="events.luther"
				:color="colors.brown"
			/>
			<SpecialEventTimeline
				:width="chartWidth"
				:height="eventTimeLineHeight"
				:margin="eventTimeLineMargins"
				:event-list="events.history"
				:color="colors.purple"
			/>
			<SpecialEventTimeLineLegend :event-names="eventNames" />
		</div>
		<Timeline
			:width="chartWidth"
			:height="timelineHeight"
			:margin="timeLineMargins"
		/>
	</div>
</template>

<script>
import {
	mapState, mapActions, mapGetters,
} from 'vuex';
import Timeline from './Timeline.vue';
import Chart from './Chart/Chart.vue';
import SpecialEventTimeline from './SpecialEventTimeLine/SpecialEventTimeline.vue';
import SpecialEventTimeLineLegend from './SpecialEventTimeLine/SpecialEventTimeLineLegend.vue';
import colors from '../../plugins/colors';

export default {
	name: 'Visualization',
	components: {
		Chart,
		SpecialEventTimeline,
		SpecialEventTimeLineLegend,
		Timeline,
	},
	data() {
		return {
			chartMargins: {
				left: 30,
				right: 30,
				top: 10,
				bottom: 25,
			},
		};
	},
	computed: {
		...mapState({
			items: (state) => state.items,
			events: (state) => state.events,
		}),
		chartWidth() {
			return window.innerWidth * 0.925;
		},
		chartHeight() {
			return window.innerHeight * 0.65;
		},
		eventTimeLineHeight() {
			return window.innerHeight * 0.01;
		},
		eventTimeLineMargins() {
			return {
				left: this.chartMargins.left,
				right: this.chartMargins.right,
				top: 0,
				bottom: this.eventTimeLineHeight,
			};
		},
		timelineHeight() {
			return window.innerHeight * 0.1;
		},
		timeLineMargins() {
			return {
				left: this.chartMargins.left,
				right: this.chartMargins.right,
				top: 0,
				bottom: 0,
			};
		},
		colors() {
			return colors;
		},
		eventNames() {
			return Object.keys(this.events);
		},
	},
	created() {
		this.loadData();
	},
	methods: {
		...mapGetters([
			'hasItems',
		]),
		...mapActions(['loadData']),
	},
};
</script>
