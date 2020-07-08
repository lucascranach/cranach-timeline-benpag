<template>
		<v-hover v-slot:default="{ hover }" open-delay="100">
			<v-card
					:elevation="hover ? 10 : 0"
					:id="`production-${item.id}`"
					:style="`border: 2px solid ${color}`"
					class="pa-0 ma-0"
					max-width="450px"
					max-height="300px"
				>
				<v-row class="ma-0">
					<h3>Gemälde ({{item.startDate && item.startDate > 0 ? (item.startDate === item.endDate ? item.startDate : item.startDate + ' bis ' + item.endDate) : 'Datierung unbekannt' }})</h3>
				</v-row>
				<v-row :style="`background-color: white`">
					<v-col cols="4">
							<v-img
									:src="item.imageUrl && item.imageUrl !== '' ? item.imageUrl : 'https://via.placeholder.com/350'"
									position="center"
								/>
					</v-col>
					<v-col cols="8" class="pa-0">
						<v-card-text class="pa-0">
							<v-list>
								<v-list-item two-line>
									<v-list-item-content>
										<v-tooltip top>
											<template v-slot:activator="{ on }">
												<v-list-item-title v-on="on">{{item.title && item.title.length > 0 ? item.title[0] : 'k.A.' }}</v-list-item-title>
											</template>
											<span>{{item.title && item.title.length > 0 ? item.title[0] : 'k.A.' }}</span>
										</v-tooltip>
										<v-list-item-subtitle>
											<v-divider></v-divider>
										</v-list-item-subtitle>
									</v-list-item-content>
								</v-list-item>
								<v-list-item>
									<v-list-item-icon class="ma-0" >
										<v-icon :color="`${color}`">brush</v-icon>
									</v-list-item-icon>
									<v-list-item-content class="pa-0" style="position: absolute; top: 0; left:50%">
										<v-list-item-title v-text="item.artists && item.artists[0] ? item.artists[0] : 'k.A.'"></v-list-item-title>
									</v-list-item-content>
								</v-list-item>
								<v-list-item>
									<v-list-item-icon class="ma-0" >
										<v-icon :color="`${color}`">public</v-icon>
									</v-list-item-icon>
									<v-list-item-content class="pa-0" style="position: absolute; top: 0; left:50%">
										<v-list-item-title v-text="item.location && item.location[0] ? item.location[0] : 'k.A.'"></v-list-item-title>
									</v-list-item-content>
								</v-list-item>
								<v-list-item>
									<v-list-item-icon class="ma-0" >
										<v-icon :color="`${color}`">shopping_basket</v-icon>
									</v-list-item-icon>
									<v-list-item-content class="pa-0" style="position: absolute; top: 0; left:50%">
										<v-list-item-title v-text="item.customer && item.customer[0] ? item.customer[0] : 'k.A.'"></v-list-item-title>
									</v-list-item-content>
								</v-list-item>
							</v-list>
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
			default: 'rgba(66, 125, 173, 1)',
		},
	},
};
</script>
