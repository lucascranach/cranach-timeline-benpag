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
      console.log(state.allItems.length);
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
  },
});
