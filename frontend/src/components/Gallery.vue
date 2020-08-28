<template>
    <v-container>
        <v-row justify="space-around">
            <v-checkbox v-model="paintingsSelected" class="mx-2" label="Gemälde"/>
            <v-checkbox v-model="graphicsSelected" class="mx-2" label="Grafiken"/>
        </v-row>
        <v-virtual-scroll
            id="galleryScroller"
            :items="scrollItems"
            :item-height="itemHeight"
            height="520"
            :bench="itemsPerRow"
            class="flex flex-column"
        >
            <template v-slot="{ item }">
                <v-row no-gutters>
                    <v-col v-for="exhibit in item" :key="exhibit.id" :cols="columnSize" class="px-4">
                        <Exhibit :id="`exhibit-${exhibit.id}`" :item="exhibit"/>
                    </v-col>
                </v-row>
            </template>
        </v-virtual-scroll>
    </v-container>
</template>

<script>
import { mapState } from 'vuex';
import Exhibit from '@/components/Exhibit.vue';

export default {
	name: 'Gallery',
	components: { Exhibit },
	props: {
		scrollToExhibit: {
			type: Object,
			required: false,
		},
	},
	data() {
		return {
			itemsPerRow: 4,
			paintingsSelected: false,
			graphicsSelected: false,
			scrollingOptions: {
				duration: 300,
				offset: 0,
				easing: 'easeInOutCubic',
				container: '#galleryScroller',
			},
			itemHeight: 750,
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
	watch: {
		scrollToExhibit: {
			handler(value) {
				const index = this.items.indexOf(value);
				const offset = Math.floor(index / this.itemsPerRow) * this.itemHeight;
				console.log(index, offset);
				this.$vuetify.goTo(offset, this.scrollingOptions);
			},
		},
	},
};
</script>

<style scoped>
</style>
