/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import { getWrapper, initializeTest } from '@/../tests/setup';
import config from '@/../global.config';
import TimeFilter from '@/components/Filters/TimeFilter.vue';

describe('TimeFilter.vue', () => {
	let wrapper;

	before(() => {
		initializeTest();
		wrapper = getWrapper(TimeFilter);
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
