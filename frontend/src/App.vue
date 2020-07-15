<template>
    <v-app>
        <v-app-bar app>
            <v-spacer/>
            <h1>Cranach Timeline</h1>
            <v-spacer/>
        </v-app-bar>
        <v-main>
            <v-container>
                <v-btn @click="switchComponents()">Galerie</v-btn>
                <div class="activeComponent">
                <Visualisation v-if="activeComponent === 'visualisation'"/>
                <Gallery v-if="activeComponent === 'gallery'"/>
                </div>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
import Visualisation from './components/Visualisation.vue';
import Gallery from './components/Gallery.vue';

export default {
	name: 'App',
	components: {
		Gallery,
		Visualisation,
	},
	data() {
		return {
			activeComponent: 'visualisation',
		};
	},
	methods: {
		switchComponents() {
			if (this.activeComponent === 'visualisation') {
				this.activeComponent = 'gallery';
			} else {
				this.activeComponent = 'visualisation';
			}
		},
	},
};
</script>
<style scoped>
.activeComponent {
    margin-top: 10px;
}
</style>
