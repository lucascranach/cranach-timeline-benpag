import { expect } from 'chai';
import { mount } from '@vue/test-utils';
import store from '@/store/index';
import vuetify from '@/plugins/vuetify';
import ChartControlBar from '@/components/Visualization/Chart/ChartControlBar.vue';

describe('ChartControlBar.vue', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = mount(ChartControlBar, {
			store,
			vuetify,
			propsData: { minZoomLevel: 1, maxZoomLevel: 10 },
		});
	});
	afterEach(() => {
		wrapper.destroy();
	});

	it('control bar should exists', () => {
		// eslint-disable-next-line no-unused-expressions
		expect(wrapper.exists()).to.be.true;
	});
	it('control bar should have three buttons', () => {
		expect(wrapper.findAll('button').length).to.be.equal(3);
	});
	it('control bar should emit zoomIn', async () => {
		await wrapper.get('#chart-control-bar-zoom-in').trigger('click');
		// eslint-disable-next-line no-unused-expressions
		expect(wrapper.emitted('zoomIn').length).to.be.equal(1);
	});
	/*
	it('control bar should emit zoomOut', async () => {
		await wrapper.get('#chart-control-bar-zoom-out').trigger('click');
		// eslint-disable-next-line no-unused-expressions
		expect(wrapper.emitted('zoomOut').length).to.be.equal(1);
	});
	it('control bar should emit resetZoom', async () => {
		await wrapper.get('#chart-control-bar-zoom-reset').trigger('click');
		// eslint-disable-next-line no-unused-expressions
		expect(wrapper.emitted('resetZoom').length).to.be.equal(1);
	});
	// */
});
