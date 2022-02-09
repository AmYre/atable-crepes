import { useOrders } from '../hooks/queries/useOrders';
import { useEffect } from 'react';
import { UPDATE_ORDER } from '../hooks/mutations/useUpdateOrder';
import { useMutation } from '@apollo/client';

const Kitchen = () => {
	const { data, refetch } = useOrders();
	// let startingMinutes = 1;
	// let time = startingMinutes * 60;
	// let minutes;
	// let seconds;

	// const timerCountDown = () => {
	// 	minutes = Math.floor(time / 60);
	// 	seconds = time % 60;
	// 	time--;
	// 	seconds = seconds < 10 ? `0${seconds}` : seconds;
	// 	console.log(minutes, seconds);
	// };

	const [updateOrder, { called }] = useMutation(UPDATE_ORDER);

	useEffect(() => {
		setInterval(() => {
			const timer = refetch();
			return clearInterval(timer);
		}, 10000);
		// setInterval(() => {
		// 	const timer = timerCountDown();
		// 	return clearInterval(timer);
		// }, 1000);
	}, []);

	const total = data?.commandes.data.reduce(
		(a, b) => a + b.attributes.total,
		0
	);

	return (
		<>
			<main className="flex flex-col gap-10 justify-center items-center p-20">
				<section className="w-full">
					<div className="flex flex-col w-full bg-gray-800 rounded text-gray-50 shadow gap-8 p-10">
						<h2 className="font-semibold text-xl">
							Commande en cours
						</h2>
						<div>
							<div className="flex justify-between font-bold">
								<p>Produit</p>
								<p>Supplement</p>
								<p>quantite</p>
								<p>supprimer</p>
								<p>prix</p>
							</div>
						</div>
						{data?.commandes.data
							.filter(
								({ attributes: { is_prepared } }) =>
									is_prepared === false
							)
							.map(
								(
									{
										id,
										attributes: {
											confirm_order,
											order_id,
											is_prepared,
											products,
											total,
										},
									},
									i
								) => (
									<div key={i} className="flex flex-col pb-2">
										<div>
											{/* <img src={'./'} /> */}
											{products.map(
												(
													{
														product_name,
														supplement_list,
														quantity,
														price,
													},
													i
												) => (
													<div
														className="flex justify-between"
														key={i}
													>
														<p>{product_name}</p>
														<div>
															{supplement_list?.map(
																(item, i) => (
																	<p key={i}>
																		{
																			item.name
																		}
																	</p>
																)
															)}
														</div>
														<div className="flex">
															<p className="p-2">
																{quantity}
															</p>
														</div>
														<p
															className="cursor-pointer"
															onClick={() => {
																updateOrder({
																	variables: {
																		id: Number(
																			id
																		),
																		is_prepared: true,
																	},
																});
															}}
														>
															X
														</p>
														<p>{price} €</p>
													</div>
												)
											)}
										</div>
										{/* <p className="mx-auto">
											Total: {total}
										</p> */}
									</div>
								)
							)}
						<h2 className="font-semibold text-xl">
							Commande terminée
						</h2>
						{data?.commandes.data
							.filter(
								({ attributes: { is_prepared } }) =>
									is_prepared === true
							)
							.map(({ attributes: { products } }, i) => (
								<div key={i} className="flex flex-col pb-2">
									<div>
										{/* <img src={'./'} /> */}
										{products.map(
											(
												{
													product_name,
													supplement_list,
													quantity,
													price,
												},
												i
											) => (
												<div
													className="flex justify-between"
													key={i}
												>
													<p>{product_name}</p>
													<div>
														{supplement_list?.map(
															(item, i) => (
																<p key={i}>
																	{item.name}
																</p>
															)
														)}
													</div>
													<div className="flex">
														<p className="p-2">
															{quantity}
														</p>
													</div>
													<p>{price} €</p>
												</div>
											)
										)}
									</div>
								</div>
							))}
						<div className="flex pt-5 justify-between w-full border-t-2 border-gray-50">
							<p>Total</p>
							<p>{total} €</p>
						</div>
					</div>
				</section>
			</main>
		</>
	);
};

export default Kitchen;
