<template>
  <v-row>
    <v-col>
      <v-row v-for="(category, index) in categories" :key="`category-${index}`">
        <v-col cols="12" >
          <v-banner color="success">
            <strong class="headline">{{ category.type }}</strong>
            <template v-slot:actions>
              <v-btn text color="deep-purple accent-4">
                {{ category.color }}
              </v-btn>
            </template>
          </v-banner>
        </v-col>
        <v-col v-for="(item, itemIndex) in getFour(category.data)"
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
                <a href="#">Weiterlesen...</a>
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
    showAll: false,
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
  methods: {
    filter(date) {
      return data => new Date(data.startDate).getTime() < date.getTime();
    },
    getFour(list) {
      return this.showAll ? list : list.slice(0, 4);
    },
    changeState() {
      this.showAll = !this.showAll;
    },
  },
};
</script>
