<template>
	<v-sheet>
		<v-switch
			v-for="(category, i) in categoryList" :key="i"
			v-model="selectedCategories"
			:label="$t(category.name)"
			:value="category.value"
			:color="colors[category.value]"
			class="my-1"
			inset
			dense
			multiple
			hide-details
		/>
	</v-sheet>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import config from '../../../global.config';

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
			colors: config.colors,
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
	},
};
</script>
