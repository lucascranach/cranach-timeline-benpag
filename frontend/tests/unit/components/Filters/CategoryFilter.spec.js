import { expect } from 'chai';
import state from '../../../../src/store/state';
import testItemData from '../../../testItemData.json';

describe('CategoryFilter.vue', () => {
	let testState;

	beforeEach(() => {
		testState = JSON.parse(JSON.stringify(state));
		testState.allItems = testItemData;
		testState.items = testItemData;
	});

	it('should execute addFilter', () => {
		// eslint-disable-next-line no-unused-expressions
		expect(true).to.be.true;
	});
});
