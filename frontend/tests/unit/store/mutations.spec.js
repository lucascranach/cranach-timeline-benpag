import { expect } from 'chai';
import { Transform } from 'd3-zoom/src/transform';
import { zoomIdentity } from 'd3-zoom';
import mutations from '../../../src/store/mutations';
import testItemData from '../../testItemData.json';
import testEventData from '../../testEventData.json';
import testFilters from '../../testFilters.json';

describe('store mutations', () => {
	let state;

	beforeEach(() => {
		state = {
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
	});

	it('should set items', () => {
		mutations.setItems(state, testItemData);
		expect(JSON.stringify(state.items)).to.be.equal(JSON.stringify(testItemData));
	});
	it('should set all items', () => {
		mutations.setAllItems(state, testItemData);
		expect(JSON.stringify(state.allItems)).to.be.equal(JSON.stringify(testItemData));
	});

	it('should set cranachElder events', () => {
		const event = { cranachElder: testEventData };
		mutations.setEvent(state, event);
		expect(JSON.stringify(state.events.cranachElder)).to.be.equal(JSON.stringify(testEventData));
	});
	it('should set cranachYounger events', () => {
		const event = { cranachYounger: testEventData };
		mutations.setEvent(state, event);
		expect(JSON.stringify(state.events.cranachYounger)).to.be.equal(JSON.stringify(testEventData));
	});
	it('should set luther events', () => {
		const event = { luther: testEventData };
		mutations.setEvent(state, event);
		expect(JSON.stringify(state.events.luther)).to.be.equal(JSON.stringify(testEventData));
	});
	it('should set history events', () => {
		const event = { history: testEventData };
		mutations.setEvent(state, event);
		expect(JSON.stringify(state.events.history)).to.be.equal(JSON.stringify(testEventData));
	});

	it('should set loading state', () => {
		mutations.setLoadingState(state, true);
		// eslint-disable-next-line no-unused-expressions
		expect(state.isLoading).to.be.true;
	});

	it('calculate histogram', () => {
		mutations.setItems(state, testItemData);
		mutations.calculateHistogram(state);
		const sumOfItems = Object.values(state.histogram).reduce((sum, count) => sum + count, 0);
		expect(sumOfItems).to.be.equal(testItemData.length);
	});

	it('should add filter', () => {
		mutations.addFilter(state, testFilters[0]);
		expect(JSON.stringify(state.activeFilters)).to.be.equal(JSON.stringify([testFilters[0]]));
	});
	it('should remove filter', () => {
		mutations.addFilter(state, testFilters[0]);
		mutations.removeFilter(state, testFilters[0].name);
		expect(state.activeFilters.length).to.be.equal(0);
	});
	it('should not remove filter', () => {
		mutations.addFilter(state, testFilters[0]);
		mutations.removeFilter(state, testFilters[1].name);
		expect(state.activeFilters.length).to.be.equal(1);
	});
	it('should reset all filters', () => {
		testFilters.forEach((f) => mutations.addFilter(state, f));
		mutations.resetFilters(state);
		expect(state.activeFilters.length).to.be.equal(0);
	});

	it('should set the chart zoom transform', () => {
		const newTransform = new Transform(2, 20, 20);
		mutations.setChartZoomTransform(state, newTransform);
		expect(state.chartZoomTransform).to.be.equal(newTransform);
	});
});
