<template>
	<v-hover v-slot:default="{ hover }" open-delay="100">
		<v-card
			:elevation="hover ? 10 : 0"
			:id="`production-${item.id}`"
			:class="[item.type, 'pa-0 ma-0 toolTipCard']"
			max-width="450px"
			max-height="300px"
		>
			<v-row class="ma-0">
				<h3>{{ item.type === 'painting' ? $t('painting') : (item.type === 'archival' ? $t('archival') : $t('graphic')) }}
					({{
						item.startDate && item.startDate > 0 ?
							(item.startDate === item.endDate ? item.startDate : item.startDate + ' '+$t('to_')+' ' + item.endDate) :
							$t('dating_unknown')
					}})
				</h3>
			</v-row>
			<v-row :style="`background-color: white`">
				<v-col cols="4">
					<v-img
						:src="item.imageUrl && item.imageUrl !== '' ? item.imageUrl : 'https://via.placeholder.com/350'"
						position="center"
					/>
				</v-col>
				<v-col cols="8" class="pa-0">
					<v-card-text class="pa-0 text-left">
						<v-row dense>
							<v-col cols="12">
								<span>{{
										Array.isArray(item.title) ? item.title[0] : (item.title ? item.title : $t('na'))
									}}</span>
								<hr>
							</v-col>
						</v-row>
						<v-row dense>
							<v-col cols="12">
								<v-icon class="toolTipIcon">brush</v-icon>
								<span class="ml-2">{{
										Array.isArray(item.artists) ? (item.artists[0].name ? item.artists[0].name : $t('na')) : (item.artists ? item.artists : $t('na'))
									}}</span>
							</v-col>
						</v-row>
						<v-row dense>
							<v-col cols="12">
								<v-icon class="toolTipIcon">public</v-icon>
								<span class="ml-2">{{
										Array.isArray(item.location) ? (item.location[0] ? item.location[0] : $t('na')) : (item.location ? item.location : $t('na'))
									}}</span>
							</v-col>
						</v-row>
						<v-row dense>
							<v-col cols="12">
								<v-icon class="toolTipIcon">shopping_basket</v-icon>
								<span class="ml-2">{{
										Array.isArray(item.artists) ? (item.artists[0].remarks ? item.artists[0].remarks : $t('na')) : (item.repository ? item.repository : $t('na'))
									}}</span>
							</v-col>
						</v-row>
					</v-card-text>
				</v-col>
			</v-row>
		</v-card>
	</v-hover>
</template>

<script>
export default {
	name: 'ToolTipItem',
	props: {
		item: {
			type: Object,
			required: true,
		},
		color: {
			type: String,
			default: 'rgba(0, 0, 0, 1)',
		},
	},
};
</script>

<style>
.graphic {
	border: 2px solid rgb(72, 138, 63) !important;
}

.graphic .toolTipIcon {
	color: rgb(72, 138, 63) !important;
}

.archival {
	border: 2px solid rgb(226, 161, 74) !important;
}

.archival .toolTipIcon {
	color: rgb(226, 161, 74) !important;
}

.painting {
	border: 2px solid rgb(66, 116, 173) !important;
}

.painting .toolTipIcon {
	color: rgb(66, 116, 173) !important;
}
</style>
