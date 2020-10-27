<template>
	<v-sheet color="transparent">
		<h2
			v-show="!this.hasItems()"
			class="text-center"
		>
			{{ $t('no_filter_elements') }}
		</h2>
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
				:color="colors.orange"
			/>
			<SpecialEventTimeline
				:width="chartWidth"
				:height="eventTimeLineHeight"
				:margin="eventTimeLineMargins"
				:event-list="events.cranachYounger"
				:color="colors.turquoise"
			/>
			<SpecialEventTimeline
				:width="chartWidth"
				:height="eventTimeLineHeight"
				:margin="eventTimeLineMargins"
				:event-list="events.luther"
				:color="colors.pink"
			/>
			<SpecialEventTimeline
				:width="chartWidth"
				:height="eventTimeLineHeight"
				:margin="eventTimeLineMargins"
				:event-list="events.history"
				:color="colors.yellow"
			/>
			<SpecialEventTimeLineLegend :event-names="eventNames" />
		</div>
		<Timeline
			:width="chartWidth"
			:height="timelineHeight"
			:margin="timeLineMargins"
		/>
	</v-sheet>
</template>

<script>
import d3 from '@/plugins/d3-importer';
import { mapState, mapGetters } from 'vuex';
import Timeline from './Timeline.vue';
import Chart from './Chart/Chart.vue';
import SpecialEventTimeline from './SpecialEventTimeLine/SpecialEventTimeline.vue';
import SpecialEventTimeLineLegend from './SpecialEventTimeLine/SpecialEventTimeLineLegend.vue';

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
			chartWidth: window.innerWidth,
			chartHeight: window.innerHeight * 0.65,
			eventTimeLineHeight: window.innerHeight * 0.01,
			timelineHeight: window.innerHeight * 0.1,
		};
	},
	mounted() {
		const container = d3.select('.container').node();
		const styles = window.getComputedStyle(container, null);
		const paddingLeft = parseInt(styles.getPropertyValue('padding-left'), 10);
		const paddingRight = parseInt(styles.getPropertyValue('padding-right'), 10);
		this.chartWidth = container.clientWidth - (paddingLeft + paddingRight);
	},
	computed: {
		...mapState({
			items: (state) => state.items,
			events: (state) => state.events,
		}),
		eventTimeLineMargins() {
			return {
				left: this.chartMargins.left,
				right: this.chartMargins.right,
				top: 0,
				bottom: this.eventTimeLineHeight,
			};
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
			return this.$vuetify.theme.isDark ? this.$vuetify.theme.themes.dark : this.$vuetify.theme.themes.light;
		},
		eventNames() {
			return Object.keys(this.events);
		},
	},
	methods: {
		...mapGetters([
			'hasItems',
		]),
	},
};
</script>
