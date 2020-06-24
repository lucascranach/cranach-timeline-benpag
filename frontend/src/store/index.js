import Vue from 'vue';
import Vuex from 'vuex';
import works from '../../../backend/data/paintings.json';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    items: [],
    allItems: [],
  },
  mutations: {
    setItems(state, items) {
      state.items = items;
    },
    setAllItems(state, items) {
      state.allItems = items;
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
    getHistogramData(state) {
      console.log('getHisto');
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
  },
});
