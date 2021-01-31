/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import { getWrapper, initializeTest } from '@/../tests/setup';
import EventToolTipItem from '@/components/Visualization/SpecialEventTimeLine/EventToolTipItem.vue';
import testEventData from '@/../tests/testEventData.json';

describe('EventToolTipItem.vue', () => {
	const maxWidth = 800;
	const maxHeight = 300;
	const item = testEventData[0];
	let wrapper;

	before(() => {
		initializeTest();
		wrapper = getWrapper(EventToolTipItem, {
			propsData: { item, maxWidth, maxHeight },
		});
	});

	it('event tooltip should exists', () => {
		expect(wrapper.find('.event-timeline-tooltip').element).to.exist;
	});

	it('event tooltip should contains a img tag', () => {
		expect(wrapper.find('img').element).to.exist;
	});

	it('event tooltip has max width', () => {
		expect(wrapper.find('.event-timeline-tooltip').element.style.maxWidth).to.equal(`${maxWidth}px`);
	});

	it('event tooltip has min width', () => {
		expect(wrapper.find('.event-timeline-tooltip').element.style.minWidth).to.equal(`${maxWidth / 2}px`);
	});

	it('event tooltip has height', () => {
		expect(wrapper.find('.event-timeline-tooltip').element.style.height).to.equal(`${maxHeight}px`);
	});

	it('event tooltip contains expected data', () => {
		const htmlTextContent = wrapper.find('#event-timeline-tooltip-text-content').html();
		const localDateValue = new Date(item.startDate).toLocaleDateString(undefined, {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		});
		expect(htmlTextContent.includes(localDateValue)).to.be.true;
		expect(htmlTextContent.includes(item.description)).to.be.true;
	});
});
