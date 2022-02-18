import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { UPDATE_ORDER } from '../hooks/mutations/useUpdateOrder';
import { useMutation } from '@apollo/client';
import { useGlobalContext } from '../context/Context';
import { useOrders } from '../hooks/queries/useOrders';

const Success = () => {
	const router = useRouter();
	const { data: orderData } = useOrders();
	const [statusCrepes, setStatusCrepes] = useState('');
	const {
		productsList,
		setProductsList,
		preparationTime,
		minutes,
		setMinutes,
		seconds,
		setSeconds,
	} = useGlobalContext();
	const totalPreparationTime = preparationTime.reduce((a, b) => a + b, 0);

	const { data, error } = useSWR(
		router.query.session_id ? `/api/${router.query.session_id}` : null,
		(url) =>
			fetch(url)
				.then((res) => res.json())
				.catch((err) => console.log(err.message))
	);

	const [updateOrder, { data: OrderData, called }] = useMutation(
		UPDATE_ORDER,
		{
			variables: {
				id: Number(data?.session.metadata.id),
				is_payed: true,
				total: data?.session.amount_total / 100,
				// preparation_time: totalPreparationTime,
			},
		}
	);

	useEffect(() => {
		if (data !== undefined) {
			updateOrder();
			setProductsList(OrderData);
			handleTimer();
		}
	}, [data]);

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
	console.log(minutes, seconds);
	useEffect(() => {
		if (minutes < 15 && minutes >= 10) {
			setStatusCrepes('Attente estimé moins de 15 minutes');
		} else if (minutes < 10 && minutes >= 5) {
			setStatusCrepes('Attente estimé moins de 10 minutes');
		} else if (minutes < 5) {
			setStatusCrepes('Votre crépes est en cuisson');
		} else {
			setStatusCrepes('Plus de 15 minutes');
		}
	}, [minutes]);

	const handleTimer = () => {
		// updateOrder();
		setInterval(() => {
			const timer = timerCountDown();
			return clearInterval(timer);
		}, 1000);
	};

	return (
		<>
			{data ? (
				<div>
					<div>
						<h1>
							Payment Result {data?.session.payment_intent.status}
						</h1>
						<p>Status: {data?.session.payment_status}</p>
						<p>Total: {data?.session.amount_total / 100} €</p>
						{/* <pre>
						{data ? JSON.stringify(data, null, 2) : 'Loading...'}
					</pre> */}
					</div>
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
				</div>
			) : (
				'Loading'
			)}
		</>
	);
};

export default Success;
