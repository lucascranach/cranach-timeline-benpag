<template>
        <v-card class="margin">
        <v-row justify="space-around">
            <v-checkbox v-model="paintingsSelected" class="mx-2" label="Gemälde"/>
            <v-checkbox v-model="graphicsSelected" class="mx-2" label="Grafiken"/>
        </v-row>
        <v-row class="mx-2">
            <v-col v-for="item in items" :key="item.id" cols="3" class="px-1">
                <Exhibit :item="item"/>
            </v-col>
        </v-row>
        </v-card>
</template>

<script>
import { mapState } from 'vuex';
// import lazyLoadComponent from '@/utils/lazy-load-component';
// import ExhibitPlaceholder from '@/components/ExhibitPlaceholder.vue';
import Exhibit from '@/components/Exhibit.vue';

export default {
	name: 'Gallery',
	components: {
		/* Exhibit: lazyLoadComponent({
			componentFactory: () => import('./Exhibit.vue'),
			loading: ExhibitPlaceholder,
		}), */
		Exhibit, // : () => import('./Exhibit.vue'),
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
    .margin {
        margin-top: 10px;
    }
</style>
