import { expect } from 'chai';
import { Transform } from 'd3-zoom/src/transform';
import state from '../../../src/store/state';
import mutations from '../../../src/store/mutations';
import testItemData from '../../testItemData.json';
import testEventData from '../../testEventData.json';
import testFilters from '../../testFilters.json';

describe('store mutations', () => {
	let testState = {};

	beforeEach(() => {
		testState = JSON.parse(JSON.stringify(state));
	});

	it('should set items', () => {
		mutations.setItems(testState, testItemData);
		expect(JSON.stringify(testState.items)).to.be.equal(JSON.stringify(testItemData));
	});
	it('should set all items', () => {
		mutations.setAllItems(testState, testItemData);
		expect(JSON.stringify(testState.allItems)).to.be.equal(JSON.stringify(testItemData));
	});

	it('should set cranachElder events', () => {
		const event = { cranachElder: testEventData };
		mutations.setEvent(testState, event);
		expect(JSON.stringify(testState.events.cranachElder)).to.be.equal(JSON.stringify(testEventData));
	});
	it('should set cranachYounger events', () => {
		const event = { cranachYounger: testEventData };
		mutations.setEvent(testState, event);
		expect(JSON.stringify(testState.events.cranachYounger)).to.be.equal(JSON.stringify(testEventData));
	});
	it('should set luther events', () => {
		const event = { luther: testEventData };
		mutations.setEvent(testState, event);
		expect(JSON.stringify(testState.events.luther)).to.be.equal(JSON.stringify(testEventData));
	});
	it('should set history events', () => {
		const event = { history: testEventData };
		mutations.setEvent(testState, event);
		expect(JSON.stringify(testState.events.history)).to.be.equal(JSON.stringify(testEventData));
	});

	it('should set loading state', () => {
		mutations.setLoadingState(testState, true);
		// eslint-disable-next-line no-unused-expressions
		expect(testState.isLoading).to.be.true;
	});

	it('calculate histogram', () => {
		mutations.setItems(testState, testItemData);
		mutations.calculateHistogram(testState);
		const sumOfItems = Object.values(testState.histogram).reduce((sum, count) => sum + count, 0);
		expect(sumOfItems).to.be.equal(testItemData.length);
	});

	it('should add filter', () => {
		mutations.addFilter(testState, testFilters[0]);
		expect(JSON.stringify(testState.activeFilters)).to.be.equal(JSON.stringify([testFilters[0]]));
	});
	it('should remove filter', () => {
		mutations.addFilter(testState, testFilters[0]);
		mutations.removeFilter(testState, testFilters[0].name);
		expect(testState.activeFilters.length).to.be.equal(0);
	});
	it('should not remove filter', () => {
		mutations.addFilter(testState, testFilters[0]);
		mutations.removeFilter(testState, testFilters[1].name);
		expect(testState.activeFilters.length).to.be.equal(1);
	});
	it('should reset all filters', () => {
		testFilters.forEach((f) => mutations.addFilter(testState, f));
		mutations.resetFilters(testState);
		expect(testState.activeFilters.length).to.be.equal(0);
	});

	it('should set the chart zoom transform', () => {
		const newTransform = new Transform(2, 20, 20);
		mutations.setChartZoomTransform(testState, newTransform);
		expect(testState.chartZoomTransform).to.be.equal(newTransform);
	});
});
