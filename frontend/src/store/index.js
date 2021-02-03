import Vue from 'vue';
import Vuex from 'vuex';
import state from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

Vue.use(Vuex);

export default new Vuex.Store({
	strict: true,
	devtools: true,
	state,
	getters,
	mutations,
	actions,
});
