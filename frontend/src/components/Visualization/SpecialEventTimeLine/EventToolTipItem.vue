<template>
    <v-card
		shaped class="d3-tooltip"
		:max-width="maxWidth"
	>
		<v-card-title>{{item.startDate}}</v-card-title>
		<v-card-text>{{item.description}}</v-card-text>
	</v-card>
</template>

<script>
export default {
	name: 'EventToolTipItem',
	props: {
		item: {
			type: Object,
			required: true,
		},
		maxWidth: {
			type: Number,
			required: false,
			default() {
				return 500;
			},
		},
	},
};
</script>

<style scoped>
.d3-tooltip {
	width: fit-content;
	position: absolute;
	overflow: hidden;
	text-align: center;
	pointer-events: none;
	z-index: 999999;
	visibility: hidden;
}
</style>
