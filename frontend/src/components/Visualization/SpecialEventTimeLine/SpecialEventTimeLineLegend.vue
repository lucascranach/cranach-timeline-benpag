<template>
	<v-sheet class="event-time-line-legend text-center">
		<v-btn
			v-for="(eventName, i) in eventNames" :key="i"
			class="text-none"
			text
			small
		>
			<v-icon
				class="mr-1"
				:color="eventColors[eventName]"
				x-small
			>
				mdi-circle
			</v-icon>
			{{ $t(eventName)}}
		</v-btn>
	</v-sheet>
</template>

<script>
export default {
	name: 'SpecialEventTimeLineLegend',
	props: {
		eventNames: {
			type: Array,
			required: true,
		},
	},
	data() {
		return {
			eventColors: {
				cranachElder: 'black',
				cranachYounger: 'purple',
				luther: 'grey',
				history: 'darkCyan',
			},
		};
	},
	computed: {
		useSmallerButtons() {
			return this.$vuetify.breakpoint.name !== 'xl';
		},
	},
};
</script>

<style scoped>
.event-time-line-legend button {
	vertical-align: baseline;
}
</style>
