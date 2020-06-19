import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      dark: {
        primary: '#444444',
        secondary: '#222222',
        accent: '#FECB2F',
        lighten: '#FFFFFF',
        lighten1: '#F2F2F2',
        lighten2: '#F0F0F0',
        lighten3: '#DDDDDD',
        lighten4: '#B4B4B4',
        dark: '#000321',
      },
    },
    dark: false,
  },
});
