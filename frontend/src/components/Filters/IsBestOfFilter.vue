<template>
	<v-switch
		label="Show Best Of only"
		inset
		dense
	/>
</template>

<script>
import { mapActions } from 'vuex';

export default {
	name: 'IsBestOfFilter',
	data() {
		return {
			isBestOf: false,
		};
	},
	methods: {
		...mapActions([
			'addFilter',
			'removeFilter',
		]),
		applyIsBestOfFilter() {
			this.addFilter({
				name: 'isBestOfFilter',
				type: 'isBestOf',
				params: this.isBestOf,
			});
		},
		resetIsBestOfFilter() {
			this.removeFilter('isBestOfFilter');
			this.isBestOf = false;
		},
	},
};
</script>

<style scoped>

</style>
