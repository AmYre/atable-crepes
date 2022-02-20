import { useMutation } from '@apollo/client';
import { useGlobalContext } from '../context/Context';
import { UPDATE_ORDER } from '../hooks/mutations/useUpdateOrder';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { useRouter } from 'next/router';
const stripePromise = loadStripe(process.env.stripe_public_key);

const OrderBtn = ({ currentOrderId }) => {
	const { productsList, preparationTime } = useGlobalContext();
	const router = useRouter();
	// const { data: orderData } = useOrders();

	const tot = productsList.map(({ supplement_list }) => supplement_list);
	const concatArrays = tot.reduce((a, b) => a.concat(b), []);
	const totalSupplement = concatArrays.reduce((a, b) => a + b?.price, 0);
	const total = productsList.reduce((a, b) => a + b.price * b.quantity, 0);
	const totalPreparationTime = preparationTime.reduce((a, b) => a + b, 0);

	const [updateOrder] = useMutation(UPDATE_ORDER, {
		variables: {
			id: Number(currentOrderId) || Number(router.query.id),
			preparation_time: totalPreparationTime,
			products: productsList,
		},
	});

	const createCheckoutSession = async () => {
		localStorage.setItem('productList', JSON.stringify(productsList)); // save the basket in localStorage before paying
		updateOrder();
		const stripe = await stripePromise;
		// Call the backend to create a checkout session..
		const checkoutSession = await axios.post(
			'/api/create-checkout-session',
			{
				id: Number(currentOrderId) || Number(router.query.id),
				products: productsList,
				supplement_total: totalSupplement,
			}
		);
		// Redirect user/customer to Stripe Checkout
		const result = await stripe.redirectToCheckout({
			sessionId: checkoutSession.data.id,
		});
		console.log(result);
		if (result.error) alert(result.error.message);
	};

	return (
		<div>
			<button
				role="link"
				onClick={createCheckoutSession}
				className="bg-red-500 rounded-md shadow-lg px-4 py-3 text-gray-50"
			>
				{/* <Link href="/api/create-checkout-session">Commander</Link> */}
				Commander
			</button>
		</div>
	);
};

export default OrderBtn;
