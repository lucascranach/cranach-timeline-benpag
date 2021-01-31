<template>
	<v-menu
		id="location-filter"
		offset-y
		tile
		:close-on-content-click="false"
	>
		<template v-slot:activator="{ on, attrs }">
			<v-btn
				id="location-filter-button"
				outlined
				block
				v-bind="attrs"
				v-on="on"
				class="text-none"
			>
				{{ $t('location_filter') }}
			</v-btn>
		</template>
		<v-card id="location-filter-dropdown" flat class="px-3 py-6">
			<v-autocomplete
			v-model="selectedLocations"
			:items="this.getLocations()"
			:label="$t('location_filter')"
			multiple
			chips
			>
			<template v-slot:selection="data">
				<v-chip
					v-bind="data.attrs"
					:input-value="data.selected"
					close
					@click:close="removeAutocompleteChip(data.item)"
				>
					{{ data.item }}
				</v-chip>
			</template>
			</v-autocomplete>
		</v-card>
	</v-menu>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';

export default {
	name: 'LocationFilter',
	filterName: 'locationFilter',
	data() {
		return {
			selectedLocations: [],
		};
	},
	computed: {
		...mapState({
			locationFilter: (state) => state.activeFilters.find((f) => f.name === 'locationFilter'),
		}),
	},
	watch: {
		selectedLocations() {
			if (this.selectedLocations.length === 0) {
				this.removeFilter(this.$options.filterName);
			} else {
				this.applyLocationFilter();
			}
		},
		locationFilter() {
			if (!this.locationFilter) {
				this.selectedLocations = [];
			}
		},
	},
	methods: {
		...mapActions([
			'addFilter',
			'removeFilter',
		]),
		...mapGetters([
			'getLocations',
		]),
		applyLocationFilter() {
			this.addFilter({
				name: this.$options.filterName,
				type: 'location',
				params: { selectedLocations: this.selectedLocations },
			});
		},
		removeFilterValue(filterValue) {
			this.selectedLocations.splice(this.selectedLocations.indexOf(filterValue.value), 1);
		},
		getFilterParameterDescriptions(filterValue) {
			return filterValue.params.selectedLocations.map((location) => ({
				description: location,
				value: location,
			}));
		},
		removeAutocompleteChip(chipName) {
			this.selectedLocations.splice(this.selectedLocations.indexOf(chipName), 1);
		},
	},
};
</script>
