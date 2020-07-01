<template>
	<div>
		<div id="timeline"></div>
		<v-card id="toolTip" class="d3-tooltip">
			<v-card-title>{{toolTipData.title}}</v-card-title>
		</v-card>
	</div>
</template>

<script>
import * as d3 from 'd3';
import lutherEvents from '@/assets/lutherEvents.json';
import { event as currentEvent } from 'd3-selection';

export default {
	name: 'EventTimeline',
	data: () => ({
		width: 1500,
		height: 200,
		toolTipData: {},
		tooltipDiv: null,
	}),
	mounted() {
		this.createEventTimeline();
	},
	methods: {
		createEventTimeline() {
			this.tooltipDiv = d3.select('#toolTip').style('visibility', 'hidden');

			const svg = d3.select('#timeline')
				.append('svg')
				.attr('width', this.width)
				.attr('height', this.height);

			const x = d3.scaleLinear()
				.domain([1484, 1546]) // This is what is written on the Axis: from 0 to 100
				.range([0, 1170]);

			svg.append('g')
				.attr('transform', 'translate(0,50)') // This controls the vertical position of the Axis
				.call(d3.axisBottom(x)
					.tickFormat('')
					.tickSize(0));
			lutherEvents.forEach((it) => {
				const eventYear = new Date(it.x).getFullYear();
				svg.append('circle')
					.attr('cx', x(eventYear))
					.attr('cy', 50)
					.attr('r', 5)
					.on('mouseover', () => {
						this.toolTipData = it;
						const tooltipHeight = this.tooltipDiv.node().getBoundingClientRect().height;
						const sumHeight = tooltipHeight + currentEvent.y;
						let top;
						if (sumHeight < window.screen.height * 0.85) {
							top = currentEvent.screenY;
						} else if (currentEvent.y - tooltipHeight > 0) {
							top = currentEvent.y - tooltipHeight;
						} else {
							top = currentEvent.y - tooltipHeight / 2;
						}
						this.tooltipDiv
							.style('left', `${currentEvent.x}px`)
							.style('top', `${top}px`)
							.style('visibility', 'visible');
					})
					.on('mouseout', () => {
						this.toolTipData = {};
						this.tooltipDiv.style('visibility', 'hidden');
					});
			});
		},
	},
};
</script>

<style scoped>
	.d3-tooltip {
		position: absolute;
		top: 0;
		left: 0;
		overflow: hidden;
		text-align: center;
		pointer-events: none;
		z-index: 999999;
	}
</style>
