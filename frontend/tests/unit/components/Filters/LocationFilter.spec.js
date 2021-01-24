/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import { mount, createLocalVue } from '@vue/test-utils';
import i18n from '@/plugins/i18n';
import Vue from 'vue';
import LocationFilter from '../../../../src/components/Filters/LocationFilter.vue';
import store from '../../../../src/store/index';
import vuetify from '../../../../src/plugins/vuetify';

global.requestAnimationFrame = () => {};
const localVue = createLocalVue();
Vue.use(vuetify);

describe('LocationFilter.vue', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = mount(LocationFilter, {
			i18n,
			store,
			vuetify,
			localVue,
		});
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
