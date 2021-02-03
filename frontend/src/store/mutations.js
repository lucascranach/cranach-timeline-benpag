import filters from '@/store/filters';
import exceptions from '../../global.exceptions';

function getItemDate(item) {
	return item.sortingDate ? Math.floor(item.sortingDate) : item.startDate;
}

export default {
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
};
