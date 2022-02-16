import { useMutation } from '@apollo/client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useGlobalContext } from '../context/Context';
import { UPDATE_ORDER } from '../hooks/mutations/useUpdateOrder';
import { useOrders } from '../hooks/queries/useOrders';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
const stripePromise = loadStripe(process.env.stripe_public_key);

const OrderBtn = ({ currentOrderId }) => {
	const [statusCrepes, setStatusCrepes] = useState('');
	const {
		productsList,
		preparationTime,
		minutes,
		setMinutes,
		seconds,
		setSeconds,
		supplementList,
	} = useGlobalContext();
	const { data: orderData } = useOrders();

	const tot = productsList.map(({ supplement_list }) => supplement_list);
	const concatArrays = tot.reduce((a, b) => a.concat(b), []);
	const totalSupplement = concatArrays.reduce((a, b) => a + b?.price, 0);
	const total = productsList.reduce((a, b) => a + b.price * b.quantity, 0);
	const totalPreparationTime = preparationTime.reduce((a, b) => a + b, 0);

	const [updateOrder, { called }] = useMutation(UPDATE_ORDER, {
		variables: {
			id: Number(currentOrderId),
			// is_payed: false,
			preparation_time: totalPreparationTime,
			// total: total + totalSupplement,
			products: productsList,
		},
	});
	console.log(productsList);
	const waiting_time = orderData?.commandes.data
		.filter((item) => item.attributes.is_prepared === false)
		.reduce((a, b) => a + b.attributes.preparation_time, 0);

	let time = (waiting_time + totalPreparationTime) * 60;

	const timerCountDown = () => {
		if (time > 0) {
			setMinutes(Math.floor(time / 60));
			setSeconds(time % 60);
			time--;
			seconds < 10 ? `0${seconds}` : seconds;
		} else {
			console.log('Commande est prete');
		}
	};

	useEffect(() => {
		if (minutes < 15 && minutes > 10) {
			setStatusCrepes('Attente estimé moins de 15 minutes');
		} else if (minutes < 10 && minutes > 5) {
			setStatusCrepes('Attente estimé moins de 10 minutes');
		} else if (minutes <= 5) {
			setStatusCrepes('Votre crépes est en cuisson');
		} else {
			setStatusCrepes('Plus de 15 minutes');
		}
	}, [minutes]);

	const handleUpdateOrder = () => {
		// Later after payemnt i called the update order
		updateOrder();
		// setInterval(() => {
		// 	const timer = timerCountDown();
		// 	return clearInterval(timer);
		// }, 1000);
	};

	const createCheckoutSession = async () => {
		handleUpdateOrder();
		const stripe = await stripePromise;

		// Call the backend to create a checkout session..
		const checkoutSession = await axios.post(
			'/api/create-checkout-session',
			{
				products: productsList,
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
			<div
				className={`${
					called
						? 'flex items-center justify-center z-10 bg-white bg-opacity-70 h-screen w-full fixed bottom-0 left-0'
						: 'hidden'
				} `}
			>
				<div className="bg-white py-0 rounded w-full md:w-4/5 lg:w-2/3">
					<div className="flex flex-col justify-around w-full h-screen py-10 px-3 bg-gray-100 relative">
						<h2 className="text-base font-bold mt-5 text-center">
							Votre commande est en cours de préparation
						</h2>
						<p className="text-base font-bold mt-5 text-center">
							{statusCrepes}
						</p>
					</div>
				</div>
			</div>
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
