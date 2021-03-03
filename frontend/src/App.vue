<template>
	<v-app class="no-transition">
		<v-app-bar app short flat>
			<v-badge
				class="filter-badge"
				:value="activeFilters.length > 0"
				:content="activeFilters.length"
				right
				offset-y="40"
				offset-x="20"
				overlap
			>
				<v-btn
					icon
					@click="() => this.showFilters = !this.showFilters"
				>
					<v-icon large>{{this.showFilters ? 'mdi-filter-minus-outline' : 'mdi-filter-plus-outline' }}</v-icon>
				</v-btn>
			</v-badge>
			<img
				:class="['timeline-logo', this.$vuetify.theme.isDark ? 'timeline-logo-invert' : '']"
				src="/Cranach_Timeline.png" alt="Logo"
			/>
			<v-spacer />
			<v-switch
				class="theme-switch"
				v-model="$vuetify.theme.dark"
				dense
				flat
				inset
				hide-details
				prepend-icon="mdi-white-balance-sunny"
				append-icon="mdi-brightness-3"
			/>
			<v-sheet class="pr-3" color="transparent">
				<button
					v-for="(entry, index) in languages" :key="entry.title"
					class="language-btn"
					@click="changeLocale(entry.language)"
				>
					{{ entry.title }}
					<span v-if="index < languages.length - 1" class="language-btn-divider">|</span>
				</button>
			</v-sheet>
		</v-app-bar>
		<v-main>
			<v-container fluid class="px-6 pt-1">
				<FilterComponent :showFilters="showFilters"/>
				<loading :active.sync="isLoading"/>
                <Visualization/>
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
				{ flag: 'de', language: 'de', title: 'DE' },
				{ flag: 'gb', language: 'en', title: 'EN' },
			],
		};
	},
	created() {
		document.title = 'Cranach Timeline';
		this.loadData();
	},
	computed: {
		...mapState({
			isLoading: (state) => state.isLoading,
			activeFilters: (state) => state.activeFilters,
		}),
		colors() {
			return this.$vuetify.theme.isDark ? this.$vuetify.theme.themes.dark : this.$vuetify.theme.themes.light;
		},
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

.timeline-logo-invert {
	filter: invert(100%);
}

.timeline-logo {
	position: absolute;
	width: auto;
	height: 80%;
	left: 50%;
	transform: translateX(-50%);
}

.filter-badge {
	transform: scale(0.75);
}

.theme-switch {
	transform: scale(0.75);
}
.theme-switch .v-input--selection-controls__input {
	margin-right: 0;
}

.theme-switch .v-input__prepend-outer {
	margin-right: 18px;
}

.theme-switch .v-input__append-outer {
	margin-left: 0;
}

.language-btn:focus {
	border: 0;
	outline: 0;
}

.language-btn:hover {
	text-decoration: underline;
}

.language-btn-divider {
	padding: 0 5px;
}

.no-transition * {
	transition: none!important;
}
</style>
