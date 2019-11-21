<template>
  <v-row>
    <v-col>
      <v-row v-for="(value, index) in categories" :key="`category-${index}`">
        <span
          v-for="(innerValue, innerIndex) in value.data"
          :key="`span-${index}-${innerIndex}`"
        >
        {{ innerValue }}
        </span>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'Gallery',

  data: () => ({

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
  },
};
</script>
