import Vue from 'vue';
import Vuetify from 'vuetify';
import colors from './colors';

Vue.use(Vuetify);

export default new Vuetify({
	theme: {
		themes: {
			light: {
				black: colors.black,
				primary: colors.primary,
				secondary: colors.secondary,
				yellow: colors.yellow,
				green: colors.green,
				red: colors.red,
				brown: colors.brown,
				blue: colors.blue,
				pink: colors.pink,
				rose: colors.rose,
				turquoise: colors.turquoise,
				purple: colors.purple,
				orange: colors.orange,
				lighten: colors.lighten,
				lighten1: colors.lighten1,
				lighten2: colors.lighten2,
				lighten3: colors.lighten3,
				lighten4: colors.lighten4,
				dark: colors.dark,
			},
			dark: {
				black: colors.lighten,
				primary: colors.lighten,
				secondary: colors.lighten,
				yellow: colors.yellow,
				green: colors.green,
				red: colors.red,
				brown: colors.brown,
				blue: colors.blue,
				pink: colors.pink,
				rose: colors.rose,
				turquoise: colors.turquoise,
				purple: colors.purple,
				orange: colors.orange,
				lighten: colors.black,
				lighten1: colors.lighten4,
				lighten2: colors.lighten3,
				lighten3: colors.lighten2,
				lighten4: colors.lighten1,
			},
		},
		options: {
			customProperties: true,
		},
		dark: true,
	},
	icons: {
		iconfont: 'md',
	},
});
