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
                        <rect
                            id="areaInactiveLeft"
                            x="0" y="0"
                            :height="imageHeight"
                            :fill="inactiveColor"
                        />
                        <rect
                            id="areaInactiveRight"
                            :x="timelineWidth" y="0"
                            :height="imageHeight"
                            :fill="inactiveColor"
                        />
					</g>
                    <line
                        x1="0" :y1="height"
                        :x2="timelineWidth" :y2="height"
                        :stroke="sliderColor" :stroke-width="strokeWidth * 2"
                    />
                    <rect
                        id="areaSlider" class="slider"
                        x="0" y="0"
                        fill="transparent"
                    />
					<g id="area">
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
                                id="sliderLeftText"
                                x="0" :y="pillFontSize"
                                :font-size="pillFontSize"
                                dominant-baseline="middle" text-anchor="middle"
                            />
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
                                id="sliderRightText"
                                :x="timelineWidth" :y="pillFontSize"
                                dominant-baseline="middle" text-anchor="middle"
                                :font-size="pillFontSize"
                            />
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
		inactiveColor: 'rgba(180,180,180,0.5)',
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
			return Math.round(this.timelineWidth / this.getHistogramImages().length);
		},
		gap() {
			return this.strokeWidth * 12;
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
		setupSliderLeft() {
			const sliderLeft = select('#sliderLeft');
			const sliderLeftText = select('#sliderLeftText');
			const areaInactiveLeft = select('#areaInactiveLeft');
			const areaSlider = select('#areaSlider');
			const area = select('#area');
			const [min] = this.xAxis.domain();

			const sliderLeftDragHandler = drag()
				.on('drag', () => {
					const current = Math.floor(this.xAxis.invert(event.x));
					if (min > current) {
						sliderLeft.attr('transform', 'translate(0, 0)');
						areaInactiveLeft.attr('width', 0);
						this.fillerRange.from = min;
					} else if (this.fillerRange.to <= current) {
						this.fillerRange.from = this.fillerRange.to;
					} else {
						sliderLeft.attr('transform', `translate(${event.x}, 0)`);
						areaInactiveLeft.attr('width', event.x);
						this.fillerRange.from = current;
					}
					sliderLeftText.text(this.fillerRange.from);

					const bounding = area.node().getBBox();
					areaSlider.attr('width', bounding.width - this.pillWidth);
					areaSlider.attr('height', bounding.height);
					areaSlider.attr('transform', `translate(${event.x}, 0)`);
				})
				.on('end', () => {
					this.applyYearFilter(this.fillerRange);
				});
			sliderLeft.call(sliderLeftDragHandler);
			sliderLeftText.text(this.fillerRange.from);
		},
		setupSliderRight() {
			const sliderRight = select('#sliderRight');
			const sliderRightText = select('#sliderRightText');
			const areaInactiveRight = select('#areaInactiveRight');
			const max = this.xAxis.domain()[1];
			const maxPx = Math.floor(this.xAxis(max));
			const areaSlider = select('#areaSlider');
			const area = select('#area');

			const sliderRightDragHandler = drag()
				.on('drag', () => {
					const current = Math.floor(this.xAxis.invert(event.x));
					if (max < current) {
						sliderRight.attr('transform', 'translate(0, 0)');
						areaInactiveRight.attr('width', 0);
						this.fillerRange.to = max;
					} else if (this.fillerRange.from >= current) {
						this.fillerRange.to = this.fillerRange.from;
					} else {
						const xOffset = event.x - maxPx;
						sliderRight.attr('transform', `translate(${xOffset}, 0)`);
						areaInactiveRight
							.attr('width', Math.abs(xOffset))
							.attr('transform', `translate(${xOffset}, 0)`);
						this.fillerRange.to = current;
					}
					sliderRightText.text(this.fillerRange.to);

					const bounding = area.node().getBBox();
					areaSlider.attr('width', bounding.width - this.pillWidth);
					areaSlider.attr('height', bounding.height);
				})
				.on('end', () => {
					this.applyYearFilter(this.fillerRange);
				});
			sliderRight.call(sliderRightDragHandler);
			sliderRightText.text(this.fillerRange.to);
		},
		setupAreaSlider() {
			const sliderLeft = select('#sliderLeft');
			const sliderLeftText = select('#sliderLeftText');
			const areaInactiveLeft = select('#areaInactiveLeft');
			const sliderRight = select('#sliderRight');
			const sliderRightText = select('#sliderRightText');
			const areaInactiveRight = select('#areaInactiveRight');
			const [min, max] = this.xAxis.domain();
			const maxPx = Math.floor(this.xAxis(max));
			const areaSlider = select('#areaSlider');

			const areaSliderDragHandler = drag()
				.on('drag', () => {
					const currentLeft = Math.floor(this.xAxis.invert(event.x));
					const currentRight = Math.floor(this.xAxis.invert(event.x + areaSlider.node().getBBox().width));
					if (min > currentLeft) {
						this.fillerRange.from = min;
					} else if (max < currentRight) {
						this.fillerRange.to = max;
					} else {
						areaSlider.attr('transform', `translate(${event.x}, 0)`);
						sliderLeft.attr('transform', `translate(${event.x}, 0)`);
						areaInactiveLeft.attr('width', event.x);

						const xTranslateOffset = (event.x - maxPx) + areaSlider.node().getBBox().width;
						sliderRight.attr('transform', `translate(${xTranslateOffset}, 0)`);
						areaInactiveRight
							.attr('width', Math.abs(xTranslateOffset))
							.attr('transform', `translate(${xTranslateOffset}, 0)`);

						this.fillerRange.from = currentLeft;
						this.fillerRange.to = currentRight;
						sliderLeftText.text(this.fillerRange.from);
						sliderRightText.text(this.fillerRange.to);
					}
				})
				.on('end', () => {
					this.applyYearFilter(this.fillerRange);
				});
			areaSlider.call(areaSliderDragHandler);
		},
	},
	mounted() {
		[this.fillerRange.from, this.fillerRange.to] = this.xAxis.domain();
		this.setupSliderLeft();
		this.setupSliderRight();
		this.setupAreaSlider();
	},
};
</script>

<style lang="scss">
    .slider {
        cursor: pointer;
    }
</style>
