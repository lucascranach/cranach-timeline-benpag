<template>
		<v-hover v-slot:default="{ hover }" open-delay="100">
			<v-card
					:elevation="hover ? 10 : 0"
					:id="`production-${item.id}`"
					:class="`pa-0 ma-0 toolTipCard`"
					max-width="450px"
					max-height="300px"
				>
				<v-row class="ma-0">
					<h3>{{item.type === 'painting' ? 'Gemälde' : (item.type === 'archival' ? 'Archivalie' : 'Zeichnung')}}
						({{item.startDate && item.startDate > 0 ?
						(item.startDate === item.endDate ? item.startDate : item.startDate + ' bis ' + item.endDate) :
						'Datierung unbekannt' }})
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
                                    <span>{{item.title && item.title.length > 0 ? item.title[0] : 'k.A.' }}</span>
                                    <hr>
                                </v-col>
                            </v-row>
                            <v-row dense>
                                <v-col cols="12">
                                    <v-icon class="toolTipIcon">brush</v-icon>
                                    <span class="ml-2">{{ item.artists && item.artists[0] ? item.artists[0].name : 'k.A.' }}</span>
                                </v-col>
                            </v-row>
                            <v-row dense>
                                <v-col cols="12">
                                    <v-icon class="toolTipIcon">public</v-icon>
                                    <span class="ml-2">{{ item.location && item.location[0] ? item.location[0] : 'k.A.' }}</span>
                                </v-col>
                            </v-row>
                            <v-row dense>
                                <v-col cols="12">
                                    <v-icon class="toolTipIcon">shopping_basket</v-icon>
                                    <span class="ml-2">{{ item.customer && item.customer[0] ? item.customer[0] : 'k.A.' }}</span>
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
	watch: {
		item: (newOne) => {
			switch (newOne.type) {
			case 'painting':
				// eslint-disable-next-line no-param-reassign
				document.querySelectorAll('.toolTipIcon').forEach((el) => { el.style.color = 'rgb(66,116,173)'; });
				// eslint-disable-next-line no-param-reassign
				document.querySelectorAll('.toolTipCard').forEach((el) => { el.style.border = '2px solid rgb(66,116,173)'; });
				break;
			case 'graphic':
				// eslint-disable-next-line no-param-reassign
				document.querySelectorAll('.toolTipIcon').forEach((el) => { el.style.color = 'rgb(72, 138, 63)'; });
				// eslint-disable-next-line no-param-reassign
				document.querySelectorAll('.toolTipCard').forEach((el) => { el.style.border = '2px solid rgb(72, 138, 63)'; });
				break;
			case 'archival':
				// eslint-disable-next-line no-param-reassign
				document.querySelectorAll('.toolTipIcon').forEach((el) => { el.style.color = 'rgb(226,161,74)'; });
				// eslint-disable-next-line no-param-reassign
				document.querySelectorAll('.toolTipCard').forEach((el) => { el.style.border = '2px solid rgb(226,161,74)'; });
				break;
			default:
				break;
			}
		},
	},
};
</script>
