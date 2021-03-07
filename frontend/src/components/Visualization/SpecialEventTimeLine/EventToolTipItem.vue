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
				<v-card-title class="h6 text-break pt-2 pb-0">
					{{ title }}
				</v-card-title>
				<v-card-text class="text-lg-caption text-xl-body-1 py-0 test">
					{{ $t(item.eventCategory) }}<br/>
				</v-card-text>
				<v-card-text class="py-0">
					{{ item.description }}
				</v-card-text>
			</div>
		</div>
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
