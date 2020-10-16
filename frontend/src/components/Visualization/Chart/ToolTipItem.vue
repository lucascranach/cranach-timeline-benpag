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
			<v-card-title class="text-lg-subtitle-2 text-xl-h6 text-break pt-2 pb-0">
				{{ title }}, {{ dating }}
			</v-card-title>
			<v-card-text class="text-lg-caption text-xl-body-1 py-0 test">
				{{ category }}<br/>
				{{ artist }}<br/>
				{{ owner }}{{ locationComma }}
			</v-card-text>
		</div>
	</v-card>
</template>

<script>

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
			return this.item.imageUrl || '/placeholder.png';
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
		locationComma() {
			if (this.item.type === 'archival') {
				return this.item.repository || this.$t('na');
			}
			if (Array.isArray(this.item.location)) {
				const locationIsInOwner = this.item.location.some((location) => this.item.owner && this.item.owner.includes(location));
				if (locationIsInOwner) {
					return '';
				}
				return `, ${this.location}`;
			}
			if (this.item.owner && this.item.owner.includes(this.item.location)) {
				return '';
			}
			return `, ${this.location}`;
		},
		owner() {
			if (this.item.type === 'archival') {
				return '';
			}
			return this.item.owner || this.$t('na');
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
