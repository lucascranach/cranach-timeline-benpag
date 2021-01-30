<template>
	<v-menu
		offset-y
		tile
		:close-on-content-click="false"
	>
	<template v-slot:activator="{ on, attrs }">
			<v-btn
				id="best-of-filter"
				outlined
				block
				v-bind="attrs"
				v-on="on"
				class="text-none"
			>
				{{ $t('miscellaneous') }}
			</v-btn>
		</template>
		<v-card id="best-of-filter-dropdown" flat class="px-3 py-6">
			<v-switch
				:label="$t('is_best_of_filter')"
				v-model="isBestOf"
				:value="isBestOf"
				class="my-1"
				inset
				dense
				multiple
				hide-details
				@click="toggleBestOf"
			/>
		</v-card>
	</v-menu>
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
