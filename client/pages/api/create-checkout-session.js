const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
	const { products } = req.body;

	const transformedItem = products?.map((item) => ({
		price_data: {
			currency: 'eur',
			unit_amount: item.price * 100,
			product_data: {
				name: item.product_name,
			},
		},
		quantity: item.quantity,
		description: item.supplement_list.map((sup) => sup.name).join(' '),
	}));

	const session = await stripe.checkout.sessions.create({
		payment_method_types: ['card'],
		line_items: transformedItem,
		mode: 'payment',
		success_url: `${process.env.HOST}/success`,
		cancel_url: `${process.env.HOST}/checkout`,
	});

	res.status(200).json({ id: session.id });
};
