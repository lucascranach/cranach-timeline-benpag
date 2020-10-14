<template>
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
				{{ $t('location_filter') }}
			</v-btn>
		</template>
		<v-card flat class="px-3 py-6">
			<v-autocomplete
			v-model="selectedLocation"
			:items="getLocations"
			/>
		</v-card>
	</v-menu>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';
import config from '../../../global.config';

export default {
	name: 'LocationFilter',
	filterName: 'locationFilter',
	data() {
		return {
			selectedLocation: null,
			colors: config.colors,
			locations: [],
		};
},
	mounted() {
		console.log(this.getLocations());
		this.locations = this.getLocations();
	},
	computed: {
		...mapState({
			locationFilter: (state) => state.activeFilters.find((f) => f.name === 'locationFilter'),
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
		...mapGetters(
			'locations', ['getLocations'],
		),
		applyPlaceFilter() {
			this.addFilter({
				name: this.$options.filterName,
				type: 'place',
				params: { validCategories: this.selectedCategories },
			});
		},
		removeFilterValue(filterValue) {
			this.selectedCategories.splice(this.selectedCategories.indexOf(filterValue.value), 1);
		},
		getFilterParameterDescriptions(filterValue) {
			return filterValue.params.validCategories.map((place) => ({
				description: this.$t(place),
				value: place,
			}));
		},
	},
};
</script>
