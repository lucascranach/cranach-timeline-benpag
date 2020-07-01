<template>
	<div id="timeline"></div>
</template>

<script>
import * as d3 from 'd3';
import lutherEvents from '@/assets/lutherEvents.json';

export default {
	name: 'EventTimeline',
	data: () => ({
		width: 1500,
		height: 200,
	}),
	mounted() {
		this.createEventTimeline();
	},
	methods: {
		createEventTimeline() {
			const svg = d3.select('#timeline')
				.append('svg')
				.attr('width', this.width)
				.attr('height', this.height);

			const x = d3.scaleLinear()
				.domain([1484, 1546]) // This is what is written on the Axis: from 0 to 100
				.range([0, 1170]);

			svg.append('g')
				.attr('transform', 'translate(0,50)') // This controls the vertical position of the Axis
				.call(d3.axisBottom(x));

			lutherEvents.forEach((it) => {
				const eventYear = new Date(it.x).getFullYear();
				svg.append('circle')
					.attr('cx', x(eventYear))
					.attr('cy', 50)
					.attr('r', 4);
			});
		},
	},
};
</script>

<style scoped>

</style>
