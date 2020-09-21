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
				<FilterComponent />
                <Visualization @tooltipClick="openItemInGallery($event)" v-show="activeComponent === 'visualization'" />
                <Gallery v-show="activeComponent === 'gallery'" :scrollToExhibit="scrollToExhibit"/>
			</v-container>
		</v-main>
	</v-app>
</template>

<script>
import Visualization from './components/Visualization.vue';
import Gallery from './components/Gallery.vue';
import FilterComponent from './components/Filters/Filters.vue';

export default {
	name: 'App',
	components: {
		FilterComponent,
		Gallery,
		Visualization,
	},
	data() {
		return {
			currentFilter: undefined,
			activeComponent: 'vizualisation',
			buttonText: 'Galerie',
			scrollToExhibit: null,
		};
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
