<template>
	<v-app>
		<v-app-bar app>
			<v-spacer/>
			<h1>Cranach Timeline</h1>
			<v-spacer/>
		</v-app-bar>
		<v-main>
			<v-container>
				<v-btn @click="switchComponents()">{{ buttonText }}</v-btn>
				<FilterComponent/>
                <Visualisation v-show="activeComponent === 'visualisation'"/>
                <Gallery v-show="activeComponent === 'gallery'"/>
			</v-container>
		</v-main>
	</v-app>
</template>

<script>
import Visualisation from './components/Visualisation.vue';
import Gallery from './components/Gallery.vue';
import FilterComponent from './components/Filters/Filters.vue';

export default {
	name: 'App',
	components: {
		FilterComponent,
		Gallery,
		Visualisation,
	},
	data() {
		return {
			currentFilter: undefined,
			activeComponent: 'visualisation',
			buttonText: 'Galerie',
		};
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
	},
};
</script>
<style scoped>
.marginTop {
	margin-top: 100px;
}
</style>
