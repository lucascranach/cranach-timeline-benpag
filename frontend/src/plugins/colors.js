const colors = {
	black: '#000000',
	primary: '#444444',
	secondary: '#222222',
	yellow: '#FECB2F',
	green: '#498d23',
	red: '#b14946',
	brown: '#9d705d',
	blue: '#1b66ac',
	pink: '#bc4370',
	rose: '#f9aec2',
	orange: '#db5901',
	turquoise: '#329997',
	purple: '#68529d',
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
			archival: colors.green,
			painting: colors.blue,
			graphic: colors.red,
		};
	},
};
