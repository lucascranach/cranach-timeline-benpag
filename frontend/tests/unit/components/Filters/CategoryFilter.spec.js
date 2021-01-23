/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import { mount, createLocalVue } from '@vue/test-utils';
import i18n from '@/plugins/i18n';
import Vue from 'vue';
import CategoryFilter from '../../../../src/components/Filters/CategoryFilter.vue';
import store from '../../../../src/store/index';
import vuetify from '../../../../src/plugins/vuetify';

global.requestAnimationFrame = () => {};
const localVue = createLocalVue();
Vue.use(vuetify);

describe('CategoryFilter.vue', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = mount(CategoryFilter, {
			i18n,
			store,
			vuetify,
			localVue,
		});
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
		expect(wrapper.vm.$data.selectedCategories).to.be.empty;
	});
});
