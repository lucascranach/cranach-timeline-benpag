<template>
	<v-text-field
		v-model="search"
		label="Volltext Suche"
		outlined
		dense
		clearable
		hide-details
		@input="asyncSearch()"
	/>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
	name: 'TextSearchFilter',
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
				this.removeFilter('search');
			} else {
				setTimeout(() => {
					this.addFilter({
						name: 'search',
						type: 'search',
						params: this.search.toLowerCase(),
					});
				}, 0);
			}
		},
	},
};
</script>
