<template>
    <div>
        <v-card
            :elevation="hover ? 10 : 0"
            class="pa-0"
            :style="'border: 3px solid white'"
            color="white"
            width="300px">
            <v-img
                :src="'https://tr.rbxcdn.com/f95d9891bdebe2d001ac99f1af3cbf05/420/420/Decal/Png'"
                position="center top"
                class="pa-0"
                :style="'background-color: white'"
            />
            <div class="headline">
                Titel
            </div>
            <v-card-text class="pa-0">
                <v-row>
                    <v-col>
                        <v-icon>mdi-flower</v-icon>
                        <div>Blume</div>
                    </v-col>
                    <v-col>
                        <v-icon>mdi-flower</v-icon>
                        <div>Blume</div>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-icon>mdi-flower</v-icon>
                        <div>Blume</div>
                    </v-col>
                    <v-col>
                        <v-icon>mdi-flower</v-icon>
                        <div>Blume</div>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-icon>mdi-flower</v-icon>
                        <div>Blume</div>
                    </v-col>
                    <v-col>
                        <v-icon>mdi-flower</v-icon>
                        <div>Blume</div>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
export default {
	name: 'Exhibit',
};
</script>

<style scoped>

</style>
