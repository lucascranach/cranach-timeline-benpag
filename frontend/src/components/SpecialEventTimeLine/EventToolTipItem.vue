<template>
    <v-card>
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
	},
};
</script>

<style scoped>

</style>
