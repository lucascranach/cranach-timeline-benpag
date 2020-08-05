<template>
        <v-card class="margin">
        <v-row justify="space-around">
            <v-checkbox v-model="paintingsSelected" class="mx-2" label="Gemälde"/>
            <v-checkbox v-model="graphicsSelected" class="mx-2" label="Grafiken"/>
        </v-row>
        <v-row class="mx-2">
            <v-col v-for="item in items" :key="item.id" cols="3" class="px-1">
                <Exhibit :item="item"/>
                <!-- imageUrl is taken as a placeholder and needs to be replaced with CDA Url-->
                <v-btn v-if="item.imageUrl" :href="item.imageUrl" class="button">Weiterlesen</v-btn>
            </v-col>
        </v-row>
        </v-card>
</template>

<script>
import { mapState } from 'vuex';
import Exhibit from './Exhibit.vue';

export default {
	name: 'Gallery',
	components: {
		Exhibit,
	},
	data() {
		return {
			paintingsSelected: false,
			graphicsSelected: false,
		};
	},
	computed: {
		...mapState({
			items: (state) => state.items,
		}),
	},
};
</script>

<style scoped>
    .button {
        margin-top: 10px;
        position: relative;
        left: 50%;
        transform: translateX(-50%);
    }
    .margin {
        margin-top: 10px;
    }
</style>
