<template>
        <v-card
            class="pa-0"
            style="border: 3px solid white"
            color="white"
            width="300px">
            <v-img
                :src="'https://tr.rbxcdn.com/f95d9891bdebe2d001ac99f1af3cbf05/420/420/Decal/Png'"
                position="center top"
                class="pa-0"
                :style="'background-color: white'"
            />
            <div class="headline" style="margin: 5px">
                {{ item.title[0] && item.title[0] !== '' ? item.title[0] : 'Titel unbekannt'}}
            </div>
            <v-card-text class="pa-0" style="margin: 5px">
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
        </v-card>
</template>

<script>
export default {
	name: 'Exhibit',
	props: {
		item: {
			type: Object,
			required: true,
		},
	},
};
</script>

<style scoped>

</style>
