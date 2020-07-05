<template>
    <v-app>
        <v-app-bar app>
            <v-spacer/>
            <h1>Cranach Timeline</h1>
            <v-spacer/>
        </v-app-bar>
        <v-main>
            <v-container>
                <Chart
                    :width="chartWidth"
                    :height="windowHeight * 0.7"
                />
                <SpecialEventTimeline :event-list="events.cranachElder" :color="'black'"/>
                <SpecialEventTimeline :event-list="events.cranachYounger" :color="'black'"/>
                <SpecialEventTimeline :event-list="events.luther" :color="'grey'"/>
                <SpecialEventTimeline :event-list="events.history"/>
                <Timeline
                    :width="chartWidth"
                    :height="windowHeight * 0.1"
                />
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Timeline from './components/Timeline.vue';
import Chart from './components/Chart.vue';
import SpecialEventTimeline from './components/SpecialEventTimeline.vue';

export default {
	name: 'App',
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
