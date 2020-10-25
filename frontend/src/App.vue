<template>
	<v-app>
		<v-app-bar app>
			<v-switch
				v-model="$vuetify.theme.dark"
				label="Dark Theme"
			></v-switch>
			<v-badge
				:value="activeFilters.length > 0"
				:content="activeFilters.length"
				left
				offset-y="20"
				offset-x="20"
				overlap
			>
				<v-btn
					icon
					@click="() => this.showFilters = !this.showFilters"
				>
					<v-icon large>mdi-filter</v-icon>
				</v-btn>
			</v-badge>
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
				<FilterComponent :showFilters="showFilters"/>
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
			showFilters: true,
			languages: [
				{ flag: 'de', language: 'de', title: 'Deutsch' },
				{ flag: 'gb', language: 'en', title: 'English' },
			],
		};
	},
	created() {
		this.loadData();
	},
	computed: {
		...mapState({
			isLoading: (state) => state.isLoading,
			activeFilters: (state) => state.activeFilters,
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
<style>
.v-badge__badge {
	color: var(--v-lighten-base) !important;
}
</style>
