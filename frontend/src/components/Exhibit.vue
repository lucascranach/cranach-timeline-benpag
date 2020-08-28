<template>
        <v-card
            style="border: 3px solid white; overflow: hidden"
            color="white"
        :elevation="cardElevation"
            @mouseover="letsDance(true)"
            @mouseout="letsDance(false)"
        >
            <div class="imageContainer">
                <v-img
                    :src="item.imageUrl && item.imageUrl !== '' ? item.imageUrl : config.placeholderImageUrl"
                    :class="{'imageAnimation' : runAnimation }"
                    position="center top"
                    style="background-color: white"
                />
            </div>
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
			runAnimation: false,
		};
	},
	props: {
		item: {
			type: Object,
			required: true,
		},
	},
	methods: {
		letsDance(isDancing) {
			if (isDancing) {
				this.runAnimation = true;
				this.cardElevation = 24;
			} else {
				this.runAnimation = false;
				this.cardElevation = 1;
			}
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
.imageContainer {
    width: 400px;
    height: 350px;
    overflow: hidden;
}
.imageAnimation {
    animation: kenburns 20s infinite;
}
@keyframes kenburns {
0% {
    opacity: 0;
}
5% {
    opacity: 1;
}
95% {
    transform: scale3d(1.5, 1.5, 1.5) translate3d(-50px, -120px, 0px);
    animation-timing-function: ease-in;
    opacity: 1;
}
100% {
    transform: scale3d(2, 2, 2) translate3d(-170px, -100px, 0px);
    opacity: 0;
}
}
</style>
