<template>
    <div>
        <v-row justify="space-around">
            <v-checkbox v-model="paintingsSelected" class="mx-2" label="Gemälde"/>
            <v-checkbox v-model="graphicsSelected" class="mx-2" label="Grafiken"/>
        </v-row>
        <v-virtual-scroll
            :items="scrollItems"
            :item-height="650"
            height="520"
            bench="8"
        >
            <template v-slot="{ item }">
               <v-row no-gutters>
                   <v-col v-for="exhibit in item" :key="exhibit.id" cols="3" class="px-4">
                       <Exhibit :item="exhibit"/>
                   </v-col>
               </v-row>
            </template>
        </v-virtual-scroll>
    </div>
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
		scrollItems() {
			return this.items.reduce((resultArray, item, index) => {
				const chunkIndex = Math.floor(index / 4);
				if (!resultArray[chunkIndex]) {
					// eslint-disable-next-line no-param-reassign
					resultArray[chunkIndex] = []; // start a new chunk
				}
				resultArray[chunkIndex].push(item);
				return resultArray;
			}, []);
		},
	},
};
</script>

<style scoped>
    .margin {
        margin-top: 10px;
    }
</style>
