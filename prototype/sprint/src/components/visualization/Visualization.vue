<template>
    <v-row>
    </v-row>
</template>

<script>

export default {
  name: 'Visualization',

  components: {},

  data: () => ({}),

  props: {
    categories: {
      /*
        [
          {
            type: "Gemälde",
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
};
</script>
