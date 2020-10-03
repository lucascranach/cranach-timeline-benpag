<template>
	<v-row dense>
		<v-col v-for="(component, i) in this.formElements" :key="i">
			<component :is="component" />
		</v-col>
	</v-row>
</template>

<script>
import { mapActions } from 'vuex';
import CategoryFilter from './CategoryFilter.vue';
import IsBestOfFilter from './IsBestOfFilter.vue';
import TextSearchFilter from './TextSearchFilter.vue';
import TimeFilter from './TimeFilter.vue';

export default {
	name: 'Filters',
	components: {
		CategoryFilter,
		IsBestOfFilter,
		TextSearchFilter,
		TimeFilter,
	},
	data() {
		return {
			formElements: [
				TextSearchFilter,
				CategoryFilter,
				TimeFilter,
				IsBestOfFilter,
			],
		};
	},
	methods: {
		...mapActions([
			'addFilter',
			'removeFilter',
		]),
	},
};
</script>
