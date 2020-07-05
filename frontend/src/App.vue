<template>
  <v-app>
		<v-app-bar app>
			<v-spacer />
				<h1>Cranach Timeline</h1>
			<v-spacer />
		</v-app-bar>
		<v-main>
			<v-container>
				<Chart/>
				<SpecialEventTimeline :event-list="cranachElderEvents" :color="'black'"></SpecialEventTimeline>
				<SpecialEventTimeline :event-list="cranachYoungerEvents" :color="'black'"></SpecialEventTimeline>
				<SpecialEventTimeline :event-list="lutherEvents" :color="'grey'"></SpecialEventTimeline>
				<SpecialEventTimeline :event-list="historyEvents"></SpecialEventTimeline>
				<Timeline
					ref="breadcrumb"
					:images="images"
					:height="windowHeight * 0.15"
					:minDate="min"
					:maxDate="max"
					handleColor="#999999"
					holderColor="#dee4ec"
					primaryColor="#424242"
					backgroundColor="rgb(250, 250, 250)"
					:equalWidth="true"
					:frequencies="frequencies"
					frequencyColor="rgb(250, 250, 250)"
					@rangeChanged="applyYearFilter"
				/>
			</v-container>
		</v-main>
	</v-app>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Timeline from './components/Timeline.vue';
import Chart from './components/Chart.vue';
import SpecialEventTimeline from './components/SpecialEventTimeline.vue';

import cranachElderEvents from './assets/cranachElderEvents.json';
import cranachYoungerEvents from './assets/cranachYoungerEvents.json';
import lutherEvents from './assets/lutherEvents.json';
import historyEvents from './assets/historyEvents.json';

export default {
	name: 'App',
	components: {
		Chart,
		SpecialEventTimeline,
		Timeline,
	},
	data: () => ({
		windowHeight: 10,
		factor: 1,
		min: new Date('1472-10-04'),
		max: new Date('2000-01-01'),
		images: [
			{
				src: 'https://upload.wikimedia.org/wikipedia/commons/a/ad/Lucas_Cranach_d._%C3%84._-_David_and_Bathsheba_-_WGA05718.jpg',
				start: new Date('1472-10-04'),
				end: new Date(-15456196915200),
				focus: {
					x: 10,
					y: 335,
				},
				size: {
					x: 230,
					y: 433,
				},
			},
			{
				src: 'https://thomas-michel-contemporary-art.de/wp-content/uploads/2015/12/cranach-agnes-von-hayn-1543-1.jpg',
				start: new Date(-15456196915200),
				end: new Date(-15325785100800),
				focus: {
					x: 100,
					y: 75,
				},
				size: {
					x: 267.5,
					y: 300,
				},
			},
			{
				src: 'https://mobil.rundschau-online.de/image/26678446/4x3/620/465/a1f24253b27bac367b259947cee465f8/lZ/cranach-madonna.jpg',
				start: new Date(-15325785100800),
				end: new Date(-15195373286400),
				focus: {
					x: 155,
					y: 50,
				},
				size: {
					x: 310,
					y: 232,
				},
			},
			{
				src: 'https://www.dw.com/image/37343060_303.jpg',
				start: new Date(-15195373286400),
				end: new Date(-14673726028800),
				focus: {
					x: 150,
					y: 110,
				},
				size: {
					x: 350,
					y: 197,
				},
			},
			{
				// TODO: Make me dynamic
				// eslint-disable-next-line max-len
				src: 'https://upload.wikimedia.org/wikipedia/commons/7/7d/The_Procuress_by_Lucas_Cranach_the_Elder%2C_Tbilisi_Museum_of_Fine_Arts.jpg',
				start: new Date(-14673726028800),
				end: new Date(-14595478940160),
				focus: {
					x: 175,
					y: 100,
				},
				size: {
					x: 300,
					y: 456,
				},
			},
			{
				// TODO: Make me dynamic
				// eslint-disable-next-line max-len
				src: 'https://www.christies.com/img/LotImages/2018/NYR/2018_NYR_15654_0007_000(lucas_cranach_i_portrait_of_john_frederick_i_elector_of_saxony_half-le).jpg',
				start: new Date(-14595478940160),
				end: new Date(-14412902400000),
				focus: {
					x: 125,
					y: 75,
				},
				size: {
					x: 254,
					y: 400,
				},
			},
			{
				src: 'https://www.spsg.de/fileadmin/user_upload/Bilder_Veranstaltungen_Header/Cranach_Eva_Detail.jpg',
				start: new Date(-14412902400000),
				end: new Date(-14021666956800),
				focus: {
					x: 200,
					y: 100,
				},
				size: {
					x: 487,
					y: 169,
				},
			},
			{
				// TODO: Make me dynamic
				// eslint-disable-next-line max-len
				src: 'https://media.wsimag.com/attachments/f1c5ddf8834dbc7fcc2f7426d779b0973380da7f/store/fill/1090/613/1b2cc39b17d2de04ada5d303fec80fe0023e55b7a0e2346e1e60e658d44d/Lucas-Cranach-the-Elder-Law-and-Grace-1529-Narodni-galerie-v-Praze-slash-Nationalgalerie-Prag.jpg',
				start: new Date(-14021666956800),
				end: new Date('2000-01-01'),
				focus: {
					x: 250,
					y: 225,
				},
				size: {
					x: 545,
					y: 307,
				},
			},
		],
		cranachElderEvents,
		cranachYoungerEvents,
		lutherEvents,
		historyEvents,
	}),
	methods: {
		...mapActions(['loadData', 'applyYearFilter']),
	},
	computed: {
		frequencies: {
			get() {
				const minYear = this.min.getFullYear();
				const maxYear = this.max.getFullYear();
				const freq = [];
				for (let i = minYear; i <= maxYear; i += 1) {
					freq.push({ x: i, y: Math.random() });
				}
				return freq;
			},
		},
		...mapState({ items: (state) => state.items }),
	},
	mounted() {
		this.windowHeight = window.innerHeight;
		this.loadData();
	},
};
</script>
