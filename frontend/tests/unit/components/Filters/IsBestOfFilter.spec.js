/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import { mount, createLocalVue } from '@vue/test-utils';
import i18n from '@/plugins/i18n';
import Vue from 'vue';
import IsBestOfFilter from '../../../../src/components/Filters/IsBestOfFilter.vue';
import store from '../../../../src/store/index';
import vuetify from '../../../../src/plugins/vuetify';

global.requestAnimationFrame = () => {};
const localVue = createLocalVue();
Vue.use(vuetify);

describe('IsBestOfFilter.vue', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = mount(IsBestOfFilter, {
			i18n,
			store,
			vuetify,
			localVue,
		});
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
