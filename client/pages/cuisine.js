import { useOrders } from '../hooks/queries/useOrders';
import { useEffect, useState } from 'react';
import { UPDATE_ORDER } from '../hooks/mutations/useUpdateOrder';
import CuisineOrder from '../components/Cuisine/CuisineOrder';
import CuisineOrderFinish from '../components/Cuisine/CuisineOrderFinish';

const Kitchen = () => {
	const { data, refetch } = useOrders();
	const [minutes, setMinutes] = useState(0);
	const [seconds, setSeconds] = useState(0);
	let startingMinutes = 0;
	let time = startingMinutes * 60;

	const timerCountDown = () => {
		setMinutes(Math.floor(time / 60));
		setSeconds(time % 60);
		time--;
		seconds < 10 ? `0${seconds}` : seconds;
	};

	useEffect(() => {
		setInterval(() => {
			const timer = refetch();
			return clearInterval(timer);
		}, 10000);
		setInterval(() => {
			const timer = timerCountDown();
			return clearInterval(timer);
		}, 1000);
	}, []);

	const total = data?.commandes.data
		.reduce((a, b) => a + b.attributes.total, 0)
		.toFixed(2);

	return (
		<>
			<main className="flex flex-col gap-10 justify-center items-center p-10 bg-gray-200">
				<section className="w-full">
					<div className="flex flex-col justify-center py-5 bg-white text-gray-900 rounded shadow-lg gap-8 px-10">
						<h2 className="font-bold text-lg md:text-xl uppercase border-gray-900 border-b-2 py-1">
							Commande en cours
						</h2>
						<div className="flex justify-around font-bold">
							{/* <p className="text-sm md:text-lg">Produit</p> */}
							<p className="text-sm md:text-lg">Commande</p>
							<p>Temps</p>
							{/* <p>supprimer</p> */}
							<p className="text-sm md:text-lg">prix</p>
						</div>
						{data?.commandes.data
							.filter(
								({ attributes: { is_prepared, is_payed } }) =>
									is_prepared === false && is_payed === true
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
											updatedAt,
											total,
											preparation_time,
										},
									},
									i
								) => (
									<CuisineOrder
										order_id={order_id}
										key={i}
										id={id}
										updatedAt={updatedAt}
										products={products}
										total={total}
										preparation_time={preparation_time}
										minutes={minutes}
									/>
								)
							)}
						<h2 className="font-bold text-lg md:text-xl uppercase border-gray-900 border-b-2 py-1">
							Commande terminée
						</h2>
						<div>
							{data?.commandes.data
								.filter(
									({ attributes: { is_prepared } }) =>
										is_prepared === true
								)
								.map(
									(
										{ attributes: { products, order_id } },
										i
									) => (
										<CuisineOrderFinish
											products={products}
											order_id={order_id}
											key={i}
										/>
									)
								)}
						</div>
						<div className="flex pt-5 justify-between w-full mb-5 border-gray-50">
							<p className="text-xl font-bold">Total</p>
							<p>{total} €</p>
						</div>
					</div>
				</section>
			</main>
		</>
	);
};

export default Kitchen;
