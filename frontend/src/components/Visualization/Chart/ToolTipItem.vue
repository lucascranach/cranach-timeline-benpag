<template>
	<v-card
		outlined
		:height="maxToolTipHeight"
		:max-width="maxToolTipWidth"
	>
		<div class="d-flex justify-space-between">
			<div class="thumbnail-container">
				<img
					:src="imageUrl"
					:height="maxToolTipHeight"
					alt=""
				/>
			</div>
			<div class="text-left">
				<v-card-title class="h6 text-break pt-2 pb-0">
					{{ title }}, {{ dating }}
				</v-card-title>
				<v-card-text class="py-0">
					{{ category }}<br />
					{{ artist }}<br />
					{{ location }}
				</v-card-text>
			</div>
		</div>
	</v-card>
</template>

<script>
import config from '../../../../global.config';

export default {
	name: 'ToolTipItem',
	props: {
		item: {
			type: Object,
			required: true,
		},
	},
	computed: {
		maxToolTipHeight() {
			return window.innerHeight * 0.2;
		},
		maxToolTipWidth() {
			return window.innerWidth * 0.4;
		},
		imageUrl() {
			return this.item.imageUrl || config.placeholderImageUrl;
		},
		title() {
			let title;

			if (Array.isArray(this.item.title)) {
				title = this.item.title[0] || this.$t('na');
			} else {
				title = this.item.title || this.$t('na');
			}

			if (title.length <= 60) {
				return title;
			}

			const cuttetTitle = title.split(' ').reduce((result, chunk) => {
				if ((result + chunk).length <= 60) {
					// eslint-disable-next-line no-param-reassign
					result += `${chunk} `;
				}
				return result;
			}, '');

			return `${cuttetTitle}[...]`;
		},
		dating() {
			if (!(Number(this.item.startDate) > 0)) {
				return this.$t('dating_unknown');
			}
			if (this.item.startDate === this.item.endDate) {
				return this.item.startDate;
			}
			return `${this.item.startDate} ${this.$t('to_')} ${this.item.endDate}`;
		},
		category() {
			return this.$t(this.item.type);
		},
		artist() {
			if (Array.isArray(this.item.artists)) {
				return this.item.artists[0].name || this.$t('na');
			}
			return this.item.artists || this.$t('na');
		},
		location() {
			if (Array.isArray(this.item.location)) {
				return this.item.location[0] || this.$t('na');
			}
			return this.item.location || this.$t('na');
		},
		owner() {
			if (Array.isArray(this.item.artists)) {
				return this.item.artists[0].name || this.$t('na');
			}
			return this.item.artists || this.$t('na');
		},
	},
};
</script>

<style type="text/css">
.thumbnail-container {
	max-width: 50%;
}
.thumbnail-container img {
	object-fit: contain;
	max-width: min-content;
}
</style>
