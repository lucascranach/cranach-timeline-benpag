import axios from 'axios';
import i18n from '@/plugins/i18n';
import config from '../../global.config';

function getItemDate(item) {
	return item.sortingDate ? Math.floor(item.sortingDate) : item.startDate;
}

export default {
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
};
