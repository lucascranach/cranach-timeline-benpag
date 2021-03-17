<template>
	<v-app class="no-transition">
		<v-app-bar app short flat color="transparent" class="app-bar-border" >
			<img
				:class="['timeline-logo', this.$vuetify.theme.isDark ? 'timeline-logo-invert' : '']"
				src="Cranach_Timeline.png" alt="Logo"
			/>
			<v-spacer />
			<Filters v-if="this.$vuetify.breakpoint.mdAndUp" style="min-width: 55%"/>
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
					@click="changeLocale(entry.language, index)"
				>
					<span v-bind:class="{'language-btn-underline': languages[index].isActive}">{{ entry.title }}</span>
					<span v-if="index < languages.length - 1" class="language-btn-divider">|</span>
				</button>
			</v-sheet>
		</v-app-bar>
		<v-main>
			<v-container fluid :class="[this.$vuetify.breakpoint.mdAndUp ? 'mt-7' : '']">
				<loading :active.sync="isLoading"/>
				<Filters v-if="this.$vuetify.breakpoint.smAndDown"/>
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
import Filters from './components/Filters/Filters.vue';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
	name: 'App',
	components: {
		Filters,
		Visualization,
		Loading,
	},
	data() {
		return {
			showFilters: true,
			languages: [
				{
					flag: 'de', language: 'de', title: 'DE', isActive: i18n.locale === 'de',
				},
				{
					flag: 'gb', language: 'en', title: 'EN', isActive: i18n.locale === 'en',
				},
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
		async changeLocale(locale, index) {
			i18n.locale = locale;
			this.languages.forEach((lang) => {
				// Reason: We want to manipulate json entries here direct
				// eslint-disable-next-line no-param-reassign
				lang.isActive = false;
			});
			this.languages[index].isActive = true;
			await this.loadData();
			this.applyFilter();
		},
	},
};
</script>

<style>
.app-bar-border > div {
	border-bottom: 1px solid #555;
}
.v-badge__badge {
	color: var(--v-lighten-base) !important;
}

.timeline-logo-invert {
	filter: invert(100%);
}

.timeline-logo {
	position: relative;
	width: auto;
	height: 80%;

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

.language-btn-underline {
    text-decoration: underline;
}

.no-transition * {
	transition: none!important;
}
</style>
