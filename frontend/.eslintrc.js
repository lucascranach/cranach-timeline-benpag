module.exports = {
	root: true,

	env: {
		node: true,
	},

	extends: [
		'plugin:vue/essential',
		'@vue/airbnb',
	],

	parserOptions: {
		parser: 'babel-eslint',
	},

	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'max-len': [1, 140, 4],
		'indent': ['error', 'tab'],
		'no-tabs': ['error', { allowIndentationTabs: true }],
		'no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
	},

	overrides: [
		{
			files: [
				'**/__tests__/*.{j,t}s?(x)',
				'**/tests/unit/**/*.spec.{j,t}s?(x)',
			],
			env: {
				mocha: true,
			},
		},
	],
};
