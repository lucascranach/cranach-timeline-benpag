<template>
	<v-combobox
		:items="Object.values(category)"
		label="Kategorie"
		multiple
		outlined
		dense
	/>
</template>

<script>
import { mapActions } from 'vuex';
import config from '../../../global.config';

export default {
	name: 'CategoryFilter',
	data() {
		return {
			category: {
				active: false,
				paintings: 'painting',
				graphics: 'graphic',
				archivals: 'archival',
			},
			stylePainting: {
				color: config.colors.paintings,
			},
			styleGraphic: {
				color: config.colors.graphics,
			},
			styleArchivals: {
				color: config.colors.archivals,
			},
		};
	},
	methods: {
		...mapActions([
			'addFilter',
			'removeFilter',
		]),
		resetFilters() {
			this.resetCategoryFilter();
		},
		applyCategoryFilter() {
			this.addFilter({
				name: 'categoryFilter',
				type: 'category',
				params: { validCategories: Object.values(this.category) },
			});
		},
		resetCategoryFilter() {
			this.removeFilter('categoryFilter');
			this.category = {
				paintings: 'painting',
				graphics: 'graphic',
				archivals: 'archival',
			};
		},
		applyCategoryButton(filterType) {
			switch (filterType) {
			case 'painting':
				if (this.category.paintings === 'painting') {
					this.category.paintings = '';
					this.stylePainting.color = 'grey';
				} else {
					this.category.paintings = 'painting';
					this.stylePainting.color = config.colors.paintings;
				}
				break;
			case 'graphic':
				if (this.category.graphics === 'graphic') {
					this.category.graphics = '';
					this.styleGraphic.color = 'grey';
				} else {
					this.category.graphics = 'graphic';
					this.styleGraphic.color = config.colors.graphics;
				}
				break;
			case 'archival':
				if (this.category.archivals === 'archival') {
					this.category.archivals = '';
					this.styleArchivals.color = 'grey';
				} else {
					this.category.archivals = 'archival';
					this.styleArchivals.color = config.colors.archivals;
				}
				break;
			default: break;
			}
			this.applyCategoryFilter();
		},
	},
};
</script>

<style scoped>

</style>
