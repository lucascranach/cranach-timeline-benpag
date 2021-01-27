/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import { getWrapper, initializeTest } from '@/../tests/setup';
import LocationFilter from '@/components/Filters/LocationFilter.vue';

describe('LocationFilter.vue', () => {
	let wrapper;

	before(() => {
		initializeTest();
		wrapper = getWrapper(LocationFilter);
	});

	it('location filter should exist', () => {
		expect(wrapper.find('#location-filter').element).to.exist;
	});

	it('location filter should be visible', () => {
		expect(wrapper.find('#location-filter').element.style.display).to.not.equal('none');
	});

	it('click on location filter button should open dropdown', async () => {
		await wrapper.find('#location-filter-button').trigger('click');
		expect(wrapper.find('#location-filter-dropdown').element.style.display).to.not.equal('none');
	});
});
