/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import { getWrapper, initializeTest } from '@/../tests/setup';
import IsBestOfFilter from '../../../../src/components/Filters/IsBestOfFilter.vue';

describe('IsBestOfFilter.vue', () => {
	let wrapper;

	before(() => {
		initializeTest();
	});
	beforeEach(() => {
		wrapper = getWrapper(IsBestOfFilter);
	});

	it('best of filter should exist', () => {
		expect(wrapper.find('#best-of-filter').element).to.exist;
	});

	it('best of filter should be visible', () => {
		expect(wrapper.find('#best-of-filter').element.style.display).to.not.equal('none');
	});

	it('click on switch should enable best of filter', async () => {
		await wrapper.find('#best-of-filter').trigger('click');
		expect(wrapper.vm.$data.isBestOf).to.be.true;
	});

	it('two clicks on switch should disable best of filter', async () => {
		await wrapper.find('#best-of-filter').trigger('click');
		await wrapper.find('#best-of-filter').trigger('click');
		expect(wrapper.vm.$data.isBestOf).to.be.false;
	});
});
