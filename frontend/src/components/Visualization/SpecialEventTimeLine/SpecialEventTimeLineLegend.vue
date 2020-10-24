<template>
	<v-sheet
		color="transparent"
		class="event-time-line-legend text-center"
	>
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
			{{ $t(getI18NKey(eventName))}}
		</v-btn>
	</v-sheet>
</template>

<script>
import colors from '../../../plugins/colors';

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
				cranachElder: colors.turquoise,
				cranachYounger: colors.rose,
				luther: colors.brown,
				history: colors.purple,
			},
		};
	},
	computed: {
		useSmallerButtons() {
			return this.$vuetify.breakpoint.name !== 'xl';
		},
	},
	methods: {
		getI18NKey(str) {
			const REGEX = /[A-Z\u00C0-\u00D6\u00D8-\u00DE]/g;
			return str.replace(REGEX, (match) => `_${match.toLowerCase()}`);
		},
	},
};
</script>

<style scoped>
.event-time-line-legend button {
	vertical-align: baseline;
}
</style>
