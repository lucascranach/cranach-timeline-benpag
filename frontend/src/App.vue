<template>
  <v-app>
    <v-app-bar app>
      <v-spacer />
      <h1>Cranach Timeline</h1>
      <v-spacer />
    </v-app-bar>
    <v-main>
      <v-container>
        <Chart
			:width="chartWidth"
			:height="windowHeight * 0.7"
		/>
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

export default {
	name: 'App',
	components: {
		Chart,
		Timeline,
	},
	methods: {
		...mapActions(['loadData', 'applyYearFilter']),
	},
	computed: {
		...mapState({ items: (state) => state.items }),
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
};
</script>
