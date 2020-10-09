<template>
	<v-menu
		v-model="isMenuOpen"
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
				{{ $t('text_search_filter') }}
			</v-btn>
		</template>
		<v-card flat class="px-3 py-6">
			<v-text-field
				v-model="search"
				:label="$t('text_search_filter')"
				outlined
				dense
				clearable
				hide-details
				:autofocus="isMenuOpen"
				prepend-inner-icon="search"
				@input="asyncSearch()"
			/>
		</v-card>
	</v-menu>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
	name: 'TextSearchFilter',
	filterName: 'search',
	data() {
		return {
			search: '',
			isMenuOpen: false,
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
			if (this.search === null || this.search === undefined || this.search === '') {
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
		getFilterParameterDescriptions(filterValue) {
			return [{ description: `"${filterValue.params}"`, value: filterValue.params }];
		},
	},
};
</script>
