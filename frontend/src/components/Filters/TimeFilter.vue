<template>
	<v-menu
		id="time-filter"
		offset-y
		tile
		:close-on-content-click="false"
	>
		<template v-slot:activator="{ on, attrs }">
			<v-btn
				id="time-filter-button"
				outlined
				block
				v-bind="attrs"
				v-on="on"
				class="text-none"
			>
				{{ $t('time_filter') }}
			</v-btn>
		</template>
		<v-card flat class="px-3 py-6" id="time-filter-dropdown">
			<v-row dense>
				<v-col>
					<v-text-field
						v-model="time.from"
						:prefix="$t('from')"
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
						:prefix="$t('to')"
						outlined
						rounded
						dense
						clearable
						hide-details
						@change="applyYearFilter()"
					/>
				</v-col>
				<v-col cols="12" class="px-3 mt-10" v-if="true">
					<v-range-slider
						v-model="rangeSliderValue"
						hide-details
						thumb-label="always"
						:min="this.getStaticXAxisDomain()[0]" step="1"
						:max="this.getStaticXAxisDomain()[1]"
						@change="changeRangeSlider()"
					/>
				</v-col>
			</v-row>
		</v-card>
	</v-menu>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import config from '@/../global.config';

export default {
	name: 'TimeFilter',
	filterName: 'yearFilter',
	data() {
		return {
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
		this.resetYearFilter();
	},
	computed: {
		...mapState({
			timeFilter: (state) => state.activeFilters.find((f) => f.name === 'yearFilter'),
		}),
	},
	watch: {
		yearRange: {
			handler(val) {
				this.time = { ...val };
				this.rangeSliderValue = Object.values(val).sort();
			},
		},
		timeFilter() {
			if (!this.timeFilter) {
				this.resetYearFilter();
			}
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
		changeRangeSlider() {
			[this.time.from, this.time.to] = this.rangeSliderValue;
			this.applyYearFilter();
		},
		applyYearFilter() {
			const [min, max] = this.getStaticXAxisDomain();
			if (this.time.from < min || this.isInputNumeric(this.time.from)) {
				this.time.from = min;
			}
			if (this.time.to > max || this.isInputNumeric(this.time.to)) {
				this.time.to = max;
			}

			this.rangeSliderValue = [this.time.from, this.time.to];

			if (this.time.from === min && this.time.to === max) {
				this.removeFilter(this.$options.filterName);
				return;
			}

			this.addFilter({
				name: this.$options.filterName,
				type: 'year',
				params: this.time,
			});
		},
		isInputNumeric(inputValue) {
			return Number.isNaN(parseInt(inputValue, 10));
		},
		resetYearFilter() {
			[this.time.from, this.time.to] = this.getStaticXAxisDomain();
			this.rangeSliderValue = [...this.getStaticXAxisDomain()];
		},
		removeFilterValue({ params, value }) {
			const [key] = Object.entries(params).find(([, val]) => val === value);
			this.time[key] = undefined;
			this.applyYearFilter();
		},
		getFilterParameterDescriptions(filterValue) {
			return Object.entries(filterValue.params).map(([key, value]) => ({
				description: `${this.$t(key)}: ${value}`,
				value,
			}));
		},
	},
};
</script>
<style>
.v-slider span {
	color: var(--v-lighten-base);
}
</style>
