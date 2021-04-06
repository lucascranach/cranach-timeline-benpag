/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import { getWrapper, initializeTest } from '@/../tests/setup';
import ChartLegend from '@/components/Visualization/Chart/ChartLegend.vue';
import testItemData from '@/../tests/testItemData.json';

const categoryTypeCount = [...new Set(testItemData.map((i) => i.type))].length;

describe('ChartLegend.vue', () => {
	let wrapper;

	before(() => {
		initializeTest();
	});
	beforeEach(() => {
		wrapper = getWrapper(ChartLegend);
		wrapper.vm.$store.commit('setAllItems', testItemData);
		wrapper.vm.$store.commit('setItems', testItemData);
	});

	it('chart legend should exists', () => {
		expect(wrapper.find('.chart-legend').element).to.exist;
	});

	it('all chart legend should exists', () => {
		expect(wrapper.findAll('button').length).to.equal(categoryTypeCount);
	});

	it('each button should add one type of category', async () => {
		const legendButtons = wrapper.findAll('button').wrappers;
		await Promise.all(legendButtons.map((btn) => btn.trigger('click')));
		expect(wrapper.vm.$data.selectedCategories.length).to.equal(categoryTypeCount);
	});

	it('toggle of button should work', async () => {
		const legendButton = wrapper.find('button');
		await legendButton.trigger('click');
		await legendButton.trigger('click');
		expect(wrapper.vm.$data.selectedCategories.length).to.equal(0);
	});
});
