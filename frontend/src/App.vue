<template>
	<v-app>
		<v-app-bar app>
			<v-spacer />
			<h1>Cranach Timeline</h1>
			<v-spacer />
		</v-app-bar>
		<v-main>
			<v-container>
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
	},
};
</script>
<style scoped>

</style>
