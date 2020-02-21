<template>
  <v-app>
    <v-content>
      <ImageRangeSlider
        :images="images"
        height="200px"
        :minDate="min"
        :maxDate="max"
        handleColor="black"
        holderColor="grey"
        primaryColor="blue"
        backgroundColor="grey"
        :equalWidth="true"
        :frequencies="frequencies"
        frequencyColor="rgb(250, 250, 250)"
      >

      </ImageRangeSlider>
    </v-content>
  </v-app>
</template>

<script>
import ImageRangeSlider from '@/components/ImageRangeSlider.vue';

export default {
  name: 'App',

  components: {
    ImageRangeSlider,
  },

  data: () => ({
    windowHeight: 10,
    min: new Date('1472-10-04'),
    max: new Date('1608-12-31'),
    images: [
      {
        src: 'https://upload.wikimedia.org/wikipedia/commons/a/ad/Lucas_Cranach_d._%C3%84._-_David_and_Bathsheba_-_WGA05718.jpg',
        start: new Date('1472-10-04'),
        end: new Date(-15456196915200),
      },
      {
        src: 'https://thomas-michel-contemporary-art.de/wp-content/uploads/2015/12/cranach-agnes-von-hayn-1543-1.jpg',
        start: new Date(-15456196915200),
        end: new Date(-15325785100800),
      },
      {
        src: 'https://mobil.rundschau-online.de/image/26678446/4x3/620/465/a1f24253b27bac367b259947cee465f8/lZ/cranach-madonna.jpg',
        start: new Date(-15325785100800),
        end: new Date(-15195373286400),
      },
      {
        src: 'https://www.dw.com/image/37343060_303.jpg',
        start: new Date(-15195373286400),
        end: new Date(-14673726028800),
      },
      {
        src: 'https://upload.wikimedia.org/wikipedia/commons/7/7d/The_Procuress_by_Lucas_Cranach_the_Elder%2C_Tbilisi_Museum_of_Fine_Arts.jpg',
        start: new Date(-14673726028800),
        end: new Date(-14595478940160),
      },
      {
        src: 'https://www.christies.com/img/LotImages/2018/NYR/2018_NYR_15654_0007_000(lucas_cranach_i_portrait_of_john_frederick_i_elector_of_saxony_half-le).jpg',
        start: new Date(-14595478940160),
        end: new Date(-14412902400000),
      },
      {
        src: 'https://www.spsg.de/fileadmin/user_upload/Bilder_Veranstaltungen_Header/Cranach_Eva_Detail.jpg',
        start: new Date(-14412902400000),
        end: new Date(-14021666956800),
      },
      {
        src: 'https://lh6.ggpht.com/4BYaE-ItJdRZYSDI1CJVfjqoeMBPpeJyHhGcpBqnOo-Xs6G0KSKT_ZbBLX9N=s1200',
        start: new Date(-14021666956800),
        end: new Date(-13369607884800),
      },
      {
        src: 'https://www.lempertz.com/uploads/tx_lempertzproject/Lempertz-977-1016-Old-Masters-Lucas-Cranach-the-Elder-follower-of-MARTYRDOM-OF-SAINT-CATHER.jpg',
        start: new Date(-13369607884800),
        end: new Date(-13304401977600),
      },
      {
        src: 'https://www.lempertz.com/uploads/tx_lempertzproject/Lempertz-1132-1210-Old-Masters-and-19th-Century-Art-Lucas-Cranach-the-Elder-studio-of-Saint-Anne-in-a-Mountain-.jpg',
        start: new Date(-13304401977600),
        end: new Date('1553-10-16'),
      },
    ],
  }),

  computed: {
    frequencies: {
      get() {
        const minYear = this.min.getFullYear();
        const maxYear = this.max.getFullYear();
        const freq = [];

        for (let i = minYear; i <= maxYear; i += 1) {
          freq.push({ x: i, y: Math.random() });
        }

        return freq;
      },
    },
  },

  mounted() {
    this.windowHeight = window.innerHeight;
  },
};
</script>

<style lang="scss">
  .container {
    &.container--fluid {
      padding-top: 0px !important;
      padding-bottom: 0px !important;
    }
  }
</style>
