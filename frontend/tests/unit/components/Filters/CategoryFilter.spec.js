/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import { getWrapper, initializeTest } from '@/../tests/setup';
import CategoryFilter from '../../../../src/components/Filters/CategoryFilter.vue';

describe('CategoryFilter.vue', () => {
	let wrapper;

	before(() => {
		initializeTest();
	});
	beforeEach(() => {
		wrapper = getWrapper(CategoryFilter);
	});

	it('category filter should exist', () => {
		expect(wrapper.find('#category-filter').element).to.exist;
	});

	it('category filter should be visible', () => {
		expect(wrapper.find('#category-filter').element.style.display).to.not.equal('none');
	});

	it('click on category filter button should open dropdown', async () => {
		await wrapper.find('#category-filter-button').trigger('click');
		expect(wrapper.find('#category-filter-dropdown').element.style.display).to.not.equal('none');
	});

	it('click on switch should enable category filter', async () => {
		await wrapper.find('#category-filter-button').trigger('click');
		await wrapper.find('.v-input--selection-controls__input').trigger('click');
		expect(wrapper.vm.$data.selectedCategories).to.not.be.empty;
	});

	it('two clicks on switch should disable category filter', async () => {
		await wrapper.find('#category-filter-button').trigger('click');
		await wrapper.find('.v-input--selection-controls__input').trigger('click');
		await wrapper.find('.v-input--selection-controls__input').trigger('click');
		expect(wrapper.vm.$data.selectedCategories).deep.to.be.equal(['painting', 'graphic', 'archival']);
	});
});
