<template>
	<div>
		<v-layout justify-center>
			<v-card width="500" height="70">
				<v-row>
					<v-col>
						<v-btn @click="applyCategoryButton('painting')" v-bind:style="stylePainting">Gemälde</v-btn>
					</v-col>
					<v-col>
						<v-btn @click="applyCategoryButton('graphic')" v-bind:style="styleGraphic">Drucke</v-btn>
					</v-col>
					<v-col>
						<v-btn @click="applyCategoryButton('archival')" v-bind:style="styleArchivals">Archivalien</v-btn>
					</v-col>
				</v-row>
			</v-card>
		</v-layout>
		<v-row>
			<v-col>
				<v-btn @click="toggleSearch()">Suche</v-btn>
				<v-btn class="filterIcon" @click="resetSearch()">
					<v-icon>settings_backup_restore</v-icon>
				</v-btn>
				<div v-if="search !== null">
					<v-subheader>Volltext:</v-subheader>
					<v-text-field v-model="search"
								  @input="asyncSearch()"
					/>
				</div>
			</v-col>
			<v-col>
				<v-btn @click="toggleCategory()">Kategorie</v-btn>
				<v-btn class="filterIcon" @click="resetCategoryFilter()">
					<v-icon>settings_backup_restore</v-icon>
				</v-btn>
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
							<v-switch @change="applyCategoryFilter()"
									  v-model="category.graphics"
									  true-value="graphic" false-value=""
									  value="painting"/>
						</v-list-item-action>
						<v-list-item-title>Drucke</v-list-item-title>
					</v-list-item>
					<v-list-item>
						<v-list-item-action>
							<v-switch @change="applyCategoryFilter()"
									  v-model="category.archivals"
									  true-value="archival" false-value=""
									  value="archival"/>
						</v-list-item-action>
						<v-list-item-title>Archivalien</v-list-item-title>
					</v-list-item>
				</v-list>
			</v-col>
			<v-col>
				<v-btn @click="toggleTime()">Zeit</v-btn>
				<v-btn class="filterIcon" @click="resetYearFilter()">
					<v-icon>settings_backup_restore</v-icon>
				</v-btn>
				<v-list v-if="time !== null">
					<v-list-item>
						<v-subheader>Von:</v-subheader>
						<v-text-field @change="applyYearFilter()"
									  v-model="time.from"/>
					</v-list-item>
					<v-list-item>
						<v-subheader>Bis:</v-subheader>
						<v-text-field @change="applyYearFilter()"
									  v-model="time.to"/>
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
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import config from '../../../global.config';

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
			stylePainting: {
				color: config.colors.paintings,
			},
			styleGraphic: {
				color: config.colors.graphics,
			},
			styleArchivals: {
				color: config.colors.archivals,
			},
		};
	},
	methods: {
		...mapActions([
			'addFilter',
			'removeFilter',
		]),
		...mapGetters([
			'getXAxisDomain',
		]),
		toggleSearch() {
			if (this.search === null) {
				this.search = '';
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
			this.resetCategoryFilter();
			this.resetYearFilter();
			this.resetSearch();
		},
		applyCategoryFilter() {
			this.addFilter({
				name: 'categoryFilter',
				type: 'category',
				params: { validCategories: Object.values(this.category) },
			});
		},
		applyYearFilter() {
			if (this.time.from === '') {
				[this.time.from] = this.getXAxisDomain();
			}
			if (this.time.to === '') {
				[, this.time.to] = this.getXAxisDomain();
			}
			this.addFilter({
				name: 'yearFilter',
				type: 'year',
				params: this.time,
			});
		},
		applyIsBestOfFilter() {
		    this.addFilter({
				name: 'isBestOfFilter',
				type: 'isBestOf',
				params: this.isBestOf,
			});
		},
		asyncSearch() {
			setTimeout(() => {
				this.applySearch();
			}, 0);
		},
		applySearch() {
			this.addFilter({
				name: 'search',
				type: 'search',
				params: this.search.toLowerCase(),
			});
		},
		resetCategoryFilter() {
			this.removeFilter('categoryFilter');
			this.category = {
				paintings: 'painting',
				graphics: 'graphic',
				archivals: 'archival',
			};
		},
		resetYearFilter() {
			this.removeFilter('yearFilter');
			this.time = null;
		},
		resetIsBestOfFilter() {
			this.removeFilter('isBestOfFilter');
			this.isBestOf = false;
		},
		resetSearch() {
			this.removeFilter('search');
			this.search = null;
		},
		applyCategoryButton(filterType) {
			switch (filterType) {
			case 'painting':
				if (this.category.paintings === 'painting') {
					this.category.paintings = '';
					this.stylePainting.color = 'grey';
				} else {
					this.category.paintings = 'painting';
					this.stylePainting.color = config.colors.paintings;
				}
				break;
			case 'graphic':
				if (this.category.graphics === 'graphic') {
					this.category.graphics = '';
					this.styleGraphic.color = 'grey';
				} else {
					this.category.graphics = 'graphic';
					this.styleGraphic.color = config.colors.graphics;
				}
				break;
			case 'archival':
				if (this.category.archivals === 'archival') {
					this.category.archivals = '';
					this.styleArchivals.color = 'grey';
				} else {
					this.category.archivals = 'archival';
					this.styleArchivals.color = config.colors.archivals;
				}
				break;
			default: break;
			}
			this.applyCategoryFilter();
		},
	},
};
</script>

<style scoped>
.filterIcon {
	margin-left: 10px;
}
</style>
