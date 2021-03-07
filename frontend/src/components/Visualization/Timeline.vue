<template>
	<svg :height="height" :width="width">
		<g :transform="`translate(${margin.left},0)`">
			<g :transform="`translate(0, ${gap - strokeWidth})`">
				<rect :height="imageHeight" :width="timelineWidth" :fill="colors.lighten4" />
				<g v-for="(img, index) in this.getHistogramImages()" :key="index">
					<defs>
						<pattern
							:id="`img-${index}`" patternUnits="userSpaceOnUse"
							:width="imageWidth" :height="imageHeight"
						>
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
						<linearGradient id="toTransparency" y1="100%" y2="0%">
							<stop offset="0" :stop-color="colors.lighten" stop-opacity="0.4"></stop>
							<stop offset="1" :stop-color="colors.lighten" stop-opacity="0.8"></stop>
						</linearGradient>
					</defs>
					<polyline
						:points="polylinePoints"
						:stroke="colors.primary"
						fill="url(#toTransparency)"
					/>
				</g>
				<rect
					id="areaInactiveLeft"
					x="0" y="0"
					:height="imageHeight"
					:fill="colors.lighten4"
					fill-opacity="0.5"
				/>
				<rect
					id="areaInactiveRight"
					:x="timelineWidth" y="0"
					:height="imageHeight"
					:fill="colors.lighten4"
					fill-opacity="0.5"
				/>
			</g>
			<line
				x1="0" :y1="height"
				:x2="timelineWidth" :y2="height"
				:stroke="colors.primary" :stroke-width="strokeWidth * 2"
			/>
			<rect
				id="areaSlider" class="slider"
				x="0" y="0"
				fill="transparent"
			/>
			<g id="area">
				<g id="sliderLeft" class="slider">
					<line
						x1="0" y1="0"
						x2="0" :y2="timelineWidth"
						:stroke="colors.primary" :stroke-width="strokeWidth"
					/>
					<svg
						:x="-pillWidth + 7"
						:y="-1"
						width="24px"
						height="24px">
						<path :fill="colors.primary" d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
					</svg>
					<rect
						:x="-(pillWidth / 2)" y="1"
						:ry="pillWidth / 4" rx="10"
						:fill="colors.lighten"
						:width="pillWidth" height="20"
						:stroke="colors.primary" :stroke-width="strokeWidth"
					/>
					<text
						id="sliderLeftText"
						x="0" :y="pillFontSize"
						:font-size="pillFontSize"
						:fill="colors.primary"
						dominant-baseline="middle" text-anchor="middle"
					/>
					<svg
						:x="pillWidth / 2 - 1.5"
						:y="-1"
						width="24px"
						height="24px">
						<path :fill="colors.primary" d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
					</svg>
				</g>
				<g id="sliderRight" class="slider">
					<line
						:x1="timelineWidth" :y1="height"
						:x2="timelineWidth" :y2="0"
						:stroke="colors.primary" :stroke-width="strokeWidth"
					/>
					<svg
						:x="timelineWidth - pillWidth + 7"
						:y="-1"
						width="24px"
						height="24px">
						<path :fill="colors.primary" d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
					</svg>
					<rect
						:x="timelineWidth - (pillWidth / 2)" y="1"
						:ry="pillWidth / 4" rx="10"
						:fill="colors.lighten"
						:width="pillWidth" height="20"
						:stroke="colors.primary" :stroke-width="strokeWidth"
					/>
					<text
						id="sliderRightText"
						:x="timelineWidth" :y="pillFontSize"
						:fill="colors.primary"
						dominant-baseline="middle" text-anchor="middle"
						:font-size="pillFontSize"
					/>
					<svg
						:x="timelineWidth + pillWidth / 2 - 1.5"
						:y="-1"
						width="24px"
						height="24px">
						<path :fill="colors.primary" d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
					</svg>
				</g>
			</g>
		</g>
	</svg>
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
		pillHeight: 20,
		filterRange: {
			from: 0,
			to: 100,
		},
	}),
	computed: {
		...mapState({
			data: (state) => state.histogram,
			yearFilter: (state) => state.activeFilters.find((f) => f.name === 'yearFilter'),
			zoomTransform: (state) => state.chartZoomTransform,
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
			if (this.margin.left > this.margin.right) {
				return (this.margin.right * 2) - 2;
			}
			return (this.margin.left * 2) - 2;
		},
		pillFontSize() {
			return Math.floor(this.pillHeight * 0.6);
		},
		colors() {
			return this.$vuetify.theme.isDark ? this.$vuetify.theme.themes.dark : this.$vuetify.theme.themes.light;
		},
		polylinePoints() {
			return this.getPolylinePoints();
		},
	},
	watch: {
		xAxis: {
			handler() {
				this.setupSliders();
			},
		},
		yearFilter: {
			handler(val) {
				this.onFilterRangeChanged(val?.params);
			},
		},
		zoomTransform: {
			handler(val) {
				const [from, to] = val.rescaleX(this.xAxis).domain();
				this.onFilterRangeChanged({
					from: Math.ceil(from),
					to: Math.floor(to),
				});
			},
		},
	},
	methods: {
		...mapGetters([
			'getHistogramImages',
			'getStaticXAxisDomain',
		]),
		...mapActions([
			'addFilter',
		]),
		getPath(index) {
			const xPos = index * this.imageWidth;
			const h = this.imageHeight / 2;
			const w = this.imageWidth - (this.arrowSize / 4);

			if (index === 0) {
				return `m ${xPos} 0
				l ${w} 0
				l ${this.arrowSize} ${h}
				l -${this.arrowSize} ${h}
				l -${w} 0
				z`;
			}
			if (index === this.getHistogramImages().length - 1) {
				return `m ${xPos} 0
				l ${w} 0
				l 0 ${h}
				l 0 ${h}
				l -${w} 0
				l ${this.arrowSize} -${h}
				z`;
			}

			return `m ${xPos} 0
			l ${w} 0
			l ${this.arrowSize} ${h}
			l -${this.arrowSize} ${h}
			l -${w} 0
			l ${this.arrowSize} -${h}
			z`;
		},
		getPolylinePoints() {
			const countsPerYear = Object.values(this.data) || [];

			this.xAxis = scaleLinear()
				.domain(this.getStaticXAxisDomain())
				.range([0, this.timelineWidth]);

			const yAxis = scaleLinear()
				.domain([0, Math.max(...countsPerYear)]).nice()
				.range([this.imageHeight, 0]);

			const start = `0,${this.imageHeight}`;
			const end = `${this.timelineWidth},${this.imageHeight}`;
			const result = this.years.map(
				(year) => `${this.xAxis(year)},${yAxis(this.data[year])}`,
			).join();

			return `${start} ${result} ${end}`;
		},
		setupSliders() {
			[this.filterRange.from, this.filterRange.to] = this.xAxis.domain();
			this.setupSliderLeft();
			this.setupSliderRight();
			this.setupAreaSlider();
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
						this.filterRange.from = min;
					} else if (this.filterRange.to <= current) {
						this.filterRange.from = this.filterRange.to;
					} else {
						sliderLeft.attr('transform', `translate(${event.x}, 0)`);
						areaInactiveLeft.attr('width', event.x);
						this.filterRange.from = current;
					}
					sliderLeftText.text(this.filterRange.from);

					const bounding = area.node().getBBox();
					areaSlider.attr('width', bounding.width - this.pillWidth);
					areaSlider.attr('height', bounding.height);
					areaSlider.attr('transform', `translate(${event.x}, 0)`);
				})
				.on('end', () => {
					this.applyYearFilter();
				});

			sliderLeft.call(sliderLeftDragHandler);
			sliderLeftText.text(this.filterRange.from);
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
						this.filterRange.to = max;
					} else if (this.filterRange.from >= current) {
						this.filterRange.to = this.filterRange.from;
					} else {
						const xOffset = event.x - maxPx;
						sliderRight.attr('transform', `translate(${xOffset}, 0)`);
						areaInactiveRight
							.attr('width', Math.abs(xOffset))
							.attr('transform', `translate(${xOffset}, 0)`);
						this.filterRange.to = current;
					}
					sliderRightText.text(this.filterRange.to);

					const bounding = area.node().getBBox();
					areaSlider.attr('width', bounding.width - this.pillWidth);
					areaSlider.attr('height', bounding.height);
				})
				.on('end', () => {
					this.applyYearFilter();
				});

			sliderRight.call(sliderRightDragHandler);
			sliderRightText.text(this.filterRange.to);
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
						this.filterRange.from = min;
					} else if (max < currentRight) {
						this.filterRange.to = max;
					} else {
						areaSlider.attr('transform', `translate(${event.x}, 0)`);
						sliderLeft.attr('transform', `translate(${event.x}, 0)`);
						areaInactiveLeft.attr('width', event.x);

						const xTranslateOffset = (event.x - maxPx) + areaSlider.node().getBBox().width;
						sliderRight.attr('transform', `translate(${xTranslateOffset}, 0)`);
						areaInactiveRight
							.attr('width', Math.abs(xTranslateOffset))
							.attr('transform', `translate(${xTranslateOffset}, 0)`);

						this.filterRange.from = currentLeft;
						this.filterRange.to = currentRight;
						sliderLeftText.text(this.filterRange.from);
						sliderRightText.text(this.filterRange.to);
					}
				})
				.on('end', () => {
					this.applyYearFilter();
				});
			areaSlider.call(areaSliderDragHandler);

			const area = select('#area');
			areaSlider.on('yearFilterChanged', () => {
				const x = this.xAxis(this.filterRange.from);
				sliderLeft.attr('transform', `translate(${x}, 0)`);
				areaInactiveLeft.attr('width', x);
				sliderLeftText.text(this.filterRange.from);

				const xOffset = this.xAxis(this.filterRange.to) - maxPx;
				sliderRight.attr('transform', `translate(${xOffset}, 0)`);
				areaInactiveRight
					.attr('width', Math.abs(xOffset))
					.attr('transform', `translate(${xOffset}, 0)`);
				sliderRightText.text(this.filterRange.to);

				const bounding = area.node().getBBox();
				areaSlider.attr('width', bounding.width - this.pillWidth);
				areaSlider.attr('height', bounding.height);
				areaSlider.attr('transform', `translate(${x}, 0)`);
			});
		},
		applyYearFilter() {
			const filter = {
				name: 'yearFilter',
				type: 'year',
				params: this.filterRange,
			};
			this.addFilter(filter);
		},
		onFilterRangeChanged(filterRange) {
			if (filterRange !== undefined) {
				this.filterRange = { ...filterRange };
			} else {
				[this.filterRange.from, this.filterRange.to] = this.xAxis.domain();
			}

			select('#areaSlider').dispatch('yearFilterChanged');
		},
	},
};
</script>

<style lang="scss">
    .slider {
        cursor: pointer;
    }
</style>
