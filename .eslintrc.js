module.exports = {
	env: {
		browser: true,
		es2021: true
	},
	extends: [
		'plugin:react/recommended',
		'standard'
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true
		},
		ecmaVersion: 12,
		sourceType: 'module'
	},
	plugins: [
		'react',
		'@typescript-eslint'
	],
	rules: {
		indent: [2, 'tab'],
		'no-tabs': 0,
		'no-use-before-define': 0,
		'spaced-comment': 0,
		'no-unused-vars': 0
	}
}
