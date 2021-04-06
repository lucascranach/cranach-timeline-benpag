<template>
	<v-sheet class="chart-control-bar pa-3">
		<v-btn
			id="chart-control-bar-zoom-in"
			class="mb-2"
			block outlined icon
			:color="colors.primary"
			:disabled="isMaxZoomReached"
			:small="useSmallButtons"
			@click="() => this.$emit('zoomIn')"
		>
			<v-icon :small="useSmallButtons" >mdi-plus</v-icon>
		</v-btn>
		<v-btn
			id="chart-control-bar-zoom-reset"
			class="my-2"
			block outlined icon
			:color="colors.primary"
			:disabled="isMinZoomReached"
			:small="useSmallButtons"
			@click="() => this.$emit('resetZoom')"
		>
			<v-icon :small="useSmallButtons">mdi-restore</v-icon>
		</v-btn>
		<v-btn
			id="chart-control-bar-zoom-out"
			class="mt-2"
			block outlined icon
			:color="colors.primary"
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
			return this.$vuetify.breakpoint.mdAndDown;
		},
		colors() {
			return this.$vuetify.theme.isDark ? this.$vuetify.theme.themes.dark : this.$vuetify.theme.themes.light;
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
	fill: var(--v-lighten-lighten1);
}
</style>
