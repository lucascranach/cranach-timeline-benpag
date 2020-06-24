module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'airbnb'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'max-len': [1, 140, 4],
    'indent': ['error', 'tab'],
    'no-tabs': ['error', { allowIndentationTabs: true }]
  },
};
