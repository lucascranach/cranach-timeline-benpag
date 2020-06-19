import HistogramSlider from 'vue-histogram-slider';
import 'vue-histogram-slider/dist/histogram-slider.css';

import Vue from 'vue';
import App from './App.vue';
import store from './store';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

Vue.component(HistogramSlider.name, HistogramSlider);

new Vue({
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
