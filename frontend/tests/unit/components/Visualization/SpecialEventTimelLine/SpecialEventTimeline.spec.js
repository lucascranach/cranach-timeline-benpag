/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import { getWrapper, initializeTest } from '@/../tests/setup';
import SpecialEventTimeline from '@/components/Visualization/SpecialEventTimeLine/SpecialEventTimeline.vue';
import EventToolTipItem from '@/components/Visualization/SpecialEventTimeLine/EventToolTipItem.vue';
import testEventData from '@/../tests/testEventData.json';

describe('SpecialEventTimeline.vue', () => {
	const width = 1600;
	const height = 10;
	const margin = {
		left: 0, right: 0, top: 0, bottom: 0,
	};
	const color = 'blue';
	let wrapper;

	before(() => {
		initializeTest();
		wrapper = getWrapper(SpecialEventTimeline, {
			propsData: {
				width, height, margin, color, eventList: testEventData,
			},
		});
	});

	it('special event timeline should exists', () => {
		expect(wrapper.find('.special-event-timeline').element).to.exist;
	});

	it('special event timeline contains tooltip', () => {
		const tooltip = wrapper.find('.event-timeline-tooltip').element;
		expect(tooltip).to.exist;
		expect(tooltip.id.includes('tooltip-')).to.be.true;
	});

	it('special event timeline tooltip has all properties', () => {
		const component = wrapper.findComponent(EventToolTipItem);
		expect(component.exists()).to.be.true;
		const componentProps = component.props();
		expect(componentProps.maxWidth).to.be.equal(width * 0.4);
		expect(componentProps.maxHeight).to.be.equal(height * 15);
	});

	it('special event timeline contains svg', () => {
		expect(wrapper.find('svg').element).to.exist;
	});

	it('special event timeline svg has all properties', () => {
		const svg = wrapper.find('svg').element;
		expect(svg.id.includes('specialEventTimeline-')).to.be.true;
		expect(parseInt(svg.getAttribute('width'), 10)).to.be.equal(width);
		expect(parseInt(svg.getAttribute('height'), 10)).to.be.equal(height);
	});
});
