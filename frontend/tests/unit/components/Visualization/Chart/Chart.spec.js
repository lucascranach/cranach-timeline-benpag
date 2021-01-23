import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import store from '@/store/index';
import Chart from '@/components/Visualization/Chart/Chart.vue';

describe('Chart.vue', () => {
	const chartDivId = 'cranach-chart';
	const tooltipDivId = 'chart-tooltip-test';
	let wrapper;

	beforeEach(() => {
		wrapper = shallowMount(Chart, {
			store,
			propsData: { chartDivId, tooltipDivId },
		});
	});

	it('chart should exists', () => {
		// eslint-disable-next-line no-unused-expressions
		expect(wrapper.find(`#${chartDivId}`).element).to.exist;
	});
	it('chart tooltip should exists', () => {
		// eslint-disable-next-line no-unused-expressions
		expect(wrapper.find(`#${tooltipDivId}`).element).to.exist;
	});
	it('chart control bar should exists', () => {
		// eslint-disable-next-line no-unused-expressions
		expect(wrapper.find('.chart-controls').element).to.exist;
	});
	it('chart legend should exists', () => {
		// eslint-disable-next-line no-unused-expressions
		expect(wrapper.find('#chart-legend').element).to.exist;
	});
});
