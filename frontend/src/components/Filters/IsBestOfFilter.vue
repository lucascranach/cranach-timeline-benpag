<template>
	<v-btn
		outlined
		block
		class="text-capitalize"
		@click="toggleBestOf"
	>
		{{ $t('is_best_of_filter') }}
	</v-btn>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
	name: 'IsBestOfFilter',
	filterName: 'isBestOfFilter',
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
		toggleBestOf() {
			this.isBestOf = !this.isBestOf;
			this.applyIsBestOfFilter();
		},
		applyIsBestOfFilter() {
			if (this.isBestOf) {
				this.addFilter({
					name: this.$options.filterName,
					type: 'isBestOf',
					params: this.isBestOf,
				});
			} else {
				this.removeFilter(this.$options.filterName);
			}
		},
		removeFilterValue() {
			this.removeFilter(this.$options.filterName);
		},
		getFilterParameterDescriptions() {
			return [{ description: this.$t('best_of_only'), value: this.isBestOf }];
		},
	},
};
</script>
