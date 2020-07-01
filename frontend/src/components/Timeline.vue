<template>
	<v-row>
		<v-col cols="12">
			<svg :height="height" :width="width" @>
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
						<g>
                        <defs>
                            <linearGradient id="toTransparency" x2="0%" y1="100%" y2="0%">
                                <stop offset="0" :stop-color="histogramColor" stop-opacity="0.4"></stop>
                                <stop offset="1" :stop-color="histogramColor" stop-opacity="0.8"></stop>
                            </linearGradient>
                        </defs>
                        <polyline
                            :points="this.getPolylinePoints()"
                            :style="`fill:url(#toTransparency); stroke:${histogramColor}`"
                        />
                        </g>
					</g>
					<g>
                        <line
                            x1="0" :y1="height"
                            :x2="timelineWidth" :y2="height"
                            :stroke="sliderColor" :stroke-width="strokeWidth * 4"
                        />
						<g id="sliderLeft" class="slider">
                            <line
                                x1="0" :y1="0"
                                :x2="0" :y2="timelineWidth"
                                :stroke="sliderColor" :stroke-width="strokeWidth"
                            />
                            <rect
                                :x="-(pillWidth / 2)" y="1"
                                :ry="pillWidth / 4" rx="10"
                                :fill="histogramColor"
                                :width="pillWidth" height="20"
                                :stroke="sliderColor" :stroke-width="strokeWidth"
                            />
                            <text
                                x="0" :y="pillFontSize"
                                :font-size="pillFontSize"
                                dominant-baseline="middle" text-anchor="middle"
                            >
                                FROM
                            </text>
                        </g>
                        <g id="sliderRight" class="slider">
                            <line
                                :x1="timelineWidth" :y1="height"
                                :x2="timelineWidth" :y2="0"
                                :stroke="sliderColor" :stroke-width="strokeWidth"
                            />
                            <rect
                                :x="timelineWidth - (pillWidth / 2)" y="1"
                                :ry="pillWidth / 4" rx="10"
                                :fill="histogramColor"
                                :width="pillWidth" height="20"
                                :stroke="sliderColor" :stroke-width="strokeWidth"
                            />
                            <text
                                :x="timelineWidth" :y="pillFontSize"
                                dominant-baseline="middle" text-anchor="middle"
                                :font-size="pillFontSize"
                            >
                                TO
                            </text>
                        </g>
					</g>
				</g>
			</svg>
		</v-col>
	</v-row>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import { scaleLinear } from 'd3-scale';
import { select, event } from 'd3-selection';
import { drag } from 'd3-drag';

export default {
	name: 'Timeline',
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
		xAxis: null,
		arrowSize: 20,
		strokeWidth: 2,
		histogramColor: 'rgb(250, 250, 250)',
		sliderColor: 'rgb(200, 20, 20)',
		pillHeight: 20,
		fillerRange: {
			from: 0,
			to: 100,
		},
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
			return this.strokeWidth * 3;
		},
		imageHeight() {
			return this.height - this.gap;
		},
		years() {
			return Object.keys(this.data) || [];
		},
		pillWidth() {
			return (this.margin.left * 2) - 2;
		},
		pillFontSize() {
			return Math.floor(this.pillHeight * 0.6);
		},
	},
	methods: {
		...mapGetters([
			'getHistogramImages',
		]),
		...mapActions([
			'applyYearFilter',
		]),
		getPolylinePoints() {
			const countsPerYear = Object.values(this.data) || [];

			this.xAxis = scaleLinear()
				.domain([this.years[0], this.years[this.years.length - 1]]).nice()
				.range([0, this.timelineWidth]);

			const yAxis = scaleLinear()
				.domain([0, Math.max(...countsPerYear)]).nice()
				.range([this.imageHeight, 0]);

			const start = `0,${this.imageHeight}`;
			const end = `${this.timelineWidth},${this.imageHeight}`;
			return `${start} ${this.years.map((year) => `${this.xAxis(year)},${yAxis(this.data[year])}`).join()} ${end}`;
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
		setupSliders() {
			const sliderLeft = select('#sliderLeft');
			const sliderLeftDragHandler = drag()
				.on('start', () => { })
				.on('drag', () => {
					if (event.x < event.subject.x) {
						sliderLeft.attr('transform', 'translate(0, 0)');
					} else {
						sliderLeft.attr('transform', `translate(${event.x - event.subject.x}, 0)`);
					}
				})
				.on('end', () => {
					this.fillerRange.from = Math.floor(this.xAxis.invert(event.x));
					this.applyYearFilter(this.fillerRange);
				});
			select('#sliderLeft').call(sliderLeftDragHandler);

			const sliderRight = select('#sliderRight');
			const sliderRightDragHandler = drag()
				.on('start', () => { })
				.on('drag', () => {
					if (event.x > event.subject.x) {
						sliderRight.attr('transform', 'translate(0, 0)');
					} else {
						sliderRight.attr('transform', `translate(${event.x - event.subject.x}, 0)`);
					}
				})
				.on('end', () => {
					this.fillerRange.to = Math.floor(this.xAxis.invert(event.x));
					this.applyYearFilter(this.fillerRange);
				});
			select('#sliderRight').call(sliderRightDragHandler);
		},
	},
	mounted() {
		this.setupSliders();
		this.fillerRange.from = parseInt(this.years[0], 10);
		this.fillerRange.to = parseInt(this.years[this.years.length - 1], 10);
	},
};
</script>

<style lang="scss">
    .slider {
        cursor: pointer;
    }
</style>
