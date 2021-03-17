<template>
	<v-sheet color="transparent" class="mt-1">
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
				:event-category="'cranach_elder'"
				:color="colors.orange"
			/>
			<SpecialEventTimeline
				:width="chartWidth"
				:height="eventTimeLineHeight"
				:margin="eventTimeLineMargins"
				:event-list="events.cranachYounger"
				:event-category="'cranach_younger'"
				:color="colors.turquoise"
			/>
			<SpecialEventTimeline
				:width="chartWidth"
				:height="eventTimeLineHeight"
				:margin="eventTimeLineMargins"
				:event-list="events.luther"
				:event-category="'luther'"
				:color="colors.pink"
			/>
			<SpecialEventTimeline
				:width="chartWidth"
				:height="eventTimeLineHeight"
				:margin="eventTimeLineMargins"
				:event-list="events.history"
				:event-category="'history'"
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
				bottom: 20,
			},
			chartWidth: 1900,
			chartHeight: 700,
			eventTimeLineHeight: 20,
			timelineHeight: 100,
		};
	},
	created() {
		window.addEventListener('resize', this.calculateSizes);
	},
	mounted() {
		this.calculateSizes();
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
				bottom: this.eventTimeLineHeight / 1.5,
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
		calculateSizes() {
			const container = d3.select('.container').node();
			const styles = window.getComputedStyle(container, null);
			const paddingLeft = parseInt(styles.getPropertyValue('padding-left'), 10);
			const paddingRight = parseInt(styles.getPropertyValue('padding-right'), 10);
			const innerHeight = window.innerHeight > 500 ? window.innerHeight : 500;
			const chartHeightScaleFactor = this.$vuetify.breakpoint.smAndDown ? 0.85 : 0.65;

			this.chartWidth = container.clientWidth - (paddingLeft + paddingRight);
			this.eventTimeLineHeight = innerHeight * 0.01;
			this.timelineHeight = innerHeight * 0.1;
			this.chartHeight = innerHeight * chartHeightScaleFactor;
		},
	},
};
</script>
