<template>
  <v-container fluid class="side-spacing">
    <Visualization :categories="categories" @addFilter="addFilter" @removeFilter="removeFilter" />

    <v-divider></v-divider>

    <Gallery :categories="filteredCategories" />
  </v-container>
</template>

<script>
// @ is an alias to /src
import Visualization from '@/components/visualization/Visualization.vue';
import Gallery from '@/components/gallery/Gallery.vue';

export default {
  name: 'home',
  components: {
    Visualization,
    Gallery,
  },

  data: () => ({
    categories: [
      {
        type: 'Gemälde',
        color: 'rgba(119, 152, 191, .5)',
        data: [],
      },
      {
        type: 'Zeichnung',
        color: 'rgba(223, 83, 83, .5)',
        data: [],
      },
      {
        type: 'Drucke',
        color: 'rgba(83, 223, 83, .5)',
        data: [],
      },
      {
        type: 'Archivalien',
        color: 'rgba(223, 83, 250, .5)',
        data: [],
      },
    ],
    locations: [
      'Deutschland',
      'Großbritannien',
      'Finnland',
      'Schweiz',
    ],
    customers: [
      'Martin Luther',
      'Friedrich der Weise',
      'Gunnar Heydenreich',
      'Christian Noss',
    ],
    filters: [],
  }),

  computed: {
    filteredCategories: {
      get() {
        if (this.filters.length > 0) {
          return this.categories.reduce((acc, current) => {
            const filteredData = current.data.reduce((dataAcc, currentData) => {
              if (this.matchesAllFilters(currentData)) return [...dataAcc, currentData];
              return dataAcc;
            }, []);

            if (filteredData.length) return [...acc, { type: current.type, data: filteredData }];
            return acc;
          }, []);
        }
        return this.categories;
      },
    },
    location: {
      get() {
        const randomIndex = Math.floor(Math.random() * (this.locations.length + 1));
        return this.locations[randomIndex];
      },
    },
    customer: {
      get() {
        const randomIndex = Math.floor(Math.random() * (this.customers.length + 1));
        return this.customers[randomIndex];
      },
    },
  },

  methods: {
    addProduction(production) {
      switch (production.type) {
        case 'painting': {
          this.categories[0].data.push(production);
          break;
        }
        case 'drawing': {
          this.categories[1].data.push(production);
          break;
        }
        case 'print': {
          this.categories[2].data.push(production);
          break;
        }
        default: {
          this.categories[3].data.push(production);
          break;
        }
      }
    },
    createProduction(data) {
      return {
        primaryImageUrl: data.primaryImage,
        imageUrl: data.primaryImageSmall,
        startDate: data.objectBeginDate, // `${data.objectBeginDate}-01-01T00:00:00`,
        endDate: data.objectEndDate, // `${data.objectEndDate}-12-31T23:59:59`,
        title: data.title,
        location: this.location,
        customer: this.customer,
        artist: data.artistDisplayName,
        medium: data.medium,
        dimensions: data.dimensions,
        date: data.objectDate,
        link: data.objectURL,
        type: this.getType(data),
      };
    },
    getType(data) {
      const objectName = data.objectName.toLowerCase();
      if (objectName.includes('painting')) return 'painting';
      if (objectName.includes('print')) return 'print';
      if (objectName.includes('drawing')) return 'drawing';
      return 'archive';
    },
    addFilter(filter) {
      // if (this.filters.length > 0) this.removeFilter(filter);
      this.filters.push(filter);
    },
    removeFilter(filter) {
      const index = this.getFilterIndex(filter);
      if (index > -1) this.filters.splice(index, 1);
    },
    getFilterIndex(filter) {
      return this.filters.reduce((acc, elem, index) => {
        if (acc === -1 && elem.name === filter.name) return index;
        return acc;
      }, -1);
    },
    matchesAllFilters(data) {
      return this.filters.every(f => f(data));
    },
  },

  mounted() {
    this.$store.state.productions.forEach((data) => {
      this.addProduction(this.createProduction(data));
    });

    this.$store.watch(
      state => state.productions,
      (newProductions) => {
        this.addProduction(this.createProduction(newProductions[newProductions.length - 1]));
      },
      { deep: true },
    );
  },

};
</script>

<style lang="scss">

  .side-spacing {
    padding-left: 5vw;
    padding-right: 5vw;
  }

</style>
