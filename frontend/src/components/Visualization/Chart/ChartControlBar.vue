<template>
	<v-sheet class="chart-control-bar pa-3">
		<v-btn block outlined icon class="mb-2" :color="color" :disabled="isMaxZoomReached">
			<v-icon>mdi-plus</v-icon>
		</v-btn>
		<v-btn block outlined icon class="my-2 d-block" :color="color" :disabled="isMinZoomReached">
			<v-icon>mdi-restore</v-icon>
		</v-btn>
		<v-btn block outlined icon class="mt-2 d-block" :color="color" :disabled="isMinZoomReached">
			<v-icon>mdi-minus</v-icon>
		</v-btn>
	</v-sheet>
</template>

<script>
import { mapState } from 'vuex';

export default {
	name: 'ChartControlBar',
	props: {
		color: {
			type: String,
			required: false,
			default() {
				return 'gray darken-4';
			},
		},
		minZoomLevel: {
			type: Number,
			required: true,
		},
		maxZoomLevel: {
			type: Number,
			required: true,
		},
	},
	computed: {
		...mapState({
			lastTransform: (state) => state.chartZoomTransform,
		}),
		isMinZoomReached() {
			return this.lastTransform.k === this.minZoomLevel;
		},
		isMaxZoomReached() {
			return this.lastTransform.k === this.maxZoomLevel;
		},
	},
};
</script>

<style scoped>
.chart-control-bar {
	display: inline-block;
	background-color: transparent;
}

.chart-control-bar button{
	background-color: rgba(100, 100, 100, 0.1);
}
</style>
