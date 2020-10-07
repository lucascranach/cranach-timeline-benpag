<template>
  <div>
    <h1 v-show="!this.hasItems()">
      Es wurden keine Elemente für diese Filtereinstellungen gefunden.
    </h1>
    <div v-show="this.hasItems()">
      <Chart
          @tooltipClick="$emit('tooltipClick', $event)"
          :width="chartWidth"
          :height="windowHeight * 0.67"
		  :margin="margins"
      />
      <SpecialEventTimeline
          :width="chartWidth"
          :height="windowHeight * 0.008"
		  :margin="margins"
          :event-list="events.cranachElder"
          color="black"
      />
      <SpecialEventTimeline
          :width="chartWidth"
          :height="windowHeight * 0.008"
		  :margin="margins"
          :event-list="events.cranachYounger"
          color="purple"
      />
      <SpecialEventTimeline
          :width="chartWidth"
          :height="windowHeight * 0.008"
		  :margin="margins"
          :event-list="events.luther"
          color="grey"
      />
      <SpecialEventTimeline
          :width="chartWidth"
          :height="windowHeight * 0.008"
		  :margin="margins"
          :event-list="events.history"
          color="darkCyan"
      />
    </div>
    <Timeline
        :width="chartWidth"
        :height="windowHeight * 0.1"
		:margin="margins"
    />
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import Timeline from './Timeline.vue';
import Chart from './Chart/Chart.vue';
import SpecialEventTimeline from './SpecialEventTimeLine/SpecialEventTimeline.vue';

export default {
	name: 'Visualization',
	components: {
		Chart,
		SpecialEventTimeline,
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
