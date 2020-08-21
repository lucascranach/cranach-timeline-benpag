<template>
        <v-card
            style="border: 3px solid white"
            color="white"
            width="300px"
        :elevation="cardElevation"
            @mouseover="changeElevation(24)"
            @mouseout="changeElevation(1)"
        >
            <v-img
                :src="item.imageUrl && item.imageUrl !== '' ? item.imageUrl : config.placeholderImageUrl"
                position="center top"
                style="background-color: white"
                width="350"
                height="350"
            />
            <div class="headline" style="margin: 5px">
                {{ item.title[0] && item.title[0] !== '' ? item.title[0] : 'Titel unbekannt'}}
            </div>
            <v-card-text style="margin: 5px">
                <v-row>
                    <v-col>
                        <v-icon>mdi-map-marker</v-icon>
                        <div>{{ item.location[0] && item.location[0] !== '' ? item.location[0] : 'Ort unbekannt'}}</div>
                    </v-col>
                    <v-col>
                        <v-icon>mdi-cash</v-icon>
                        <div>Auftraggeber unbekannt</div>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-icon>mdi-flower</v-icon>
                        <div>Medium unbekannt</div>
                    </v-col>
                    <v-col>
                        <v-icon>mdi-flower</v-icon>
                        <div>Größe unbekannt</div>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-icon>mdi-calendar</v-icon>
                        <div>{{item.startDate && item.startDate !== '' ? item.startDate : 'Unbekannt' +
                            ' - '
                            + item.endDate && item.endDate !== '' ? item.endDate : 'Unbekannt'}}</div>
                    </v-col>
                    <v-col>
                        <v-icon>mdi-account</v-icon>
                        <div>{{ item.artists[0] && item.artists[0].name !== '' ? item.artists[0].name : 'Künstler unbekannt'}}</div>
                    </v-col>
                </v-row>
            </v-card-text>
            <!-- imageUrl is taken as a placeholder and needs to be replaced with CDA Url-->
            <v-btn v-if="item.imageUrl" :href="item.imageUrl" class="button">Weiterlesen</v-btn>
        </v-card>
</template>

<script>
import config from '../../global.config';

export default {
	name: 'Exhibit',
	data() {
		return {
			config,
			cardElevation: 1,
		};
	},
	props: {
		item: {
			type: Object,
			required: true,
		},
	},
	methods: {
		changeElevation(newElevation) {
			this.cardElevation = newElevation;
		},
	},
};
</script>

<style scoped>
.button {
    margin-top: 10px;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
}
</style>
