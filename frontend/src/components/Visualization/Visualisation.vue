<template>
  <div>
    <h1
        v-show="!this.hasItems()">
      {{$t('no_filter_elements')}}
    </h1>
    <div v-show="this.hasItems()">
      <Chart
          :width="chartWidth"
          :height="windowHeight * 0.67"
		  :margin="margins"
      />
      <SpecialEventTimeline
          :width="chartWidth"
          :height="windowHeight * 0.008"
		  :margin="margins"
          :event-list="events.cranachElder"
          :color="colors.turquoise"
      />
      <SpecialEventTimeline
          :width="chartWidth"
          :height="windowHeight * 0.008"
		  :margin="margins"
          :event-list="events.cranachYounger"
          :color="colors.rose"
      />
      <SpecialEventTimeline
          :width="chartWidth"
          :height="windowHeight * 0.008"
		  :margin="margins"
          :event-list="events.luther"
          :color="colors.brown"
      />
      <SpecialEventTimeline
          :width="chartWidth"
          :height="windowHeight * 0.008"
		  :margin="margins"
          :event-list="events.history"
          :color="colors.purple"
      />
		<SpecialEventTimeLineLegend :event-names="eventNames" class="mt-2"/>
    </div>
    <Timeline
        :width="chartWidth"
        :height="windowHeight * 0.1"
		:margin="margins"
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
			margins: {
				left: 30,
				right: 30,
				top: 10,
				bottom: 20,
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
		windowHeight() {
			return window.innerHeight;
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
