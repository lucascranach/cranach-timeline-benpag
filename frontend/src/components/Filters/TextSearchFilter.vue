<template>
	<v-text-field
		v-model="search"
		label="Volltext Suche"
		outlined
		dense
		clearable
		hide-details
		prepend-inner-icon="search"
		@input="asyncSearch()"
	/>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
	name: 'TextSearchFilter',
	filterName: 'search',
	data() {
		return {
			search: '',
		};
	},
	computed: {
		...mapState({
			searchFilter: (state) => state.activeFilters.find((f) => f.name === 'search'),
		}),
	},
	watch: {
		searchFilter() {
			if (this.searchFilter === undefined) {
				this.search = '';
			}
		},
	},
	methods: {
		...mapActions([
			'addFilter',
			'removeFilter',
		]),
		asyncSearch() {
			if (this.search === null || this.search === undefined) {
				this.removeFilter(this.$options.filterName);
			} else {
				setTimeout(() => {
					this.addFilter({
						name: this.$options.filterName,
						type: 'search',
						params: this.search.toLowerCase(),
					});
				}, 0);
			}
		},
		removeFilterValue() {
			this.removeFilter(this.$options.filterName);
		},
	},
};
</script>
