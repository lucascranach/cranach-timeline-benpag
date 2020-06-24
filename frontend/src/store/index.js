import Vue from 'vue';
import Vuex from 'vuex';
import works from '../../../backend/data/paintings.json';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  devtools: true,
  state: {
    items: [],
    allItems: [],
    histogram: [],
  },
  mutations: {
    setItems(state, items) {
      state.items = items;
    },
    setAllItems(state, items) {
      state.allItems = items;
    },
    calculateHistogram(state) {
      state.histogram = state.allItems.reduce((histogram, item) => {
        // reason: https://github.com/eslint/eslint/issues/8581
        // eslint-disable-next-line no-param-reassign
        histogram[item.startDate] = (histogram[item.startDate] || 0) + 1;
        return histogram;
      }, {});
    },
  },
  actions: {
    applyYearFilter({ commit, state }, { from, to }) {
      const filteredItems = state.allItems.filter(
        (i) => i.startDate >= from && i.endDate <= to,
      );
      commit('setItems', filteredItems);
    },
    loadData({ commit }) {
      const allItems = works.paintings.filter((w) => w.startDate > 1000);
      commit('setItems', allItems);
      commit('setAllItems', allItems);
      commit('calculateHistogram', allItems);
    },
  },
  modules: {
  },
  getters: {
    getItems(state) {
      return state.items;
    },
    getAllItems(state) {
      return state.allItems;
    },
    /*
    getHistogramData(state) {
      const histogram = {};
      state.allItems.forEach((i) => {
        if (histogram[i.startDate] !== undefined) {
          histogram[i.startDate] += 1;
        } else {
          histogram[i.startDate] = 1;
        }
      });
      console.log(histogram);
      return histogram;
    },
    // */
  },
});
