import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import config from '../../global.config';
import filters from './filters';

Vue.use(Vuex);

function FilterNotFoundException(filerName) {
	this.message = `Filter ${filerName} does not implemented and will be skipped`;
	this.name = filerName;
}

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
		activeFilters: [],
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
		addFilter(state, { name, type, params }) {
			if (filters[type] === undefined) {
				throw new FilterNotFoundException(type);
			}
			const filter = {
				name,
				type,
				params,
				apply: filters[type],
			};
			Object.freeze(filter);
			state.activeFilters.push(filter);
		},
		removeFilter(state, name) {
			const filter = state.activeFilters.find((f) => f.name === name);
			if (filter !== undefined) {
				state.activeFilters.splice(state.activeFilters.indexOf(filter), 1);
			}
		},
	},
	actions: {
		addFilter({ commit, dispatch }, filter) {
			commit('removeFilter', filter.name);
			commit('addFilter', filter);
			dispatch('applyFilter');
		},
		removeFilter({ commit, dispatch }, filterName) {
			commit('removeFilter', filterName);
			dispatch('applyFilter');
		},
		applyFilter({ commit, state }) {
			const filteredItems = state.allItems.filter((item) => state.activeFilters.every((f) => f.apply(item, f.params)));
			Object.freeze(filteredItems);
			commit('setItems', filteredItems);
		},
		applyYearFilter({ dispatch }, { from, to }) {
			const filter = {
				name: 'uniqueFilterName',
				type: 'year',
				params: { from, to },
			};
			dispatch('addFilter', filter);
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
				console.log('Ja moin, ein Fehler beim Download der Files', err);
				// TODO: @Dominik: Correct logging
				commit('setItems', null);
				commit('setAllItems', null);
				commit('setEvent', null);
			}
		},
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
