<template>
	<v-app>
		<v-app-bar app>
			<v-spacer />
			<h1>{{$t('cranach_timeline')}}</h1>
			<v-spacer />
			<div>
				<button v-for="entry in languages" :key="entry.title" @click="changeLocale(entry.language)">
					<flag :iso="entry.flag" v-bind:squared=false /> {{entry.title}}
				</button>
			</div>
		</v-app-bar>
		<v-main>
			<v-container>
				<FilterComponent/>
				<loading :active.sync="isLoading"/>
                <Visualization />
			</v-container>
		</v-main>
	</v-app>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Loading from 'vue-loading-overlay';
import i18n from '@/plugins/i18n';
import Visualization from './components/Visualization/Visualisation.vue';
import FilterComponent from './components/Filters/Filters.vue';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
	name: 'App',
	components: {
		FilterComponent,
		Visualization,
		Loading,
	},
	data() {
		return {
			currentFilter: undefined,
			languages: [
				{ flag: 'de', language: 'de', title: 'Deutsch' },
				{ flag: 'gb', language: 'en', title: 'English' },
			],
		};
	},
	computed: {
		...mapState({
			isLoading: (state) => state.isLoading,
		}),
	},
	methods: {
		...mapActions([
			'applyFilter',
			'loadData',
		]),
		async changeLocale(locale) {
			i18n.locale = locale;
			await this.loadData();
			this.applyFilter();
		},
	},
};
</script>
<style scoped>
button {
	padding: 15px;
	border: 1px solid green;
	font-size: 18px;
	margin: 15px;
	}
</style>
