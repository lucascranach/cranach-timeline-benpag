<template>
	<v-app>
		<v-app-bar app>
			<v-spacer />
			<h1>Cranach Timeline</h1>
			<v-spacer />
		</v-app-bar>
		<v-main>
			<v-container>
				<v-btn @click="switchComponents()">{{ buttonText }}</v-btn>
				<FilterComponent/>
				<loading :active.sync="isLoading"/>
                <Visualisation @tooltipClick="openItemInGallery($event)" v-show="activeComponent === 'visualisation'" />
                <Gallery v-show="activeComponent === 'gallery'" :scrollToExhibit="scrollToExhibit"/>
			</v-container>
		</v-main>
	</v-app>
</template>

<script>
import { mapState } from 'vuex';
import Loading from 'vue-loading-overlay';
import Visualisation from './components/Visualisation.vue';
import Gallery from './components/Gallery.vue';
import FilterComponent from './components/Filters/Filters.vue';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
	name: 'App',
	components: {
		FilterComponent,
		Gallery,
		Visualisation,
		Loading,
	},
	data() {
		return {
			currentFilter: undefined,
			activeComponent: 'visualisation',
			buttonText: 'Galerie',
			scrollToExhibit: null,
		};
	},
	computed: {
		...mapState({
			isLoading: (state) => state.isLoading,
		}),
	},
	methods: {
		switchComponents() {
			if (this.activeComponent === 'visualisation') {
				this.activeComponent = 'gallery';
				this.buttonText = 'Visualisierung';
			} else {
				this.activeComponent = 'visualisation';
				this.buttonText = 'Galerie';
			}
		},
		openItemInGallery(exhibit) {
			this.switchComponents();
			this.scrollToExhibit = exhibit;
		},
	},
};
</script>
<style scoped>

</style>
