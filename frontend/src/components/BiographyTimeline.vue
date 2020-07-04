<template>
	<v-row>
		<v-col cols="12">
			<svg id="biographyTimeline" :width="width" :height="height">
				<g :transform="`translate(${margin.left},0)`">
					<line
						x1="0" :y1="height / 2"
						:x2="lineWidth" :y2="height / 2"
						:stroke="color" :stroke-width="lineThickness"
					/>
					<circle
						v-for="(item,key) in eventData" :key="key"
						v-show="xAxis(item) >= 0"
						:r="lineThickness" :fill="color"
						:cx="xAxis(item)" :cy="height / 2"
					/>
				</g>
			</svg>
		</v-col>
	</v-row>
</template>

<script>
import { scaleTime } from 'd3-scale';
import { mapGetters } from 'vuex';
import cranachElder from '../assets/cranachElderEvents.json';

export default {
	name: 'BiographyTimeline.vue',
	props: {
		width: {
			type: Number,
			default: 1780,
		},
		height: {
			type: Number,
			default: 10,
		},
		margin: {
			type: Object,
			default: () => ({
				left: 20,
				right: 30,
				top: 10,
				bottom: 20,
			}),
		},
	},
	data: () => ({
		color: 'red',
	}),
	computed: {
		lineThickness() {
			return this.height / 2;
		},
		lineWidth() {
			return this.width - this.margin.left - this.margin.right;
		},
		xAxis() {
			return scaleTime()
				.domain([
					new Date(`${this.sortedYears[0]}-01-01`),
					new Date(`${this.sortedYears[this.sortedYears.length - 1]}-01-01`),
				])
				.nice()
				.range([0, this.lineWidth]);
		},
		eventData() {
			return cranachElder.map((obj) => new Date(obj.date));
		},
		sortedYears() {
			return this.getItems().map((item) => item.startDate).sort();
		},
	},
	methods: {
		...mapGetters([
			'getItems',
		]),
	},
};
</script>

<style scoped>

</style>
