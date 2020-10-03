<template>
	<v-switch
		v-model="isBestOf"
		class="mt-0"
		label="Show Best Of only"
		inset
		dense
		hide-details
		@change="applyIsBestOfFilter"
	/>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
	name: 'IsBestOfFilter',
	data() {
		return {
			isBestOf: false,
		};
	},
	computed: {
		...mapState({
			bestOfFilter: (state) => state.activeFilters.find((f) => f.name === 'isBestOfFilter'),
		}),
	},
	watch: {
		bestOfFilter() {
			if (this.bestOfFilter === undefined) {
				this.isBestOf = false;
			}
		},
	},
	methods: {
		...mapActions([
			'addFilter',
			'removeFilter',
		]),
		applyIsBestOfFilter() {
			if (this.isBestOf) {
				this.addFilter({
					name: 'isBestOfFilter',
					type: 'isBestOf',
					params: this.isBestOf,
				});
			} else {
				this.removeFilter('isBestOfFilter');
			}
		},
	},
};
</script>
