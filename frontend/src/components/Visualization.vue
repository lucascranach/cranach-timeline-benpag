<template>
  <div>
    <h1
        v-show="!this.hasItems()">
      Es wurden keine Elemente für diese Filtereinstellungen gefunden.
    </h1>
    <div
        v-show="this.hasItems()"
    >
      <Chart
          @tooltipClick="$emit('tooltipClick', $event)"
          :width="chartWidth"
          :height="windowHeight * 0.67"
          v-show="this.hasItems()"
      />
      <SpecialEventTimeline
          :width="chartWidth"
          :height="windowHeight * 0.008"
          :event-list="events.cranachElder"
          color="black"
          v-show="this.hasItems()"
      />
      <SpecialEventTimeline
          :width="chartWidth"
          :height="windowHeight * 0.008"
          :event-list="events.cranachYounger"
          color="purple"
          v-show="this.hasItems()"
      />
      <SpecialEventTimeline
          :width="chartWidth"
          :height="windowHeight * 0.008"
          :event-list="events.luther"
          color="grey"
          v-show="this.hasItems()"
      />
      <SpecialEventTimeline
          :width="chartWidth"
          :height="windowHeight * 0.008"
          :event-list="events.history"
          color="darkCyan"
          v-show="this.hasItems()"
      />
    </div>
    <Timeline
        :width="chartWidth"
        :height="windowHeight * 0.1"
    />
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import Timeline from './Timeline.vue';
import Chart from './Chart.vue';
import SpecialEventTimeline from './SpecialEventTimeLine/SpecialEventTimeline.vue';

export default {
	name: 'Visualization',
	components: {
		Chart,
		SpecialEventTimeline,
		Timeline,
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
