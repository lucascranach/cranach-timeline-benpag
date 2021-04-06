<template>
	<v-card
		outlined
		class="event-timeline-tooltip"
		:height="maxHeight"
		:max-width="maxWidth"
		:min-width="maxWidth / 2"
	>
		<div class="d-flex justify-start">
			<div class="thumbnail-container">
				<img
					:src="imageUrl"
					:height="maxHeight"
					alt=""
				/>
			</div>
			<div class="text-left" id="event-timeline-tooltip-text-content">
				<v-card-title v-html="checkHighlight(title)" class="h6 text-break pt-2 pb-0"/>
				<v-card-text v-html="checkHighlight(item.description)" class="py-0"/>
			</div>
		</div>
	</v-card>
</template>

<script>

import { mapGetters } from 'vuex';

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
				return window.innerHeight * 0.4;
			},
		},
		maxHeight: {
			type: Number,
			required: false,
			default() {
				return window.innerHeight * 0.1;
			},
		},
	},
	computed: {
		title() {
			const split = (this.item?.startDate || '').split('-').map((i) => parseInt(i, 10));
			if (split.length === 1) {
				return new Date(split[0], 0, 1).toLocaleDateString(undefined, {
					year: 'numeric',
				});
			}
			if (split.length === 2) {
				return new Date(split[0], split[1], 1).toLocaleDateString(undefined, {
					year: 'numeric',
					month: 'long',
				});
			}
			if (split.length === 3) {
				return new Date(this.item.startDate).toLocaleDateString(undefined, {
					year: 'numeric',
					month: 'long',
					day: 'numeric',
				});
			}

			return this.$t('invalid Date');
		},
		imageUrl() {
			return this.item.imageUrl || '/placeholder.png';
		},
	},
	methods: {
		...mapGetters([
			'getActiveFilters',
		]),
		checkHighlight(text) {
			 if (this.getActiveFilters().some((it) => it.name === 'search') && text) {
				const searchParam = this.getActiveFilters().find((it) => it.name === 'search').params;
				const regExp = new RegExp(searchParam, 'gi');
				const found = text.match(regExp);

				if (found) {
					const result = text.replace(regExp, `<span class="highlightText">${found[0]}</span>`);
					return `<span>${result}</span>`;
				}
			}
			return text;
		},
	},
};
</script>

<style scoped>
.thumbnail-container {
	max-width: 50%;
}
.thumbnail-container img {
	object-fit: contain;
	max-width: min-content;
}
.event-timeline-tooltip {
	width: fit-content;
	position: absolute;
	overflow: hidden;
	pointer-events: none;
	visibility: hidden;
}
</style>
