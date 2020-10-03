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
				<v-btn @click="switchComponents()">{{ buttonText }}</v-btn>
				<FilterComponent/>
				<loading :active.sync="isLoading"/>
                <Visualization @tooltipClick="openItemInGallery($event)" v-show="activeComponent === 'visualization'" />
                <Gallery v-show="activeComponent === 'gallery'" :scrollToExhibit="scrollToExhibit"/>
			</v-container>
		</v-main>
	</v-app>
</template>

<script>
import { mapState } from 'vuex';
import Loading from 'vue-loading-overlay';
import i18n from '@/plugins/i18n';
import Visualization from './components/Visualization/Visualisation.vue';
import Gallery from './components/Gallery/Gallery.vue';
import FilterComponent from './components/Filters/Filters.vue';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
	name: 'App',
	components: {
		FilterComponent,
		Gallery,
		Visualization,
		Loading,
	},
	data() {
		return {
			currentFilter: undefined,
			activeComponent: 'visualization',
			buttonText: 'Galerie',
			scrollToExhibit: null,
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
		switchComponents() {
			if (this.activeComponent === 'visualization') {
				this.activeComponent = 'gallery';
				this.buttonText = 'Visualisierung';
			} else {
				this.activeComponent = 'visualization';
				this.buttonText = 'Galerie';
			}
		},
		openItemInGallery(exhibit) {
			this.switchComponents();
			this.scrollToExhibit = exhibit;
		},
		changeLocale(locale) {
			i18n.locale = locale;
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
