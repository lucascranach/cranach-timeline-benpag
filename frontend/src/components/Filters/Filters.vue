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
							{{ $t(transformToI18nKey(component.name)) }}
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
				class="mx-2"
				outlined
				color="grey darken-3"
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
		transformToI18nKey(str) {
			const i18nRegex = /[A-Z\u00C0-\u00D6\u00D8-\u00DE]/g;
			const lcFirstStr = str.charAt(0).toLowerCase() + str.slice(1);
			return lcFirstStr.replace(i18nRegex, (match) => `_${match.toLowerCase()}`);
		},
		removeFilterValue(filterValue) {
			this.$refs[filterValue.name][0].removeFilterValue(filterValue);
		},
		getFilterParameterDescriptions(filterValue) {
			return this.$refs[filterValue.name][0].getFilterParameterDescriptions(filterValue);
		},
	},
};
</script>
