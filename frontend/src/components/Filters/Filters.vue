<template>
	<v-row>
		<v-col>
			<v-btn @click="toggleSearch()">Suche</v-btn>
			<div v-if="search !== null">
				<v-subheader>Volltext:</v-subheader>
				<v-text-field v-model="search.text"></v-text-field>
			</div>
		</v-col>
		<v-col>
			<v-btn @click="toggleCategory()">Kategorie</v-btn>
			<v-list>
				<v-list-item>
					<v-list-item-action>
						<v-switch @change="applyCategoryFilter()"
                                  v-model="category.paintings"
                                  true-value="painting" false-value=""
                                  value="painting"
                        />
					</v-list-item-action>
					<v-list-item-title>Gemälde</v-list-item-title>
				</v-list-item>
				<v-list-item>
					<v-list-item-action>
						<v-switch  @change="applyCategoryFilter()"
                                   v-model="category.graphics"
                                   true-value="graphic" false-value=""
                                   value="painting" />
					</v-list-item-action>
					<v-list-item-title>Drucke</v-list-item-title>
				</v-list-item>
                <v-list-item>
                    <v-list-item-action>
                        <v-switch  @change="applyCategoryFilter()"
                                   v-model="category.archivals"
                                   true-value="archival" false-value=""
                                   value="archival" />
                    </v-list-item-action>
                    <v-list-item-title>Archivalien</v-list-item-title>
                </v-list-item>
			</v-list>
		</v-col>
		<v-col>
			<v-btn @click="toggleTime()">Zeit</v-btn>
			<v-list v-if="time !== null">
				<v-list-item>
					<v-subheader>Von:</v-subheader>
					<v-text-field @change="applyYearFilter()"
                                  v-model="time.from" />
				</v-list-item>
				<v-list-item>
					<v-subheader>Bis:</v-subheader>
					<v-text-field @change="applyYearFilter()"
                                  v-model="time.to" />
				</v-list-item>
			</v-list>
		</v-col>
		<v-col>
			<v-btn @click="resetFilters()">Reset</v-btn>
		</v-col>
        <v-col>
            <v-checkbox label="Best Of"/>
        </v-col>
	</v-row>
</template>

<script>
import { mapActions } from 'vuex';

export default {
	name: 'Filters',
	props: ['value'],
	event: ['click'],
	data() {
		return {
			search: null,
			category: {
				active: false,
				paintings: 'painting',
				graphics: 'graphic',
				archivals: 'archival',
			},
			time: null,
			bestof: false,
		};
	},
	methods: {
		...mapActions([
			'addFilter',
		]),
		toggleSearch() {
			if (this.search === null) {
				this.search = { text: '' };
			} else {
				this.search = null;
			}
		},
		toggleCategory() {
			if (this.category.active) {
				this.category = {
					active: false,
					paintings: 'painting',
					graphics: 'graphic',
					archivals: 'archival',
				};
			} else {
				this.category = {
					active: true,
					paintings: '',
					graphics: '',
					archivals: '',
				};
			}
			this.applyCategoryFilter();
		},
		toggleTime() {
			if (this.time === null) {
				this.time = {
					from: '',
					to: '',
				};
			} else {
				this.time = null;
			}
		},
		resetFilters() {
			this.search = null;
			this.category = {
				paintings: 'painting',
				graphics: 'graphic',
				archivals: 'archival',
			};
			this.time = null;
		},
		applyCategoryFilter() {
			this.addFilter({
				name: 'categoryFilter',
				type: 'category',
				params: { validCategories: Object.values(this.category) },
			});
		},
		applyYearFilter() {
			this.addFilter({
				name: 'yearFilter',
				type: 'year',
				params: this.time,
			});
		},
	},
};
</script>

<style scoped>

</style>
