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
				<h3>{{ item.type === 'painting' ? 'Gemälde' : (item.type === 'archival' ? 'Archivalie' : 'Zeichnung') }}
					({{
						item.startDate && item.startDate > 0 ?
							(item.startDate === item.endDate ? item.startDate : item.startDate + ' bis ' + item.endDate) :
							'Datierung unbekannt'
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
										Array.isArray(item.title) ? item.title[0] : (item.title ? item.title : 'k.A.')
									}}</span>
								<hr>
							</v-col>
						</v-row>
						<v-row dense>
							<v-col cols="12">
								<v-icon class="toolTipIcon">brush</v-icon>
								<span class="ml-2">{{
										Array.isArray(item.artists) ? (item.artists[0].name ? item.artists[0].name : 'k.A.') : (item.artists ? item.artists : 'k.A.')
									}}</span>
							</v-col>
						</v-row>
						<v-row dense>
							<v-col cols="12">
								<v-icon class="toolTipIcon">public</v-icon>
								<span class="ml-2">{{
										Array.isArray(item.location) ? (item.location[0] ? item.location[0] : 'k.A.') : (item.location ? item.location : 'k.A.')
									}}</span>
							</v-col>
						</v-row>
						<v-row dense>
							<v-col cols="12">
								<v-icon class="toolTipIcon">shopping_basket</v-icon>
								<span class="ml-2">{{
										Array.isArray(item.artists) ? (item.artists[0].remarks ? item.artists[0].remarks : 'k.A.') : (item.repository ? item.repository : 'k.A.')
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
