/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import { getWrapper, initializeTest } from '@/../tests/setup';
import ChartControlBar from '@/components/Visualization/Chart/ChartControlBar.vue';
import { zoomIdentity } from 'd3-zoom';

describe('ChartControlBar.vue', () => {
	let wrapper;

	before(() => {
		initializeTest();
	});
	beforeEach(() => {
		wrapper = getWrapper(ChartControlBar, { propsData: { minZoomLevel: 1, maxZoomLevel: 10 } });
	});
	afterEach(() => {
		wrapper.vm.$store.commit('setChartZoomTransform', zoomIdentity);
	});

	it('control bar should exists', () => {
		expect(wrapper.exists()).to.be.true;
	});

	it('control bar should have three buttons', () => {
		expect(wrapper.findAll('button').length).to.be.equal(3);
	});

	it('control bar should emit zoomIn', async () => {
		await wrapper.get('#chart-control-bar-zoom-in').trigger('click');
		expect(wrapper.emitted('zoomIn').length).to.be.equal(1);
	});

	it('control bar should emit zoomIn if maxZoomLevel not reached', async () => {
		wrapper.vm.$store.commit('setChartZoomTransform', zoomIdentity.scale(10));
		await wrapper.vm.$nextTick();
		await wrapper.get('#chart-control-bar-zoom-in').trigger('click');
		expect(wrapper.emitted('zoomIn')).to.be.equal(undefined);
	});

	it('control bar should not emit zoomOut if maxZoomLevel reached', async () => {
		await wrapper.get('#chart-control-bar-zoom-out').trigger('click');
		expect(wrapper.emitted('zoomOut')).to.be.equal(undefined);
	});

	it('control bar should emit zoomOut if minZoomLevel not reached', async () => {
		wrapper.vm.$store.commit('setChartZoomTransform', zoomIdentity.scale(2));
		await wrapper.vm.$nextTick();
		await wrapper.get('#chart-control-bar-zoom-out').trigger('click');
		expect(wrapper.emitted('zoomOut').length).to.be.equal(1);
	});

	it('control bar should not emit resetZoom if minZoomLevel reached', async () => {
		await wrapper.get('#chart-control-bar-zoom-reset').trigger('click');
		expect(wrapper.emitted('resetZoom')).to.be.equal(undefined);
	});

	it('control bar should emit resetZoom if minZoomLevel not reached', async () => {
		wrapper.vm.$store.commit('setChartZoomTransform', zoomIdentity.scale(2));
		await wrapper.vm.$nextTick();
		await wrapper.get('#chart-control-bar-zoom-reset').trigger('click');
		expect(wrapper.emitted('resetZoom').length).to.be.equal(1);
	});
});
