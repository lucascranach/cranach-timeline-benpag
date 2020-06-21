import Vue from 'vue';
import Vuex from 'vuex';
import works from '../../../backend/data/cda-paintings-v2.de.json';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    items: [],
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },
  created() {
    this.items = works.items.filter((w) => w.dating.begin > 1000 && w.isBestOf === true)
      .map((w) => this.createProduction(w))
      .sort((a, b) => ((a.type > b.type) ? 1 : -1));
  },
});
