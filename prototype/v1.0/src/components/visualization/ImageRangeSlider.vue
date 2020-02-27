<template>
  <v-row
    ref="root"
    class="ma-0 mb-2"
    style="position: relative;"
  >
    <v-col cols="12" class="pa-0">
      <v-row class="ma-0">
        <v-col cols="12" class="py-0 px-2">
          <v-row class="ma-0">
            <v-chip
              pill
              x-small
              outlined
              width="50"
              ref="chip"
              :color="primaryColor"
              :style="`
                top: 0px;
                left: ${this.range[0]}%;
                z-index: 8;
                transform: translate(-50%, 0)
              `"
            >
              {{from.getFullYear()}}
            </v-chip>

            <v-chip
              pill
              x-small
              outlined
              :color="primaryColor"
              :style="`
                top: 0px;
                left: ${this.range[1]}%;
                z-index: 8;
                transform: translate(-150%, 0)
              `"
            >
              {{to.getFullYear()}}
            </v-chip>
          </v-row>
        </v-col>
      </v-row>

      <v-row class="ma-0 mt-1">
        <v-col cols="12" class="pa-0">
          <v-row class="ma-0" :style="`height: ${imageRowHeight}px;`">
            <v-col cols="12" class="px-2 py-0">
              <v-row
                class="ma-0 flex-nowrap"
                ref="imageRow"
                :style="`${rowStile} background-color: ${backgroundColor};`"
              >
                <v-col
                  class="pa-0"
                  v-for="(image, index) in images"
                  :key="`gray${index}`"
                  :style="`
                    margin-left: ${getImageOffset(index)}px !important;
                    opacity: 0.5;
                  `"
                >
                  <div
                    :class="`${getClass(index)} filtered`"
                    :style="`
                      background-image: url('${image.src}');
                      background-repeat: no-repeat;
                      background-position: ${getX(image)}px ${getY(image)}px;
                      background-size: ${getWidth(image)}px ${getHeight(image)}px;
                      height: ${imageRowHeight}px;
                      width: ${getImageWidth()}px;
                    `"
                  ></div>
                </v-col>
               </v-row>

              <v-row
                class="ma-0 overlay-clipped flex-nowrap"
                ref="imageRow"
                :style="rowStile"
              >
                <v-col
                  class="pa-0"
                  v-for="(image, index) in images"
                  :key="`real${index}`"
                  :style="`
                    margin-left: ${getImageOffset(index)}px !important;
                  `"
                >
                  <div
                    :class="`${getClass(index)}`"
                    :style="`
                      background-image: url('${image.src}');
                      background-repeat: no-repeat;
                      background-position: ${getX(image)}px ${getY(image)}px;
                      background-size: ${getWidth(image)}px ${getHeight(image)}px;
                      height: ${imageRowHeight}px;
                      width: ${getImageWidth()}px;
                    `"
                  ></div>
                </v-col>
               </v-row>

              <v-row
                class="ma-0"
                :style="`${rowStile} z-index: 4;`"
              >
                <v-col cols="12" class="pa-0">
                  <svg
                    width="100%"
                    :style="`height: ${imageRowHeight}px;`"
                  >
                    <defs>
                      <linearGradient id="toTransparency" x2="0%" y1="100%" y2="0%">
                        <stop offset="0" :stop-color="frequencyColor" stop-opacity="0.4" />
                        <stop offset="1" :stop-color="frequencyColor" stop-opacity="0.8" />
                      </linearGradient>
                    </defs>

                    <polygon
                      fill="url(#toTransparency)"
                      :points="frequencyPolygonPoints"
                    ></polygon>

                    <polyline
                      :points="frequencyLinePoints"
                      fill="none"
                      :stroke="frequencyColor"
                    ></polyline>

                    <rect
                      :x="`calc(${this.range[0]}% - ${barWidth / 2}px)`"
                      y="0"
                      :width="`${barWidth}px`"
                      height="100%"
                      :fill="primaryColor"
                    ></rect>

                    <rect
                      :x="`calc(${this.range[1]}% - ${barWidth / 2}px)`"
                      y="0"
                      :width="`${barWidth}px`"
                      height="100%"
                      :fill="primaryColor"
                    ></rect>

                    <rect
                      x="0"
                      y="0"
                      width="100%"
                      height="100%"
                      fill="rgba(0,0,0,0)"
                      @click="clickedImageRow"
                    ></rect>
                  </svg>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-row
        ref="sliderRow"
        class="ma-0 mt-1"
        :style="`position: relative; width: 100%;`"
      >
        <v-col class="pa-0">
          <HistogramSlider
            ref="histo"
            :grid="false"
            :histSliderGap="3"
            :hideFromTo="true"
            :width="sliderWidth"
            :data="[]"
            :primaryColor="primaryColor"
            :handleColor="handleColor"
            :holderColor="holderColor"
            :bar-height="0"
            :barRadius="0"
            :prettify="prettify"
            :drag-interval="true"
            :force-edges="false"
            :min="minDate.valueOf()"
            :max="maxDate.valueOf()"
            @change="change"
          />
        </v-col>
      </v-row>
    </v-col>

    <svg width="0" height="0">
      <defs>
        <clipPath id="arrowClip" clipPathUnits="objectBoundingBox">
          <polygon points="1 0, 1 0, 0.75 1, 0 1"></polygon>
        </clipPath>

        <clipPath id="testClip" clipPathUnits="objectBoundingBox">
          <polygon
            :points="`
              ${this.range[0] / 100} 0,
              ${this.range[1] / 100} 0,
              ${this.range[1] / 100} 1,
              ${this.range[0] / 100} 1
            `"
          ></polygon>
        </clipPath>
      </defs>
    </svg>
  </v-row>
</template>

<script>
export default {
  name: 'ImageRangeSlider',

  components: {},

  data: function getData() {
    return {
      edited: false,
      rangeTimeout: null,
      chipHeight: 30,
      distance: 10,
      gapFactor: 0.75,
      barWidth: 2,
      svgHeight: 100,
      imageRowWidth: 100,
      sliderWidth: 1000,
      sliderHeight: 10,
      min: 0,
      max: 100,
      range: [0, 100],
      from: this.minDate,
      to: this.maxDate,
    };
  },

  props: {

    images: {
      type: Array,
      required: true,
      // [{
      //   src: String,
      //   start: Date,
      //   end: Date,
      //   focus: {
      //     x: Number,
      //     y: Number,
      //   },
      //   size: {
      //     x: Number,
      //     y: Number,
      //   },
      // }]
    },
    height: {
      type: Number,
      required: false,
      default: 80,
    },
    minDate: {
      type: Date,
      required: true,
    },
    maxDate: {
      type: Date,
      required: true,
    },
    handleColor: {
      type: String,
      default: '#ffffff',
    },
    holderColor: {
      type: String,
      default: '#dee4ec',
    },
    primaryColor: {
      type: String,
      default: '#0091ff',
    },
    backgroundColor: {
      type: String,
      default: '#ffffff',
    },
    frequencies: {
      type: Array,
      default: () => [],
    },
    frequencyColor: {
      type: String,
      default: 'rgb(250,250,250)',
    },
  },

  computed: {
    frequencyLinePoints: {
      get() {
        let points = '';

        this.frequencies.forEach((f) => {
          const pointX = this.getXPositionForChart(f) * this.imageRowWidth;
          const pointY = this.svgHeight - ((f.y / this.maxFrequency || 0) * this.svgHeight);

          points = points.concat(`${pointX},${pointY} `);
        });

        return points;
      },
    },

    frequencyPolygonPoints: {
      get() {
        let points = this.frequencyLinePoints;
        points = points.concat(`${this.imageRowWidth},${this.svgHeight} 0,${this.svgHeight}`);
        return points;
      },
    },

    maxFrequency: {
      get() {
        return this.frequencies.reduce((acc, cur) => {
          const newMax = acc < cur.y ? cur.y : acc;
          return newMax;
        }, 0);
      },
    },

    imageRowHeight: {
      get() {
        return this.height - this.sliderHeight - this.chipHeight - 2;
      },
    },

    rowStile: {
      get() {
        return `
          position: absolute;
          width: calc(100% - 16px);
          height: ${this.imageRowHeight}px
          top: ${this.chipHight}px;
        `;
      },
    },

    colSize: {
      get() {
        return 12 / this.images.length;
      },
    },
  },

  methods: {
    clickedImageRow(e) {
      const percent = e.layerX / this.imageRowWidth * 100;
      const distMin = Math.abs(percent - this.range[0]);
      const distMax = Math.abs(percent - this.range[1]);
      const dist = this.maxDate.valueOf() - this.minDate.valueOf();
      const date = new Date(this.minDate.valueOf() + dist * (percent / 100));

      if (percent < this.range[0] || distMin <= distMax) this.setRange(date, this.to);
      else this.setRange(this.from, date);

      this.$emit('rangeChanged', { from: this.from, to: this.to });
    },

    getXPositionForChart(frequency) {
      const dist = this.maxDate.getFullYear() - this.minDate.getFullYear();
      return Math.max((frequency.x - this.minDate.getFullYear()) / dist, 0);
    },

    prettify(ts) {
      return new Date(ts).getFullYear();
    },

    getClass(index) {
      if (index === 0) return 'first';
      if (index === this.images.length - 1) {
        return 'last';
      }
      return 'middle';
    },

    change(e) {
      this.edited = true;
      this.setRange(new Date(e.from), new Date(e.to));

      this.$emit('rangeChanged', { from: this.from, to: this.to });
      this.edited = false;
    },

    setRange(from, to) {
      const dist = this.maxDate.valueOf() - this.minDate.valueOf();
      const minPercent = Math.max((from.valueOf() - this.minDate.valueOf()) * 100 / dist, 0);
      const maxPercent = Math.min((to.valueOf() - this.minDate.valueOf()) * 100 / dist, 100);

      this.from = from;
      this.to = to;

      this.$set(this.range, 0, minPercent);
      this.$set(this.range, 1, maxPercent);

      if (!this.edited) this.$refs.histo.update({ from: from.valueOf(), to: to.valueOf() });
    },

    getImageWidth() {
      return (this.imageRowWidth + ((this.distance * this.gapFactor) * (this.images.length - 1)))
        / this.images.length;
    },

    getImageOffset(index) {
      return (index > 0) ? -(this.distance * this.gapFactor) : 0;
    },

    reRender() {
      this.setSizes();
      this.$forceUpdate();
    },

    setSizes() {
      this.sliderHeight = this.$refs.sliderRow.clientHeight;
      this.sliderWidth = this.$refs.sliderRow.clientWidth;
      this.imageRowWidth = this.$refs.imageRow.clientWidth;
      this.chipHight = this.$refs.chip.clientHeight;
      this.svgHeight = this.$refs.imageRow.clientHeight;
    },

    getX(image) {
      const width = this.getWidth(image);
      const resizeRatio = width / image.size.x;

      const containerMidX = this.getImageWidth() / 2;
      const distX = (image.focus.x * resizeRatio) - containerMidX;
      if (distX < 0) return 0;

      const diffSize = width - this.getImageWidth();

      if (diffSize <= 0) return 0;
      return distX <= diffSize ? -distX : -diffSize;
    },

    getY(image) {
      const width = this.getWidth(image);
      const resizeRatio = width / image.size.x;

      const containerMidY = this.imageRowHeight / 2;
      const distY = (image.focus.y * resizeRatio) - containerMidY;
      if (distY < 0) return 0;

      const diffSize = this.getHeight(image) - this.imageRowHeight;

      if (diffSize <= 0) return 0;
      return distY <= diffSize ? -distY : -diffSize;
    },

    getWidth(image) {
      const imageWidth = this.getImageWidth();
      return (image.size.x < imageWidth) ? imageWidth : image.size.x;
    },

    getHeight(image) {
      const width = this.getWidth(image);
      const resizeRatio = width / image.size.x;
      return image.size.y * resizeRatio;
    },
  },

  mounted() {
    this.reRender();
  },

  created() {
    window.addEventListener('resize', this.reRender);
  },

  destroyed() {
    window.removeEventListener('resize', this.reRender);
  },

  watch: {
    height: function watch() {
      this.reRender();
    },
    frequencies: function watch() {
      this.reRender();
    },
  },
};
</script>

<style lang="scss">
  $distance: 10px;

  .first {
    //  clip-path: polygon(0 0, 100% 0, calc(100% - #{$distance}) 100%, 0 100%);
    clip-path: polygon(
      0 0,
      calc(100% - #{$distance}) 0,
      100% 50%,
      calc(100% - #{$distance}) 100%,
      0 100%
    );
  }

  .middle {
    //  clip-path: polygon(#{$distance} 0, calc(100% - #{$distance}) 0, 100% 100%, 0 100%);
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
  //  clip-path: polygon(0 0, 100% 0, 100% 100%, #{$distance} 100%);
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
