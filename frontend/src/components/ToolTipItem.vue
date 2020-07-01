<template>
		<v-hover v-slot:default="{ hover }" open-delay="100">
			<v-card
					:elevation="hover ? 10 : 0"
					:id="`production-${item.id}`"
					:style="`border: 2px solid rgba(0,255,0,0.5);`"
					class="pa-0"
				>
				<v-row :style="`background-color: white`">
					<v-col cols="3">
						<v-img
								:src="item.imageUrl && item.imageUrl !== '' ? item.imageUrl : 'https://via.placeholder.com/350'"
								position="left"
							/>
					</v-col>
					<v-col cols="9">
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
									<v-list-item-icon>
										<v-icon v-text="item.icon">brush</v-icon>
									</v-list-item-icon>
									<v-list-item-content>
										<v-list-item-title v-text="item.id"></v-list-item-title>
									</v-list-item-content>
								</v-list-item>
							</v-list>
						</v-card-text>
					</v-col>
				</v-row>
			</v-card>
		</v-hover>
</template>
					<!--
					<v-list>
						<v-list-item two-line >
						<v-list-item-content>
							<v-list-item-title>
								<v-tooltip top>
									<template v-slot:activator="{ on }">
										<v-icon
											color="green darken-2"
											alt="Künstler"
											v-on="on"
										>
											fa-hand-holding-usd
										</v-icon>
									</template>
									<span>Aufbewahrungsort</span>
								</v-tooltip>
							</v-list-item-title>
							<v-list-item-subtitle>
								<v-tooltip top>
									<template v-slot:activator="{ on }">
										<v-list-item-title v-on="on">{{ item.location || 'k.A.' }}</v-list-item-title>
									</template>
									<span>{{ item.location || 'ohne' }}</span>
								</v-tooltip>
							</v-list-item-subtitle>
						</v-list-item-content>
						<v-list-item-content class="pl-1">
							<v-list-item-title>
								<v-tooltip top>
									<template v-slot:activator="{ on }">
										<v-icon
											:color="item.color"
											alt="Künstler"
											v-on="on"
										>
											fa-hand-holding-usd
										</v-icon>
									</template>
									<span>Auftraggeber</span>
								</v-tooltip>
							</v-list-item-title>
							<v-list-item-subtitle>
								<v-tooltip top>
									<template v-slot:activator="{ on }">
										<v-list-item-title v-on="on">{{ item.customer || 'k.A.' }}</v-list-item-title>
									</template>
									<span>{{ item.customer || 'k.A.' }}</span>
								</v-tooltip>
							</v-list-item-subtitle>
						</v-list-item-content>
					</v-list-item>
					<v-list-item three-line >
						<v-list-item-content>
							<v-list-item-title>
								<v-tooltip top>
									<template v-slot:activator="{ on }">
										<v-icon
											:color="item.color"
											alt="Künstler"
											v-on="on"
										>
											fa-mortar-pestle
										</v-icon>
									</template>
								<span>Medium</span>
								</v-tooltip>
							</v-list-item-title>
							<v-list-item-subtitle>
								<v-tooltip top>
									<template v-slot:activator="{ on }">
										<v-list-item-title v-on="on">{{ item.medium || 'k.A.' }}</v-list-item-title>
									</template>
									<span>{{ item.medium || 'k.A.' }}</span>
								</v-tooltip>
							</v-list-item-subtitle>
						</v-list-item-content>
						<v-list-item-content class="pl-1">
							<v-list-item-title>
								<v-tooltip top>
									<template v-slot:activator="{ on }">
										<v-icon
											:color="item.color"
											alt="Künstler"
											v-on="on"
										>
											fa-ruler-combined
										</v-icon>
									</template>
									<span>Größe</span>
								</v-tooltip>
							</v-list-item-title>
							<v-list-item-subtitle>
								<v-tooltip top>
									<template v-slot:activator="{ on }">
										<v-list-item-title v-on="on">{{ item.dimensions }}</v-list-item-title>
									</template>
									<span>{{ item.dimensions }}</span>
								</v-tooltip>
							</v-list-item-subtitle>
						</v-list-item-content>
					</v-list-item>
					<v-list-item two-line >
						<v-list-item-content>
							<v-list-item-title>
								<v-tooltip top>
									<template v-slot:activator="{ on }">
										<v-icon
											:color="item.color"
											alt="Künstler"
											v-on="on"
										>
											fa-calendar-alt
										</v-icon>
									</template>
									<span>Entstehungszeit</span>
								</v-tooltip>
							</v-list-item-title>
							<v-list-item-subtitle>
								<v-tooltip top>
									<template v-slot:activator="{ on }">
										<v-list-item-title v-on="on">
											{{ item.date || 'k.A.' }}
										</v-list-item-title>
									</template>
									<span>{{ item.date || 'k.A.' }}</span>
								</v-tooltip>
							</v-list-item-subtitle>
						</v-list-item-content>
						<v-list-item-content class="pl-1">
							<v-list-item-title>
								<v-tooltip top>
									<template v-slot:activator="{ on }">
										<v-icon
											:color="item.color"
											alt="Künstler"
											v-on="on"
										>
											fa-fingerprint
										</v-icon>
									</template>
									<span>Künstler</span>
								</v-tooltip>
							</v-list-item-title>
							<v-list-item-subtitle>
								<v-tooltip top>
									<template v-slot:activator="{ on }">
										<v-list-item-title v-on="on">{{ item.artists || 'k.A' }}</v-list-item-title>
									</template>
									<span>{{ item.artists || 'k.A'}}</span>
								</v-tooltip>
							</v-list-item-subtitle>
						</v-list-item-content>
					</v-list-item>
				</v-list>-->

<script>
export default {
	name: 'ToolTipItem',
	props: {
		item: {
			type: Object,
			required: true,
			default: () => ({
				imageUrl: 'URL',
				id: 'UNIQUE',
				title: ['TITLE'],
				location: 'LOCATION',
				customer: 'CUSTOMER',
				medium: 'MEDIUM',
				dimensions: 'DIMENSIONS',
				color: 'rgba(0,255,0,0.5)',
				startDate: 'DATE',
				artists: 'ARTIST',
			}),
		},
	},
};
</script>
