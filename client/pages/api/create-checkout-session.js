const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
	const { products } = req.body;

	const transformedItem = products?.map((item) => ({
		price_data: {
			product_data: {
				name: item.product_name,
			},
			currency: 'eur',
			unit_amount: item.price * 100,
		},
		quantity: item.quantity,
		description:
			item.supplement_list.map((sup) => sup.name).join(' ') ||
			'Sans supplement',
	}));

	const session = await stripe.checkout.sessions.create({
		payment_method_types: ['card'],
		line_items: transformedItem,
		mode: 'payment',
		success_url: `${process.env.HOST}/result?session_id={CHECKOUT_SESSION_ID}`,
		cancel_url: `${process.env.HOST}/card`,
	});

	res.status(200).json({ id: session.id });
};
