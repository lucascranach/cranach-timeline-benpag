<template>
  <v-row>
    <v-col>
      <v-row v-for="(category, index) in mutatedCategories" :key="`category-${index}`">
        <v-col cols="12" class="py-0" :style="`background-color: ${category.color}`">
          <v-row align="center">
            <v-col cols="6" class="pl-10 py-0">
              <v-row justify="start">
                <strong class="headline">{{ category.type }}</strong>
              </v-row>
            </v-col>
            <v-col cols="6" class="pr-10 py.0">
              <v-row justify="end">
                <v-btn icon x-large @click="changeCategoryState(index)"
                       :style="`color: ${category.color}`" style="background-color: white">
                  <v-icon v-if="categoryStates[index]">fa-chevron-up</v-icon>
                  <v-icon v-else>fa-chevron-down</v-icon>
                </v-btn>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
        <v-col v-for="(item, itemIndex) in category.data"
               :key="`span-${index}-${itemIndex}`" cols="3" >
            <v-card>
              <v-img :src="item.imageUrl" max-height="200px" position="center top" />
              <v-list>
                <v-list-item two-line >
                  <v-list-item-content>
                    <v-list-item-title>Titel</v-list-item-title>
                    <v-list-item-subtitle>{{ item.title }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item two-line >
                  <v-list-item-content>
                    <v-list-item-title>Ort</v-list-item-title>
                    <v-list-item-subtitle>{{ item.location }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item two-line >
                  <v-list-item-content>
                    <v-list-item-title>Auftraggeber</v-list-item-title>
                    <v-list-item-subtitle>{{ item.customer }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
              <v-card-text text-right>
                <a :href="item.link" :style="`color: ${category.color}`">Weiterlesen...</a>
              </v-card-text>
            </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'Gallery',
  data: () => ({
    categoryStates: [false, false, false, false],
  }),
  props: {
    categories: {
      /*
        [
          {
            type: "Gemälde",
            color,
            data: [
              {
                imageUrl,
                startDate,
                endDate,
                title,
                location,
                customer,
                artist,
                medium,
                dimensions,
                date,
                link,
                type,
              }
            ],
          }
        ]
      */
      type: Array,
      required: true,
    },
  },
  computed: {
    mutatedCategories: {
      get() {
        return this.categories.map((c, i) => {
          const newCat = { ...c };
          if (!this.categoryStates[i]) newCat.data = newCat.data.slice(0, 4);
          return newCat;
        });
      },
    },
  },
  methods: {
    filter(date) {
      return data => new Date(data.startDate).getTime() < date.getTime();
    },
    changeCategoryState(i) {
      this.$set(this.categoryStates, i, !this.categoryStates[i]);
    },
  },
  watch: {
    categories: (val) => {
      this.$set(this.categoryStates, val.map(() => false));
    },
  },
};
</script>
