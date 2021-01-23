import { expect } from 'chai';
import { mount } from '@vue/test-utils';
import i18n from '@/plugins/i18n';
import CategoryFilter from '../../../../src/components/Filters/CategoryFilter.vue';
import store from '../../../../src/store/index';

describe('CategoryFilter.vue', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = mount(CategoryFilter, {
			i18n,
			store,
		});
	});

	it('category filter component should exists', () => {
		// eslint-disable-next-line no-unused-expressions,no-undef
		expect(wrapper.find('#category-filter').element).to.exist;
	});
});
