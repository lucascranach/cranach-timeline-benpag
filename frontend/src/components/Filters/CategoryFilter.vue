<template>
	<v-menu
		id="category-filter"
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
				class="text-none"
			>
				{{ $t('category_filter') }}
			</v-btn>
		</template>
		<v-card flat class="px-3 py-6">
			<v-switch
				v-for="(category, i) in categoryList" :key="i"
				v-model="selectedCategories"
				:label="$t(category.name)"
				:value="category.value"
				class="my-1"
				inset
				dense
				multiple
				hide-details
			/>
		</v-card>
	</v-menu>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import colors from '../../plugins/colors';

export default {
	name: 'CategoryFilter',
	filterName: 'categoryFilter',
	data() {
		return {
			categoryList: [
				{ name: 'paintings', value: 'painting' },
				{ name: 'graphics', value: 'graphic' },
				{ name: 'archivals', value: 'archival' },
			],
			colors: colors.getCategoryColors(),
			selectedCategories: [],
		};
	},
	computed: {
		...mapState({
			categoryFilter: (state) => state.activeFilters.find((f) => f.name === 'categoryFilter'),
		}),
	},
	watch: {
		selectedCategories() {
			if (this.selectedCategories.length < 1) {
				this.removeFilter(this.$options.filterName);
			} else {
				this.applyCategoryFilter();
			}
		},
		categoryFilter() {
			if (this.categoryFilter === undefined) {
				this.selectedCategories = [];
			} else {
				this.selectedCategories = this.categoryFilter.params.validCategories;
			}
		},
	},
	methods: {
		...mapActions([
			'addFilter',
			'removeFilter',
		]),
		applyCategoryFilter() {
			this.addFilter({
				name: this.$options.filterName,
				type: 'category',
				params: { validCategories: this.selectedCategories },
			});
		},
		removeFilterValue(filterValue) {
			this.selectedCategories.splice(this.selectedCategories.indexOf(filterValue.value), 1);
		},
		getFilterParameterDescriptions(filterValue) {
			return filterValue.params.validCategories.map((category) => ({
				description: this.$t(category),
				value: category,
			}));
		},
	},
};
</script>
