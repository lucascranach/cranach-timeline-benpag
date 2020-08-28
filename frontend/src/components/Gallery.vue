<template>
    <v-container>
        <v-row justify="space-around">
            <v-checkbox v-model="paintingsSelected" class="mx-2" label="Gemälde"/>
            <v-checkbox v-model="graphicsSelected" class="mx-2" label="Grafiken"/>
        </v-row>
        <v-virtual-scroll
            :items="scrollItems"
            :item-height="750"
            height="520"
            :bench="itemsPerRow"
        >
            <template v-slot="{ item }">
                <v-row no-gutters class="mt-4">
                    <v-col v-for="exhibit in item" :key="exhibit.id" :cols="columnSize" class="px-4">
                        <Exhibit :item="exhibit"/>
                    </v-col>
                </v-row>
            </template>
        </v-virtual-scroll>
    </v-container>
</template>

<script>
import { mapState } from 'vuex';
import Exhibit from './Exhibit.vue';

export default {
	name: 'Gallery',
	components: { Exhibit },
	data() {
		return {
			itemsPerRow: 4,
			paintingsSelected: false,
			graphicsSelected: false,
		};
	},
	computed: {
		...mapState({
			items: (state) => state.items,
		}),
		columnSize() {
			return 12 / this.itemsPerRow;
		},
		scrollItems() {
			const chunkCount = Math.ceil(this.items.length / this.itemsPerRow);
			const emptyChunks = Array(chunkCount).fill(this.itemsPerRow);
			return emptyChunks.map((chunkSize, index) => this.items.slice(index * chunkSize, (index + 1) * chunkSize));
		},
	},
};
</script>

<style scoped>

</style>
