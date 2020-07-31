<template>
    <v-row>
        <v-col>
            <v-btn @click="hideSearch = !hideSearch">Suche</v-btn>
            <div v-if="!hideSearch">
                <v-subheader>Volltext:</v-subheader>
                <v-text-field></v-text-field>
            </div>
        </v-col>
        <v-col>
            <v-btn @click="hideCategory = !hideCategory">Kategorie</v-btn>
            <v-list v-if="!hideCategory">
                <v-list-item>
                    <v-list-item-action>
                        <v-switch></v-switch>
                    </v-list-item-action>
                    <v-list-item-title>Gemälde</v-list-item-title>
                </v-list-item>
                <v-list-item>
                    <v-list-item-action>
                        <v-switch></v-switch>
                    </v-list-item-action>
                    <v-list-item-title>Drucke</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-col>
        <v-col>
            <v-btn @click="hideTime = !hideTime">Zeit</v-btn>
            <v-list v-if="!hideTime">
                <v-list-item>
                    <v-subheader>Von:</v-subheader>
                    <v-text-field></v-text-field>
                </v-list-item>
                <v-list-item>
                    <v-subheader>Bis:</v-subheader>
                    <v-text-field></v-text-field>
                </v-list-item>
            </v-list>
        </v-col>
        <v-col>
            <v-btn>Weitere</v-btn>
        </v-col>
        <v-col>
            <v-btn>Reset</v-btn>
        </v-col>
    </v-row>
</template>

<script>

export default {
	name: 'Filters',
	data() {
		return {
			hideSearch: true,
			hideCategory: true,
			hideTime: true,
		};
	},
};
</script>

<style scoped>

</style>
