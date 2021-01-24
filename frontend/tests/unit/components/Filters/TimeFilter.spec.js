/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import { mount, createLocalVue } from '@vue/test-utils';
import i18n from '@/plugins/i18n';
import Vue from 'vue';
import TimeFilter from '../../../../src/components/Filters/TimeFilter.vue';
import store from '../../../../src/store/index';
import vuetify from '../../../../src/plugins/vuetify';
import config from '../../../../global.config';

global.requestAnimationFrame = () => {};
const localVue = createLocalVue();
Vue.use(vuetify);

describe('TimeFilter.vue', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = mount(TimeFilter, {
			i18n,
			store,
			vuetify,
			localVue,
		});
	});

	it('time filter should exist', () => {
		expect(wrapper.find('#time-filter').element).to.exist;
	});

	it('time filter should be visible', () => {
		expect(wrapper.find('#time-filter').element.style.display).to.not.equal('none');
	});

	it('click on time filter button should open dropdown', async () => {
		await wrapper.find('#time-filter-button').trigger('click');
		expect(wrapper.find('#time-filter-dropdown').element.style.display).to.not.equal('none');
	});

	it('change on slider should enable time filter', async () => {
		await wrapper.find('#time-filter-button').trigger('click');
		await wrapper.setData({ rangeSliderValue: [config.defaultDates.start + 1, config.defaultDates.end] });
		const sliderValues = wrapper.findAll('.v-slider__thumb-container').at(0).attributes('aria-valuenow');
		expect(sliderValues).to.not.equal(`${config.defaultDates.start},${config.defaultDates.end}`);
	});
});
