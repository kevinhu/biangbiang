module.exports = {
	extends: ["eslint:recommended", "google", "prettier"],
	rules: {},
	parser: "babel-eslint",

	// get rid of 'console' not defined errors
	env: {
		es6: true,
		browser: true,
		node: true,
	},
};
