<template>
        <v-card
            style="border: 3px solid white; overflow: hidden"
            color="white"
            :elevation="cardElevation"
            @mouseover="setHighlighting(true)"
            @mouseout="setHighlighting(false)"
        >
            <div class="imageContainer">
                <v-img
                    :src="item.imageUrl && item.imageUrl !== '' ? item.imageUrl : config.placeholderImageUrl"
                    :class="{'imageAnimation' : runAnimation }"
                    position="center top"
                    style="background-color: white"
                />
            </div>
            <div class="headline">
                {{ item.title[0] && item.title[0] !== '' ? item.title[0] : $t('title_unknown')}}
            </div>
            <v-card-text>
                <v-row>
                    <v-col>
                        <v-icon>mdi-map-marker</v-icon>
                        <div>{{ item.location[0] && item.location[0] !== '' ? item.location[0] : $t('place_unknown')}}</div>
                    </v-col>
                    <v-col>
                        <v-icon>mdi-cash</v-icon>
                        <div>{{$t('client_unknown')}}</div>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-icon>mdi-flower</v-icon>
                        <div>{{$t('medium_unknown')}}</div>
                    </v-col>
                    <v-col>
                        <v-icon>mdi-flower</v-icon>
                        <div>{{$t('size_unknown')}}</div>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-icon>mdi-calendar</v-icon>
                        <div>{{item.startDate && item.startDate !== '' ? item.startDate : $t('unknown') +
                            ' - '
                            + item.endDate && item.endDate !== '' ? item.endDate : $t('unknown')}}</div>
                    </v-col>
                    <v-col>
                        <v-icon>mdi-account</v-icon>
                        <div>{{ item.artists[0] && item.artists[0].name !== '' ? item.artists[0].name : $t('artist_unknown')}}</div>
                    </v-col>
                </v-row>
            </v-card-text>
            <!-- imageUrl is taken as a placeholder and needs to be replaced with CDA Url-->
            <v-btn v-if="item.imageUrl" :href="item.imageUrl" class="button">{{$t('continue_reading')}}</v-btn>
        </v-card>
</template>

<script>
import config from '../../../global.config';

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
		setHighlighting(isSelected) {
			if (isSelected) {
				this.runAnimation = true;
				this.cardElevation = 5;
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
    margin-bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
}
.imageContainer {
    width: 400px;
    height: 350px;
    overflow: hidden;
}
.imageAnimation {
    animation: kenburnsEffect 20s infinite;
}
@keyframes kenburnsEffect {
    0% {
        opacity: 0.8;
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
