module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'airbnb'
  ],
  // See https://github.com/DRD4-7R/eslint-config-7r-building/issues/1
  settings: {
    react: {
      version: "999.999.999"
    },
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'max-len': [1, 140, 4],
    'indent': ['error', 'tab'],
    'no-tabs': ['error', { allowIndentationTabs: true }],
	'no-mixed-spaces-and-tabs': ['error', 'smart-tabs']
  },
};
