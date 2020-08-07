<template>
	<v-row>
		<v-col>
			<v-btn @click="toggleSearch()">Suche</v-btn>
			<div v-if="search !== null">
				<v-subheader>Volltext:</v-subheader>
				<v-text-field v-bind:model="search.text"></v-text-field>
			</div>
		</v-col>
		<v-col>
			<v-btn @click="toggleCategory()">Kategorie</v-btn>
			<v-list v-if="category !== null">
				<v-list-item>
					<v-list-item-action>
						<v-switch v-model="category.paintings"></v-switch>
					</v-list-item-action>
					<v-list-item-title>Gemälde</v-list-item-title>
				</v-list-item>
				<v-list-item>
					<v-list-item-action>
						<v-switch v-model="category.graphics"></v-switch>
					</v-list-item-action>
					<v-list-item-title>Drucke</v-list-item-title>
				</v-list-item>
			</v-list>
		</v-col>
		<v-col>
			<v-btn @click="toggleTime()">Zeit</v-btn>
			<v-list v-if="time !== null">
				<v-list-item>
					<v-subheader>Von:</v-subheader>
					<v-text-field v-model="time.from"></v-text-field>
				</v-list-item>
				<v-list-item>
					<v-subheader>Bis:</v-subheader>
					<v-text-field v-model="time.to"></v-text-field>
				</v-list-item>
			</v-list>
		</v-col>
		<v-col>
			<v-btn @click="resetFilters()">Reset</v-btn>
		</v-col>
	</v-row>
</template>

<script>
export default {
	name: 'Filters',
	props: ['value'],
	event: ['click'],
	data() {
		return {
			search: null,
			category: null,
			time: null,
		};
	},
	methods: {
		toggleSearch() {
			if (this.search === null) {
				this.search = { text: '' };
			} else {
				this.search = null;
			}
		},
		toggleCategory() {
			if (this.category === null) {
				this.category = {
					paintings: true,
					graphics: true,
				};
			} else {
				this.category = null;
			}
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
			this.category = null;
			this.time = null;
		},
	},
};
</script>

<style scoped>

</style>
