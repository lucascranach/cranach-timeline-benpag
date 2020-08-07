import Vue from 'vue';
import App from './App.vue';
import ErrorPage from './Error.vue';
import store from './store';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;
Vue.config.devtools = false;

new Vue({
	store,
	vuetify,
	render: (h) => h(App),
}).$mount('#app');

function showErrorPage(data) {
	new Vue({
		vuetify,
		render: (h) => h(ErrorPage, {
			props: {
				errorData: data,
			},
		}),
	}).$mount('#app');
}

Vue.config.errorHandler = (err, vm, info) => {
	showErrorPage({
		err,
		vm,
		info,
	});
};

window.onerror = (message, source, lineno, colno, error) => {
	showErrorPage({
		message,
		source,
		lineno,
		colno,
		error,
	});
};
