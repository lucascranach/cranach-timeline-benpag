const colors = {
	black: '#000000',
	primary: '#444444',
	secondary: '#222222',
	yellow: '#FECB2F',
	green: '#8fa380',
	red: '#c24749',
	brown: '#9d705d',
	blue: '#6b7ea8',
	pink: '#bc4370',
	rose: '#f9aec2',
	turquoise: '#3cb8b6',
	purple: '#876fbd',
	lighten: '#FFFFFF',
	lighten1: '#F2F2F2',
	lighten2: '#F0F0F0',
	lighten3: '#DDDDDD',
	lighten4: '#B4B4B4',
	dark: '#000321',
	grey: '#121212',
};

export default {
	...colors,
	getCategoryColors() {
		return {
			archival: colors.red,
			painting: colors.yellow,
			graphic: colors.blue,
		};
	},
};
