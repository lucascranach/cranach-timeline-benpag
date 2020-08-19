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
import Placeholder from '@/components/Placeholder.vue';

export default {
	name: 'Gallery',
	components: {
		Exhibit: () => ({
			component: import('./Exhibit.vue'),
			loading: Placeholder,
		}),
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
