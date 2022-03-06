module.exports = {
	images: {
		domains: ['a-vos-crepes.herokuapp.com'],
	},
	reactStrictMode: true,
	env: {
		stripe_public_key: process.env.STRIPE_PUBLIC_KEY,
	},
};
