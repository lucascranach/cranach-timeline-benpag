import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import config from '../../global.config';

Vue.use(Vuex);

export default new Vuex.Store({
	strict: true,
	devtools: true,
	state: {
		items: [],
		allItems: [],
		histogram: [],
		events: {
			cranachElder: [],
			cranachYounger: [],
			luther: [],
			history: [],
		},
	},
	mutations: {
		setItems(state, items) {
			state.items = items;
		},
		setAllItems(state, items) {
			state.allItems = items;
		},
		setEvent(state, event) {
			Object.assign(state.events, event);
		},
		calculateHistogram(state) {
			state.histogram = state.allItems.reduce((histogram, item) => {
				// reason: https://github.com/eslint/eslint/issues/8581
				// eslint-disable-next-line no-param-reassign
				histogram[item.startDate] = (histogram[item.startDate] || 0) + 1;
				return histogram;
			}, {});
			Object.freeze(state.histogram);
		},
	},
	actions: {
		applyYearFilter({ commit, state }, { from, to }) {
			const filteredItems = state.allItems.filter(
				(i) => i.startDate >= from && i.endDate <= to,
			);
			Object.freeze(filteredItems);
			commit('setItems', filteredItems);
		},
		async loadData({ commit }) {
			try {
				const data = (await Promise.all(
					config.resources.map(async (r) => (await axios.get(config.dataBaseUrl + r)).data[r]),
				)).flat();

				const allItems = data.filter((w) => w.startDate > 1490 && w.startDate < 1620);
				Object.freeze(allItems);

				commit('setItems', allItems);
				commit('setAllItems', allItems);
				commit('calculateHistogram', allItems);

				await Promise.all(config.events.map((eventName) => axios.get(`${config.dataBaseUrl}events/${eventName}`)
					.then((response) => {
						const event = {};
						event[eventName] = response.data;
						Object.freeze(event);
						commit('setEvent', event);
					})));
			} catch (err) {
				await axios.post(`${config.dataBaseUrl}log/frontend`, err);
				commit('setItems', null);
				commit('setAllItems', null);
				commit('setEvent', null);
			}
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
		getHistogramImages(state) {
			return state.allItems.filter((i) => i.imageUrl !== '').slice(0, 10);
		},
	},
});
