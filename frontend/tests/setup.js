import { createLocalVue, mount } from '@vue/test-utils';
import store from '@/store/index';
import i18n from '@/plugins/i18n';
import vuetify from '@/plugins/vuetify';

const localVue = createLocalVue();
const app = document.createElement('div');

export function initializeTest() {
	global.requestAnimationFrame = () => {};

	app.id = 'unit-test-app';
	app.setAttribute('data-app', 'true');
	document.body.append(app);
}

export function getWrapper(MyComponent, options = {}) {
	return mount(MyComponent, {
		localVue,
		store,
		i18n,
		vuetify,
		...options,
	});
}
