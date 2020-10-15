<template>
	<v-card
		outlined
		:height="maxToolTipHeight"
		:max-width="maxToolTipWidth"
		class="d-inline-flex justify-start"
	>
		<img
			class="tooltip-thumbnail"
			:src="imageUrl"
			:height="maxToolTipHeight"
			alt=""
		/>
		<div class="text-left">
			<v-card-title :class="titleCssClasses">
				{{ title }}, {{ dating }}
			</v-card-title>
			<v-card-text class="text-md-body-2 text-xl-body-1 py-0">
				{{ category }}<br/>
				{{ artist }}<br/>
				{{ location }}
			</v-card-text>
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
		titleCssClasses() {
			const defaultClasses = 'text-break pt-2 pb-0';
			const breakpointName = this.$vuetify.breakpoint.name;
			if (breakpointName !== 'xl') {
				return `${defaultClasses} text-subtitle-1 font-weight-bold`;
			}

			return `${defaultClasses} text-h6 `;
		},
	},
};
</script>

<style type="text/css">

.tooltip-thumbnail {
	object-fit: contain;
	height: auto;
	max-height: 100%;
	max-width: 40%;
}
</style>
