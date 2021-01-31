/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import { getWrapper, initializeTest } from '@/../tests/setup';
import TextSearchFilter from '@/components/Filters/TextSearchFilter.vue';

describe('TextSearchFilter.vue', () => {
	let wrapper;

	before(() => {
		initializeTest();
		wrapper = getWrapper(TextSearchFilter);
	});

	it('search should exist', () => {
		expect(wrapper.find('#text-search-filter').element).to.exist;
	});

	it('search should be visible', () => {
		expect(wrapper.find('#text-search-filter').element.style.display).to.not.equal('none');
	});

	it('click on search button should open dropdown', async () => {
		await wrapper.find('#text-search-filter-button').trigger('click');
		expect(wrapper.find('#text-search-filter-dropdown').element.style.display).to.not.equal('none');
	});

	it('enter text should enable search', async () => {
		await wrapper.find('#text-search-filter-button').trigger('click');
		wrapper.find('input[type="text"]').setValue('Paulus');
		expect(wrapper.vm.$data.search).to.not.be.empty;
	});
});
