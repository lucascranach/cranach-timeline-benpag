/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import { mount, createLocalVue } from '@vue/test-utils';
import i18n from '@/plugins/i18n';
import Vue from 'vue';
import TextSearchFilter from '../../../../src/components/Filters/TextSearchFilter.vue';
import store from '../../../../src/store/index';
import vuetify from '../../../../src/plugins/vuetify';

global.requestAnimationFrame = () => {};
const localVue = createLocalVue();
Vue.use(vuetify);

describe('TextSearchFilter.vue', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = mount(TextSearchFilter, {
			i18n,
			store,
			vuetify,
			localVue,
		});
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
