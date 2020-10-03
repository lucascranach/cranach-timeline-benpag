<template>
	<v-text-field
		v-model="search"
		label="Volltext Suche"
		outlined
		dense
		clearable
		@input="asyncSearch()"
	/>
</template>

<script>
import { mapActions } from 'vuex';

export default {
	name: 'TextSearchFilter',
	data() {
		return {
			search: null,
		};
	},
	methods: {
		...mapActions([
			'addFilter',
			'removeFilter',
		]),
		resetFilters() {
			this.resetSearch();
		},
		asyncSearch() {
			setTimeout(() => {
				this.addFilter({
					name: 'search',
					type: 'search',
					params: this.search.toLowerCase(),
				});
			}, 0);
		},
		resetSearch() {
			this.removeFilter('search');
			this.search = null;
		},
	},
};
</script>

<style scoped>

</style>
