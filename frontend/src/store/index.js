import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import i18n from '@/plugins/i18n';
import { zoomIdentity } from 'd3-zoom';
import config from '../../global.config';
import exceptions from '../../global.exceptions';
import filters from './filters';

Vue.use(Vuex);

function getItemDate(item) {
	return item.sortingDate ? Math.floor(item.sortingDate) : item.startDate;
}

export default new Vuex.Store({
	strict: true,
	devtools: true,
	state: {
		items: [],
		allItems: [],
		histogram: [],
		chartHistogram: [],
		events: {
			cranachElder: [],
			cranachYounger: [],
			luther: [],
			history: [],
		},
		activeFilters: [],
		chartZoomTransform: zoomIdentity,
		isLoading: false,
	},
	mutations: {
		setItems(state, items) {
			state.items = items;
		},
		setAllItems(state, items) {
			state.allItems = items;
		},
		setEvent(state, event) {
			Object.freeze(event);
			Object.assign(state.events, event);
		},
		setLoadingState(state, isLoading) {
			state.isLoading = isLoading;
		},
		calculateHistogram(state) {
			state.histogram = state.items.reduce((histogram, item) => {
				// reason: https://github.com/eslint/eslint/issues/8581
				/* eslint-disable no-param-reassign */
				const date = getItemDate(item);
				histogram[date] = (histogram[date] || 0) + 1;
				return histogram;
			}, {});

			Object.freeze(state.histogram);
		},
		addFilter(state, { name, type, params }) {
			if (filters[type] === undefined) {
				throw new exceptions.FilterNotFoundException(type);
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
		resetFilters(state) {
			state.activeFilters = [];
		},
		setChartZoomTransform(state, transform) {
			state.chartZoomTransform = transform;
		},
	},
	actions: {
		addFilter({ commit, dispatch }, filter) {
			commit('setLoadingState', true);
			commit('removeFilter', filter.name);
			commit('addFilter', filter);
			dispatch('applyFilter');
		},
		removeFilter({ commit, dispatch }, filterName) {
			commit('removeFilter', filterName);
			dispatch('applyFilter');
		},
		resetFilters({ commit, state }) {
			commit('resetFilters');
			commit('setItems', state.allItems);
		},
		applyFilter({ commit, state }) {
			commit('setLoadingState', true);
			const filteredItems = state.allItems.filter((item) => state.activeFilters.every((f) => f.apply(item, f.params)));
			Object.freeze(filteredItems);
			commit('setItems', filteredItems);
			commit('setLoadingState', false);
		},
		async loadData({ commit }) {
			commit('setLoadingState', true);
			try {
				const data = (await Promise.all(
					config.resources.map(
						async (res) => (await axios.get(`${config.dataBaseUrl}/${res}_${i18n.locale}.json`)).data[res],
					),
				)).flat();

				const allItems = data.filter((w) => {
					const date = getItemDate(w);
					return date > 1490 && date < 1590;
				});
				Object.freeze(allItems);

				commit('setItems', allItems);
				commit('setAllItems', allItems);
				commit('calculateHistogram', allItems);

				const events = (await Promise.all(
					config.events.map(
						async (eventName) => {
							const response = (await axios.get(`${config.dataBaseUrl}/${eventName}Events_${i18n.locale}.json`));
							const event = {};
							event[eventName] = response.data;
							return event;
						},
					),
				));
				events.forEach((event) => commit('setEvent', event));

				commit('setLoadingState', false);
			} catch (err) {
				commit('setItems', null);
				commit('setAllItems', null);
				commit('setEvent', null);
				console.error(err);
			}
		},
	},
	getters: {
		getItems(state) {
			return state.items;
		},
		hasItems(state) {
			return state.items.length > 0;
		},
		getAllItems(state) {
			return state.allItems;
		},
		getHistogramImages(state) {
			return state.allItems.filter((i) => i.imageUrl !== '').slice(0, 10);
		},
		getXAxisDomain(state) {
			const startDates = state.items.map((i) => getItemDate(i));
			return [
				Math.min(...startDates) - 1,
				Math.max(...startDates) + 1,
			];
		},
		getStaticXAxisDomain(state) {
			const startDates = state.allItems.map((i) => getItemDate(i));
			if (startDates.length < 2) {
				return [config.defaultDates.start, config.defaultDates.end];
			}
			return [
				Math.min(...startDates) - 1,
				Math.max(...startDates) + 1,
			];
		},
		getLocations(state) {
			const sortedLocations = Array.from(new Set(state.items.map((i) => i.location).flat())).sort();
			if (sortedLocations.includes('')) {
				sortedLocations.splice(sortedLocations.indexOf(''), 1);
			}
			return sortedLocations;
		},
	},
});
