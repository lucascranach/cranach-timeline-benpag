<template>
	<div>
		<div id="timeline"></div>
		<div id="toolTip">
			<h1>{{toolTipData.title}}</h1>
		</div>
	</div>
</template>

<script>
import * as d3 from 'd3';
import lutherEvents from '@/assets/lutherEvents.json';

export default {
	name: 'EventTimeline',
	data: () => ({
		width: 1500,
		height: 200,
		toolTipData: {},
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
				.call(d3.axisBottom(x))
				.tickFormat('')
				.tickSize(0));

			const toolTip = d3.select('#tooltip')
				.append('div')
				.style('opacity', 0)
				.attr('class', 'tooltip')
				.style('background-color', 'white')
				.style('border', 'solid')
				.style('border-width', '2px')
				.style('border-radius', '5px')
				.style('padding', '5px')
				.style('position', 'absolute')
				.style('overflow', 'hidden')
				.style('z-index', 999999);

			lutherEvents.forEach((it) => {
				const eventYear = new Date(it.x).getFullYear();
				svg.append('circle')
					.attr('cx', x(eventYear))
					.attr('cy', 50)
					.attr('r', 4)
					.on('mouseover', () => {
						this.toolTipData = it;
						toolTip.style('opacity', 1);
						toolTip.style('visibility', 'visible');
					})
					.on('mouseout', () => {
						this.toolTipData = '';
						toolTip.style('opacity', 0);
						toolTip.style('visibility', 'hidden');
					});
			});
		},
	},
};
</script>

<style scoped>

</style>
