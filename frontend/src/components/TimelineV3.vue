<template>
  <v-row>
    <v-col cols="12">
      <svg :height="height" :width="width">
        <g :transform="`translate(${this.margin.left},0)`">
          <polyline
            :points="this.getPolylinePoints()"
            style="fill:rgba(0,0,0,0.1);stroke:rgba(0,0,0,0.5);;stroke-width:1"
          />
        </g>
      </svg>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from 'vuex';
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
  computed: {
    ...mapState({
      data: (state) => state.histogram,
    }),
    polylineWidth() {
      return this.width - this.margin.left - this.margin.right;
    },
  },
  methods: {
    getPolylinePoints() {
      const years = Object.keys(this.data) || [];
      const countsPerYear = Object.values(this.data) || [];

      const xAxis = scaleLinear()
        .domain([years[0], years[years.length - 1]]).nice()
        .range([0, this.polylineWidth]);

      const yAxis = scaleLinear()
        .domain([0, Math.max(...countsPerYear)]).nice()
        .range([this.height, 0]);

      return `0,${this.height}  ${years.map((year) => `${xAxis(year)},${yAxis(this.data[year])}`).join()} ${this.polylineWidth},${this.height}`;
    },
  },
};
</script>

<style lang="scss">
</style>
