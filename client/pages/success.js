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
	const [moreDetail, setMoreDetail] = useState(false);
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
			},
		}
	);

	useEffect(() => {
		if (data !== undefined && data.session.id.startsWith('cs_')) {
			updateOrder();
			setProductsList(OrderData);
			handleTimer();
			localStorage.clear();
		}
	}, [data]);

	const waiting_time = orderData?.commandes.data
		.filter(
			(item) =>
				item.attributes.is_prepared === false &&
				item.attributes.is_payed === true
		)
		.reduce((a, b) => a + b.attributes.preparation_time, 0);

	let time = (waiting_time + totalPreparationTime) * 60;

	const timerCountDown = () => {
		if (time > 0) {
			setMinutes(Math.floor(time / 60));
			setSeconds(time % 60);
			time--;
			seconds < 10 ? `0${seconds}` : seconds;
		} else {
			return;
		}
	};

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
		setInterval(() => {
			const timer = timerCountDown();
			return clearInterval(timer);
		}, 1000);
	};

	const currentOrderId = orderData?.commandes.data.find(
		({ id }) => Number(id) === Number(data?.session.metadata.id)
	);

	return (
		<>
			{data ? (
				<div className="bg-gray-100 h-screen">
					<main className="max-w-screen-lg mx-auto">
						<div className="flex flex-col p-10 bg-white">
							<div className="space-x-2 mb-5">
								<h1 className="text-2xl">
									Merci de votre achat, votre commandes est
									confirmé!
								</h1>
							</div>

							<p>
								Votre commande est en cours de préparation vous
								serez averti lorsque votre commande est prete
							</p>
							<button
								onClick={() => setMoreDetail(!moreDetail)}
								className="mt-8 mb-5 bg-red-500 rounded-md shadow-lg px-3 py-2 text-gray-50"
							>
								Voir le detail de ma commande
							</button>
							{moreDetail && (
								<div>
									<h2 className="border-t-2 space-x-2 my-5 text-2xl">
										Détail de votre commande numéro{' '}
										{currentOrderId?.attributes.order_id}
									</h2>
									{currentOrderId?.attributes.products.map(
										(
											{ product_name, supplement_list },
											i
										) => (
											<div
												key={i}
												className="flex space-x-10"
											>
												<p className="text-xs md:text-sm font-bold">
													{product_name}:
												</p>
												{supplement_list.map(
													({ name }, i) => (
														<div
															key={i}
															className="flex flex-wrap my-2"
														>
															<p className="font-normal text-xs md:text-sm px-1">
																{name}
															</p>
														</div>
													)
												)}
											</div>
										)
									)}

									<p className="text-2xl text-right">
										Total:{' '}
										{Number(
											data?.session.amount_total / 100
										).toFixed(2)}{' '}
										€
									</p>
								</div>
							)}
							{called ? (
								<div>
									<h2 className="border-t-2 space-x-2 my-5 text-2xl">
										Votre commande est en cours de
										préparation
									</h2>
									<p>{statusCrepes}</p>
								</div>
							) : (
								'Loading...'
							)}
						</div>
					</main>
				</div>
			) : (
				'Loading'
			)}
		</>
	);
};

export default Success;
