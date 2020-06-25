<template>
  <v-row
    ref="root"
    class="ma-0 mb-2"
    style="position: relative;"
  >
    <v-col cols="12" class="pa-0">
      <div id="histogram"></div>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex';
import d3 from '../plugins/d3-importer';

export default {
	name: 'ImageRangeSlider',
	props: {
	},
	components: {},
	data: function getData() {
		return {
			height: 100,
			width: 1800,
			x: null,
			y: null,
			svg: null,
		};
	},
	computed: {
		min() {
			return Math.min(...this.years);
		},
		max() {
			return Math.min(...this.years);
		},
		years() {
			return Object.keys(this.getHistogramData());
		},
		displayWidth() {
			if (this.minWidth > this.actualWidth) {
				return this.minWidth;
			}
			return this.actualWidth;
		},
		displayHeight() {
			if (this.minHeight > this.height) {
				return this.minHeight;
			}
			return this.height;
		},
		actualWidth() {
			if (this.width) {
				return this.width;
			}
			if (document.getElementById(this.chartDivId)) {
				return document.getElementById(this.chartDivId).clientWidth;
			}
			return null;
		},
	},
	mounted() {
		this.setupHistogramSvg();
		this.setupAxis();
		this.plotHistogram();
	},
	methods: {
		...mapGetters(['getHistogramData']),
		setupHistogramSvg() {
			this.svg = d3.select('#histogram')
				.append('svg')
				.attr('width', this.displayWidth)
				.attr('height', this.displayHeight)
				.append('g');
		},
		setupAxis() {
			this.x = d3.scaleLinear()
				.domain([this.min, this.max])
				.range([0, this.width]);
			this.y = d3.scaleLinear()
				.domain([0, Math.max(...Object.values(this.getHistogramData()))])
				.range([0, this.height]);
		},
		plotHistogram() {
			const kde = this.kernelDensityEstimator(
				this.kernelEpanechnikov(5), this.x.ticks(10),
			);
			const density = kde(Object.values(this.getHistogramData()));

			this.svg.append('path')
				.attr('class', 'lime')
				.datum(density)
				.attr('fill', '#69b3a2')
				.attr('opacity', '.8')
				.attr('stroke', '#000')
				.attr('stroke-width', 1)
				.attr('stroke-linejoin', 'round')
				.attr('d', d3.line()
					.x((d) => this.x(d[0]))
					.y((d) => this.y(d[1])).curve());
		},
		kernelDensityEstimator(kernel, X) {
			return (V) => X.map((x) => [x, d3.mean(V, (v) => kernel(x - v))]);
		},
		kernelEpanechnikov(k) {
			// eslint-disable-next-line max-len
			// eslint-disable-next-line no-return-assign,no-mixed-operators,no-cond-assign,no-param-reassign
			return (v) => (Math.abs(v /= k) <= 1 ? 0.75 * (1 - v * v) / k : 0);
		},
	},
};
</script>

<style lang="scss">
  $distance: 10px;
  .first {
    clip-path: polygon(
        0 0,
        calc(100% - #{$distance}) 0,
        100% 50%,
        calc(100% - #{$distance}) 100%,
        0 100%
    );
  }

  .middle {
    clip-path: polygon(
        0 0,
        calc(100% - #{$distance}) 0,
        100% 50%,
        calc(100% - #{$distance}) 100%,
        0 100%,
        #{$distance} 50%
    );
  }

  .last {
    clip-path: polygon(
        0 0,
        100% 0,
        100% 100%,
        0 100%,
        #{$distance} 50%
    );
  }

  .overlay-clipped {
    clip-path: url(#testClip);
  }

  .filtered {
    filter: grayscale(100%);
  }

  .front {
    z-index: 4;
  }
</style>
