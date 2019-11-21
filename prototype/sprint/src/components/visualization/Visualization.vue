<template>
    <v-row>
      <v-col>
        <v-row ref="navigation">
          <v-col cols="4">
            <v-row ref="navigation">
              <v-text-field clearable></v-text-field>
              <v-btn icon x-large>
                <v-icon>fa-search</v-icon>
              </v-btn>

              <v-spacer></v-spacer>

              <v-btn icon x-large>
                <v-icon>fa-filter</v-icon>
              </v-btn>
            </v-row>
          </v-col>

          <v-col cols="4">
          </v-col>

          <v-col cols="4">
            <v-row justify="end">
              <v-btn icon x-large>
                <v-icon>fa-info</v-icon>
              </v-btn>
            </v-row>
          </v-col>
        </v-row>

        <v-row ref="graph">
          <v-col>
            <highcharts :options="chartOptions" ref="chart"></highcharts>
          </v-col>
        </v-row>

        <v-row ref="timeRow">
          <v-col cols="2">
            <v-row justify="start">
              <v-btn icon x-large>
                <v-icon>fa-angle-left</v-icon>
              </v-btn>
              <v-text-field outlined ref="left" v-model="textFieldValueMin"></v-text-field>
            </v-row>
          </v-col>
          <v-col cols="8">
            <v-row justify="center">
              <v-btn icon x-large>
                <v-icon>fa-search-plus</v-icon>
              </v-btn>

              <v-btn icon x-large>
                <v-icon>fa-search-minus</v-icon>
              </v-btn>
            </v-row>
          </v-col>
          <v-col cols="2">
            <v-row justify="end">
              <v-text-field outlined ref="right" v-model="textFieldValueMax"></v-text-field>
              <v-btn icon x-large>
                <v-icon>fa-angle-right</v-icon>
              </v-btn>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
</template>

<script>
import { Chart } from 'highcharts-vue';
import yearUtils from '@/utils/year.utils';
import eventUtils from '@/utils/event.utils';

export default {
  name: 'Visualization',

  components: {
    highcharts: Chart,
  },

  data: () => ({
    filteredCategories: [],
    min: new Date('1472-01-01'),
    max: new Date('1553-01-01'),
  }),

  props: {
    categories: {
      type: Array,
      required: true,
    },
  },

  computed: {
    textFieldValueMin: {
      get() {
        return 1900 + this.min.getYear();
      },
      set(value) {
        const date = new Date(value);
        const dateTime = date.getTime();
        const xMin = new Date('1471-01-01').getTime();
        const xMax = new Date(this.max).getTime();
        if (dateTime >= xMin && dateTime <= xMax) this.setZoom(date, this.max);
      },
    },
    textFieldValueMax: {
      get() {
        return 1900 + this.max.getYear();
      },
      set(value) {
        const date = new Date(value);
        const dateTime = date.getTime();
        const xMin = new Date(this.min).getTime();
        const xMax = new Date('1554-01-01').getTime();
        if (dateTime >= xMin && dateTime <= xMax) this.setZoom(this.min, date);
      },
    },
    series: {
      get() {
        const newSeries = this.categories.map(category => ({
          color: category.color,
          name: category.type,
          type: 'scatter',
          data: this.createAllSeriesItemsFrom(category),
        }));

        newSeries.push(this.getEvents());

        yearUtils.resetYearAmount();

        return newSeries;
      },
    },
    chartOptions: {
      get() {
        return {
          chart: {
            zoomType: 'x',
            backgroundColor: 'rgb(250,250,250)',
            events: {
              load: function outer() {
                console.log('loaded');
              },
            },
          },
          title: {
            text: '',
          },
          yAxis: {
            visible: false,
          },
          xAxis: {
            type: 'datetime',
            events: {
              afterSetExtremes: event => this.setRange(event),
            },
          },
          tooltip: {
            useHTML: true,
            // formatter: function tool() {
            //   console.log(this);
            // },
            headerFormat: '<span style="font-size: 15px"><b>{series.name}</b></span><table>',
            pointFormat: `
              <tr>
                <td><img src="{point.image}" alt="" border=3 height=150 width=150></img></td>
                <td>
                  <span style="font-size: 12px"><b>Titel: </b>{point.title}</span> <br>
                  <br>
                  <span style="font-size: 12px"><b>Medium: </b>{point.medium}</span> <br>
                  <br>
                  <span style="font-size: 12px"><b>Ort: </b> {point.location}</span>
                </td>
              </tr>`,
            footerFormat: '</table>',
          },
          plotOptions: {
            scatter: {
              marker: {
                radius: 5,
                states: {
                  hover: {
                    enabled: true,
                    lineColor: 'rgb(100,100,100)',
                  },
                },
                symbol: 'square',
                stacking: 'normal',
              },
              states: {
                hover: {
                  marker: {
                    enabled: false,
                  },
                },
              },
            },
            series: {
              events: {
                legendItemClick: (event) => {
                  this.addCategorieFilter(event.target.name);
                },
              },
              stickyTracking: false,
            },
            // legend: {
            //   visible: false,
            // },
          },
          series: this.series,
          // legend: {
          //   enabled: false,
          // },
        };
      },
    },
  },

  methods: {
    getEvents() {
      const y = yearUtils.getHighestValue(this.min, this.max) + 2;
      const events = eventUtils.getEvents();

      return {
        type: 'line',
        color: 'rgba(0,0,0,0.5)',
        name: 'Cranach der Ältere',
        tooltip: {
          headerFormat: '<span style="font-size: 15px"><b>{point.key:%Y-%m-%d}</b></span><br/>',
          pointFormat: '<span style="font-size: 15px"><b>{series.name}</b>: </span>{point.title}<br/>',
        },
        marker: {
          enabled: true,
          radius: 5,
        },
        data: events.map(e => ({
          x: new Date(e.x),
          title: e.title,
          y,
        })),
      };
    },
    addCategorieFilter(name) {
      const index = this.filteredCategories.indexOf(name);
      if (index > -1) this.filteredCategories.splice(index, 1);
      else this.filteredCategories.push(name);
      if (this.filteredCategories.length > 0) {
        this.$emit('addFilter', this.filterCategory(this.filteredCategories));
      } else {
        this.$emit('removeFilter', this.filterCategory(this.filteredCategories));
      }
    },
    createAllSeriesItemsFrom(category) {
      if (this.filteredCategories.includes(category.type)) return [];

      const seriesItems = category.data.reduce((acc, current) => {
        const items = this.createItemsFrom(current, category.type);
        return [...acc, ...items];
      }, []);

      return seriesItems.sort((a, b) => a.x.getTime() - b.x.getTime());
    },
    createItemsFrom(data, type) {
      const range = data.endDate - data.startDate + 1;

      return Array(range).fill().map((_, i) => {
        const year = data.startDate + i;

        yearUtils.increaseYearAmountFor(year);

        return {
          x: new Date(`${year}-01-01`),
          y: yearUtils.getYearAmountFor(year),
          image: data.imageUrl,
          title: data.title,
          location: data.location,
          customer: data.customer,
          medium: data.medium,
          dimensions: data.dimensions,
          date: data.date,
          artist: data.artist,
          type,
        };
      });
    },
    setRange(event) {
      const newStart = new Date(event.min);
      const newEnd = new Date(event.max);

      if (this.min !== newStart && this.max !== newEnd) {
        this.min = newStart;
        this.max = newEnd;
        this.$emit('addFilter', this.filterDateRange(newStart, newEnd), true);
      }
    },
    setZoom(min, max) {
      this.$refs.chart.chart.xAxis[0]
        .setExtremes(min.getTime(), max.getTime());
      this.$refs.chart.chart.redraw();
      this.$refs.chart.chart.showResetZoom();
    },
    filterDateRange(from, to) {
      return function dateRange(data) {
        const fromDateTime = 1900 + new Date(from).getYear();
        const toDateTime = 1900 + new Date(to).getYear();

        const productStart = data.startDate;
        const productEnd = data.endDate;

        return (fromDateTime <= productStart && productStart <= toDateTime)
          || (toDateTime >= productEnd && productEnd >= fromDateTime);
      };
    },
    filterCategory(names) {
      return function dateRange(data) {
        return !names.includes(data.type);
      };
    },
  },
};
</script>
