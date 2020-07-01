<template>
	<v-row>
		<v-col cols="12">
			<svg :height="height" :width="width">
				<g :transform="`translate(${this.margin.left},0)`">
					<g :transform="`translate(0, ${this.gap - this.strokeWidth})`">
						<g v-for="(img, index) in this.getHistogramImages()" :key="index">
							<defs>
								<pattern :id="`img-${index}`" patternUnits="userSpaceOnUse" :width="imageWidth" :height="imageHeight">
									<image
										preserveAspectRatio="xMidYMin slice"
										:width="imageWidth"
										:height="imageHeight"
										:href="img.imageUrl"
									/>
								</pattern>
							</defs>
							<path :d="getPath(index)" :fill="`url(#img-${index})`"/>
						</g>
						<defs>
							<linearGradient id="toTransparency" x2="0%" y1="100%" y2="0%">
								<stop offset="0" :stop-color="color" stop-opacity="0.4"></stop>
								<stop offset="1" :stop-color="color" stop-opacity="0.8"></stop>
							</linearGradient>
						</defs>
						<polyline
							:points="this.getPolylinePoints()"
							:style="`fill:url(#toTransparency); stroke:${color}`"
						/>
					</g>
					<g>
						<line id="leftSlider"
                              x1="0" :y1="0"
                              :x2="0" :y2="timelineWidth" draggble="true"
                              stroke="#f00" :stroke-width="strokeWidth" @drag="enableDrag" @dragover="dragRange" @dragend="stopDrag"
						/>
						<line
							x1="0" :y1="height"
							:x2="timelineWidth" :y2="height"
							stroke="#f00" :stroke-width="strokeWidth * 2"
						/>
						<line
							id="rightSlider"
							:x1="timelineWidth" :y1="height"
							:x2="timelineWidth" :y2="0"
							stroke="#f00" :stroke-width="strokeWidth" @mousedown="enableDrag" @mousemove="dragRange" @mouseup="stopDrag"
						/>
					</g>
				</g>
			</svg>
		</v-col>
	</v-row>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import { scaleLinear } from 'd3-scale';

export default {
	name: 'ImageRangeSlider',
	props: {
		width: {
			type: Number,
			default: 1780,
		},
		height: {
			type: Number,
			default: 150,
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
		arrowSize: 20,
		strokeWidth: 3,
		color: 'rgb(250, 250, 250)',
		dragging: false,
		movedSlider: false,
	}),
	computed: {
		...mapState({
			data: (state) => state.histogram,
		}),
		timelineWidth() {
			return this.width - this.margin.left - this.margin.right;
		},
		imageWidth() {
			return this.timelineWidth / this.getHistogramImages().length;
		},
		gap() {
			return this.strokeWidth * 4;
		},
		imageHeight() {
			return this.height - this.gap;
		},
		years() {
			return Object.keys(this.data) || [];
		},
	},
	methods: {
		...mapGetters([
			'getHistogramImages',
		]),
		getPolylinePoints() {
			const countsPerYear = Object.values(this.data) || [];

			const xAxis = scaleLinear()
				.domain([this.years[0], this.years[this.years.length - 1]]).nice()
				.range([0, this.timelineWidth]);

			const yAxis = scaleLinear()
				.domain([0, Math.max(...countsPerYear)]).nice()
				.range([this.imageHeight, 0]);

			const start = `0,${this.imageHeight}`;
			const end = `${this.timelineWidth},${this.imageHeight}`;
			return `${start} ${this.years.map((year) => `${xAxis(year)},${yAxis(this.data[year])}`).join()} ${end}`;
		},
		getPath(index) {
			const xPos = index * this.imageWidth;
			const h = this.imageHeight / 2;
			const w = this.imageWidth - (this.arrowSize / 4);

			if (index === 0) {
				return `m ${xPos} 0 l ${w} 0 l ${this.arrowSize} ${h} l -${this.arrowSize} ${h} l -${w} 0 z`;
			}

			if (index === this.getHistogramImages().length - 1) {
				return `m ${xPos} 0 l ${w} 0 l 0 ${h} l 0 ${h} l -${w} 0 l ${this.arrowSize} -${h} z`;
			}

			return `m ${xPos} 0 l ${w} 0 l ${this.arrowSize} ${h} l -${this.arrowSize} ${h} l -${w} 0 l ${this.arrowSize} -${h} z`;
		},
		enableDrag(e) {
			this.dragging = true;
			this.movedSlider = false;
			console.log(e);
		},
		dragRange(e) {
			if (this.dragging) {
				this.movedSlider = true;
				console.log(e);
			}
		},
		stopDrag(e) {
			this.dragging = false;
			// if (!this.movedSlider) this.clickedImageRow(e);
			console.log(e);
		},
	},
};
</script>

<style lang="scss">
</style>
