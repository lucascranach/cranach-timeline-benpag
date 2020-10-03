<template>
	<v-menu
		v-model="menu"
		offset-y
		tile
		:close-on-content-click="false"
	>
		<template v-slot:activator="{ on, attrs }">
			<v-btn
				outlined
				text
				block
				large
				v-bind="attrs"
				v-on="on"
			>
				Zeit
			</v-btn>
		</template>
		<v-card>
			<v-row class="px-3">
				<v-col>
					<v-text-field
						v-model="time.from"
						prefix="Von"
						outlined
						rounded
						dense
						clearable
						hide-details
						@change="applyYearFilter()"
					/>
				</v-col>
				<v-col>
					<v-text-field
						v-model="time.to"
						prefix="Bis"
						outlined
						rounded
						dense
						clearable
						hide-details
						@change="applyYearFilter()"
					/>
				</v-col>
				<v-col cols="12" class="px-3" v-if="false">
					<v-range-slider
						v-model="rangeSliderValue"
						hide-details
						thumb-label="always"
						:min="this.getStaticXAxisDomain()[0]" step="1"
						:max="this.getStaticXAxisDomain()[1]"
					/>
				</v-col>
			</v-row>
			<v-card-actions>
				<v-spacer />
				<v-btn text @click="menu = false">
					Close
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-menu>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import config from '../../../global.config';

export default {
	name: 'TimeFilter',
	data() {
		return {
			menu: false,
			time: {
				from: config.defaultDates.start,
				to: config.defaultDates.end,
			},
			rangeSliderValue: [
				config.defaultDates.start,
				config.defaultDates.end,
			],
		};
	},
	created() {
		[this.time.from, this.time.to] = this.getStaticXAxisDomain();
		this.rangeSliderValue = [...this.getStaticXAxisDomain()];
	},
	computed: {
		...mapState({
			yearRange: (state) => state.chartYearRange,
		}),
	},
	watch: {
		yearRange: {
			handler(val) {
				this.time = { ...val };
				this.rangeSliderValue = Object.values(val).sort();
			},
		},
	},
	methods: {
		...mapActions([
			'addFilter',
			'removeFilter',
		]),
		...mapGetters([
			'getStaticXAxisDomain',
		]),
		applyYearFilter() {
			const [min, max] = this.getStaticXAxisDomain();
			if (this.time.from < min || this.isInputNumeric(this.time.from)) {
				this.time.from = min;
			}
			if (this.time.to > max || this.isInputNumeric(this.time.to)) {
				this.time.to = max;
			}

			this.addFilter({
				name: 'yearFilter',
				type: 'year',
				params: this.time,
			});
		},
		isInputNumeric(inputValue) {
			return Number.isNaN(parseInt(inputValue, 10));
		},
		resetYearFilter() {
			this.removeFilter('yearFilter');
			[this.time.from, this.time.to] = this.getStaticXAxisDomain();
			this.rangeSliderValue = [...this.getStaticXAxisDomain()];
		},
	},
};
</script>

<style scoped>

</style>
