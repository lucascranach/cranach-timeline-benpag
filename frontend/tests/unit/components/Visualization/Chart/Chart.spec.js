/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import { getWrapper, initializeTest } from '@/../tests/setup';
import Chart from '@/components/Visualization/Chart/Chart.vue';
import testItemData from '@/../tests/testItemData.json';

describe('Chart.vue', () => {
	const chartDivId = 'cranach-chart';
	const tooltipDivId = 'chart-tooltip-test';
	let wrapper;

	before(() => {
		initializeTest();
		wrapper = getWrapper(Chart, {
			propsData: { chartDivId, tooltipDivId },
		});
	});

	it('chart should exists', () => {
		expect(wrapper.find(`#${chartDivId}`).element).to.exist;
	});

	it('chart tooltip should exists', () => {
		expect(wrapper.find(`#${tooltipDivId}`).element).to.exist;
	});

	it('chart control bar should exists', () => {
		expect(wrapper.find('.chart-controls').element).to.exist;
	});

	it('chart legend should exists', () => {
		expect(wrapper.find('#chart-legend').element).to.exist;
	});
});
