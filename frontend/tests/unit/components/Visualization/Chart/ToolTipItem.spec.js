/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import { getWrapper, initializeTest } from '@/../tests/setup';
import ToolTipItem from '@/components/Visualization/Chart/ToolTipItem.vue';
import testItemData from '@/../tests/testItemData.json';

describe('ToolTipItem.vue', () => {
	let wrapper;

	before(() => {
		initializeTest();
		wrapper = getWrapper(ToolTipItem, {
			propsData: { item: testItemData[0] },
		});
	});

	it('tooltip should exists', () => {
		expect(wrapper.find('#tooltip-info-card').element).to.exist;
	});

	it('tooltip should contains a img tag', () => {
		expect(wrapper.find('img').element).to.exist;
	});
});
