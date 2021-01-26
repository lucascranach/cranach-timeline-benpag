/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import { getWrapper, initializeTest } from '@/../tests/setup';
import SpecialEventTimeLineLegend from '@/components/Visualization/SpecialEventTimeLine/SpecialEventTimeLineLegend.vue';

describe('EventToolTipItem.vue', () => {
	const eventNames = ['cranachElder', 'cranachYounger', 'luther', 'history'];
	let wrapper;

	before(() => {
		initializeTest();
		wrapper = getWrapper(SpecialEventTimeLineLegend, {
			propsData: { eventNames },
		});
	});

	it('event timeline legend should exists', () => {
		expect(wrapper.find('.event-time-line-legend').element).to.exist;
	});

	it('event timeline legend should have four entries', () => {
		expect(wrapper.findAll('button').length).to.equal(eventNames.length);
	});

	it('event timeline legend text has to be localized', () => {
		wrapper.findAll('button').wrappers.forEach((btn, index) => {
			expect(btn.html().includes(eventNames[index])).to.false;
		});
	});
});
