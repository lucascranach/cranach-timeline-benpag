import config from '../../global.config';

function getItemDate(item) {
	return item.sortingDate ? Math.floor(item.sortingDate) : item.startDate;
}

export default {
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
	getActiveFilters(state) {
		return state.activeFilters;
	},
};
