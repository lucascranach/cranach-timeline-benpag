<template>
	<v-sheet
		color="transparent"
	>
		<v-row v-show="showFilters">
			<v-col v-for="(component, i) in this.formElements" :key="i">
				<component :ref="component.filterName" :is="component" />
			</v-col>
		</v-row>
		<v-row justify="center" class="mb-1" v-show="activeFilterValues.length > 0">
			<v-chip
				v-for="(filterValue, i) in activeFilterValues" :key="i"
				class="mx-2 mb-1"
				outlined
				color="primary"
				close
				@click:close="removeFilterValue(filterValue)"
			>
				{{ filterValue.description }}
			</v-chip>
			<v-chip
				v-show="activeFilterValues.length > 0"
				class="mx-2"
				label
				@click="resetFilters"
			>
				{{ $t('reset') }}
			</v-chip>
		</v-row>
	</v-sheet>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import LocationFilter from './LocationFilter.vue';
import CategoryFilter from './CategoryFilter.vue';
import IsBestOfFilter from './IsBestOfFilter.vue';
import TextSearchFilter from './TextSearchFilter.vue';
import TimeFilter from './TimeFilter.vue';
import colors from '../../plugins/colors';

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
		LocationFilter,
	},
	data() {
		return {
			colors: colors.getCategoryColors(),
			formElements: [
				TextSearchFilter,
				CategoryFilter,
				TimeFilter,
				LocationFilter,
				IsBestOfFilter,
			],
		};
	},
	computed: {
		...mapState({
			activeFilters: (state) => state.activeFilters,
		}),
		activeFilterValues() {
			return this.activeFilters.map(
				(filter) => this.getFilterParameterDescriptions(filter).map((description) => ({ ...filter, ...description })),
			).flat();
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
		getFilterParameterDescriptions(filterValue) {
			return this.$refs[filterValue.name][0].getFilterParameterDescriptions(filterValue);
		},
	},
};
</script>
