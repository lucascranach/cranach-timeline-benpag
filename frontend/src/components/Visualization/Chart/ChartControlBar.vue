<template>
	<v-sheet class="chart-control-bar pa-3">
		<v-btn
			class="mb-2"
			block outlined icon
			:color="color"
			:disabled="isMaxZoomReached"
			:small="useSmallButtons"
			@click="() => this.$emit('zoomIn')"
		>
			<v-icon :small="useSmallButtons" >mdi-plus</v-icon>
		</v-btn>
		<v-btn
			class="my-2"
			block outlined icon
			:color="color"
			:disabled="isMinZoomReached"
			:small="useSmallButtons"
			@click="() => this.$emit('resetZoom')"
		>
			<v-icon :small="useSmallButtons">mdi-restore</v-icon>
		</v-btn>
		<v-btn
			class="mt-2"
			block outlined icon
			:color="color"
			:disabled="isMinZoomReached"
			:small="useSmallButtons"
			@click="() => this.$emit('zoomOut')"
		>
			<v-icon :small="useSmallButtons">mdi-minus</v-icon>
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
				return 'rgba(0, 0, 0, 0.8)';
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
		useSmallButtons() {
			return this.$vuetify.breakpoint.name !== 'xl';
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
	background-color: rgba(255, 255, 255, 0.8);
}
</style>
