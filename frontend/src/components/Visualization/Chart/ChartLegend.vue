<template>
	<v-sheet
		class="chart-legend text-center text-decoration-none"
		color="transparent"
	>
		<v-btn
			v-for="(category, i) in categories" :key="i"
			class="text-none"
			color="primary"
			text
			small
			@click="toggleCategory(category)"
		>
			<v-icon
				:color="categoryColors[category]"
				small
				:disabled="isDisabled(category)"
			>
				mdi-stop
			</v-icon>
			{{ $t(category)}}
		</v-btn>
	</v-sheet>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import colors from '../../../plugins/colors';

export default {
	name: 'ChartLegend',
	filterName: 'categoryFilter',
	data() {
		return {
			categoryColors: colors.getCategoryColors(),
			selectedCategories: [],
		};
	},
	computed: {
		...mapState({
			items: (state) => state.allItems,
			categoryFilter: (state) => state.activeFilters.find((f) => f.name === 'categoryFilter'),
		}),
		categories() {
			return [...new Set(this.items.map((i) => i.type))];
		},
		useSmallerButtons() {
			return this.$vuetify.breakpoint.name !== 'xl';
		},
	},
	watch: {
		categoryFilter: {
			handler(val) {
				this.selectedCategories = val?.params?.validCategories || [];
			},
		},
	},
	methods: {
		...mapActions([
			'addFilter',
			'removeFilter',
		]),
		isDisabled(category) {
			return this.selectedCategories.length > 0 && this.selectedCategories.includes(category) === false;
		},
		toggleCategory(category) {
			const match = this.selectedCategories.find((c) => c === category);
			if (match !== undefined) {
				this.selectedCategories.splice(this.selectedCategories.indexOf(match), 1);
			} else {
				this.selectedCategories.push(category);
			}

			if (this.selectedCategories.length > 0) {
				this.addFilter({
					name: this.$options.filterName,
					type: 'category',
					params: { validCategories: this.selectedCategories },
				});
			} else {
				this.removeFilter(this.$options.filterName);
			}
		},
	},
};
</script>
