import { zoomIdentity } from 'd3-zoom';

export default {
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
};
