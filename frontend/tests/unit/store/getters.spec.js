/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import state from '../../../src/store/state';
import getters from '../../../src/store/getters';
import testItemData from '../../testItemData.json';
import config from '../../../global.config';

describe('store getters', () => {
	let testState;

	beforeEach(() => {
		testState = JSON.parse(JSON.stringify(state));
		testState.allItems = testItemData;
		testState.items = testItemData;
	});

	it('should get items', () => {
		const result = getters.getItems(testState);
		expect(JSON.stringify(testItemData)).to.be.equal(JSON.stringify(result));
	});
	it('should has items to be true', () => {
		const result = getters.hasItems(testState);
		expect(result).to.be.true;
	});
	it('should has items to be false because its empty', () => {
		testState.items = [];
		const result = getters.hasItems(testState);
		expect(result).to.be.false;
	});

	it('should get all items', () => {
		const result = getters.getAllItems(testState);
		expect(JSON.stringify(testItemData)).to.be.equal(JSON.stringify(result));
	});

	it('should get images for histogram slider', () => {
		const result = getters.getHistogramImages(testState);
		const maxImageCount = testItemData.filter((i) => i.imageUrl).length;
		expect(maxImageCount > 10 ? 10 : maxImageCount).to.be.equal(result.length);
	});

	it('should get dynamic x axis domain which is same as getStaticXAxisDomain until items are changed', () => {
		const resultA = getters.getXAxisDomain(testState);
		const resultB = getters.getStaticXAxisDomain(testState);
		expect(JSON.stringify(resultA)).to.be.equal(JSON.stringify(resultB));
	});
	it('should get dynamic x axis domain which is different on changed items', () => {
		const resultA = getters.getStaticXAxisDomain(testState);
		testState.items.splice(0, testState.items.length / 4);
		const resultB = getters.getXAxisDomain(testState);
		expect(JSON.stringify(resultA)).to.be.not.equal(JSON.stringify(resultB));
	});

	it('should get static x axis domain with no default dates until allItems greater than 2', () => {
		const resultA = getters.getStaticXAxisDomain(testState);
		const resultB = [config.defaultDates.start, config.defaultDates.end];
		expect(JSON.stringify(resultA)).to.be.not.equal(JSON.stringify(resultB));
	});
	it('should get static x axis domain with default dates when allItems are empty', () => {
		testState.allItems = [];
		const resultA = getters.getStaticXAxisDomain(testState);
		const resultB = [config.defaultDates.start, config.defaultDates.end];
		expect(JSON.stringify(resultA)).to.be.equal(JSON.stringify(resultB));
	});
	it('should get static x axis domain with same values even items are changed', () => {
		const resultA = getters.getStaticXAxisDomain(testState);
		testState.items = [];
		const resultB = getters.getStaticXAxisDomain(testState);
		expect(JSON.stringify(resultA)).to.be.equal(JSON.stringify(resultB));
	});

	it('should get distinct array of locations', () => {
		const resultA = getters.getLocations(testState);
		testState.items.concat(...testItemData);
		const resultB = getters.getLocations(testState);

		expect(JSON.stringify(resultA)).to.be.equal(JSON.stringify(resultB));
	});
});
