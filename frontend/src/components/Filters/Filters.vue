<template>
	<v-sheet>
		<v-row v-show="showFilters">
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
							class="text-capitalize"
						>
							{{ $t(component.name) }}
						</v-btn>
					</template>
					<v-card flat class="px-3 py-6">
						<component :ref="component.filterName" :is="component" />
					</v-card>
				</v-menu>
			</v-col>
		</v-row>
		<v-row justify="center">
			<v-chip
				v-for="(filterValue, i) in activeFilterValues" :key="i"
				v-show="filterValue.value"
				class="mx-2"
				close
				:color="colors[filterValue.value] || 'primary'"
				@click:close="removeFilterValue(filterValue)"
			>
				{{ filterValue.value }}
			</v-chip>
			<v-chip
				v-show="activeFilterValues.length > 0"
				class="mx-2"
				label
				@click="resetFilters"
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
	props: {
		showFilters: {
			type: Boolean,
			default: true,
		},
	},
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
			return this.activeFilters.map((f) => {
				if (Array.isArray(f.params)) {
					return f.params.map((value) => ({ name: f.name, value }));
				}
				if (typeof f.params === 'object') {
					return Object.entries(f.params).map(([key, value]) => {
						if (Array.isArray(value)) {
							return value.map((i) => ({ name: f.name, key, value: i }));
						}
						return { name: f.name, key, value };
					}).flat();
				}
				return { name: f.name, value: f.params };
			}).flat();
		},
	},
	methods: {
		...mapActions([
			'addFilter',
			'removeFilter',
			'resetFilters',
		]),
		removeFilterValue(filterValue) {
			this.$refs[filterValue.name][0].removeFilterValue(filterValue);
		},
	},
};
</script>
