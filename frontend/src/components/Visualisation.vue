<template>
    <div>
        <Chart
            @tooltipClick="$emit('tooltipClick', $event)"
            :width="chartWidth"
            :height="windowHeight * 0.67"
            v-show="this.getItemsBool()"
        />
      <h1
          v-show="!this.getItemsBool()">
        Es wurden keine Elemente für diese Filtereinstellungen gefunden.
      </h1>
        <SpecialEventTimeline
            :width="chartWidth"
            :height="windowHeight * 0.008"
            :event-list="events.cranachElder"
            color="black"
            v-show="this.getItemsBool()"
        />
        <SpecialEventTimeline
            :width="chartWidth"
            :height="windowHeight * 0.008"
            :event-list="events.cranachYounger"
            color="purple"
            v-show="this.getItemsBool()"
        />
        <SpecialEventTimeline
            :width="chartWidth"
            :height="windowHeight * 0.008"
            :event-list="events.luther"
            color="grey"
            v-show="this.getItemsBool()"
        />
        <SpecialEventTimeline
            :width="chartWidth"
            :height="windowHeight * 0.008"
            :event-list="events.history"
            color="darkCyan"
            v-show="this.getItemsBool()"
        />
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
	name: 'Visualisation',
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
			'getItemsBool',
		]),
		...mapActions(['loadData']),
	},
};
</script>
