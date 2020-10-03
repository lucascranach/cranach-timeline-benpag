<template>
	<v-sheet>
		<v-row>
			<v-col v-for="(component, i) in this.formElements" :key="i">
				<v-menu
					offset-y
					tile
					:close-on-content-click="false"
				>
					<template v-slot:activator="{ on, attrs }">
						<v-btn
							outlined
							block
							v-bind="attrs"
							v-on="on"
						>
							{{ component.name }}
						</v-btn>
					</template>
					<v-card flat class="px-3 py-6">
						<component :is="component" />
					</v-card>
				</v-menu>
			</v-col>
		</v-row>
		<v-row justify="center">
			<v-chip
				v-for="(filterValue, i) in activeFilterValues" :key="i"
				v-show="filterValue.value"
				class="mx-2"
				:color="colors[filterValue.value] || 'primary'"
				close
			>
				{{ filterValue.value }}
			</v-chip>
			<v-chip
				v-show="activeFilterValues.length > 0"
				class="mx-2"
				label
				@click="this.resetFilters"
			>
				Reset all
			</v-chip>
		</v-row>
	</v-sheet>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import CategoryFilter from './CategoryFilter.vue';
import IsBestOfFilter from './IsBestOfFilter.vue';
import TextSearchFilter from './TextSearchFilter.vue';
import TimeFilter from './TimeFilter.vue';
import config from '../../../global.config';

export default {
	name: 'Filters',
	components: {
		CategoryFilter,
		IsBestOfFilter,
		TextSearchFilter,
		TimeFilter,
	},
	data() {
		return {
			colors: config.colors,
			formElements: [
				TextSearchFilter,
				CategoryFilter,
				TimeFilter,
				IsBestOfFilter,
			],
		};
	},
	computed: {
		...mapState({
			activeFilters: (state) => state.activeFilters,
		}),
		activeFilterValues() {
			console.log('activeFilterValues');
			return this.activeFilters.map((f) => {
				if (typeof f.params === 'object') {
					return Object.values(f.params).flat().map((value) => ({ name: f.name, value }));
				}
				return { name: f.name, value: f.params };
			}).flat();
		},
	},
	methods: {
		...mapActions([
			'resetFilters',
		]),
	},
};
</script>
