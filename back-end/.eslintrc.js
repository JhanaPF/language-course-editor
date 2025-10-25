module.exports = {
	'env': {
		'node': true,
		'commonjs': true,
		'es2021': true,
		'mocha': true
	},
	'extends': 'eslint:recommended',
	'overrides': [
		{
			'env': {
				'node': true
			},
			'files': [
				'**/*.test.js',
				'.eslintrc.{js,cjs}'
			],
			'parserOptions': {
				'sourceType': 'script'
			}
		}
	],
	'parserOptions': {
		'ecmaVersion': 'latest'
	},
	'rules': {
		'indent': [
			'error',
			'tab'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [2, 'always'],
		'linebreak-style': ['error', process.platform === 'win32' ? 'windows' : 'unix'],
	    '@typescript-eslint/no-explicit-any': 'off'
	}
};
