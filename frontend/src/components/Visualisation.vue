<template>
    <div>
        <Chart
            @tooltipClick="$emit('tooltipClick', $event)"
            :width="chartWidth"
            :height="windowHeight * 0.67"
        />
        <SpecialEventTimeline
            :width="chartWidth"
            :height="windowHeight * 0.008"
            :event-list="events.cranachElder"
            color="black"
        />
        <SpecialEventTimeline
            :width="chartWidth"
            :height="windowHeight * 0.008"
            :event-list="events.cranachYounger"
            color="purple"
        />
        <SpecialEventTimeline
            :width="chartWidth"
            :height="windowHeight * 0.008"
            :event-list="events.luther"
            color="grey"
        />
        <SpecialEventTimeline
            :width="chartWidth"
            :height="windowHeight * 0.008"
            :event-list="events.history"
            color="darkCyan"
        />
        <Timeline
            :width="chartWidth"
            :height="windowHeight * 0.1"
        />
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
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
		...mapActions(['loadData']),
	},
};
</script>
