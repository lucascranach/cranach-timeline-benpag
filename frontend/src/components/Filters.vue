<template>
    <sidebar-menu :menu="menu"/>
</template>

<script>

import Vue from 'vue';
import VueSidebarMenu from 'vue-sidebar-menu';
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css';

Vue.use(VueSidebarMenu);
export default {
	name: 'Filters',
	computed: {
		menu: [
			{
				href: '/',
				title: 'Dashboard',
				icon: 'fa fa-user',
			},
			{
				href: '#',
				title: 'Charts',
				icon: 'fa fa-chart-area',
			},
		],
	},
};
</script>

<style scoped>

</style>
