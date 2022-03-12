import { useOrders } from '../hooks/queries/useOrders';
import { useEffect, useState } from 'react';
import CuisineOrder from '../components/Cuisine/CuisineOrder';
import CuisineOrderFinish from '../components/Cuisine/CuisineOrderFinish';
import { signIn, signOut, useSession } from 'next-auth/react';

const Kitchen = () => {
	const { data: session, status } = useSession();
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
	// console.log(data);
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

	// if (loading) return 'Loading ...';

	if (status === 'authenticated') {
		return (
			<>
				<main className="flex flex-col gap-10 justify-center items-center p-10 bg-gray-200 dark:bg-gray-900">
					<section className="w-full">
						<div className="flex flex-col justify-center py-5 bg-white text-gray-900 dark:bg-gray-700 dark:text-gray-200 rounded shadow-lg gap-8 px-10 overflow-auto">
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
									({
										attributes: { is_prepared, is_payed },
									}) =>
										is_prepared === false &&
										is_payed === true
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
											{
												attributes: {
													products,
													order_id,
													total,
												},
											},
											i
										) => (
											<CuisineOrderFinish
												products={products}
												order_id={order_id}
												total={total}
												key={i}
											/>
										)
									)}
							</div>
							<div className="flex pt-5 justify-between w-full mb-5 border-gray-50">
								<p className="text-xl font-bold">Total</p>
								<p className="text-xl font-bold">{total} €</p>
							</div>
						</div>
						<div className="w-full mt-5 flex justify-center">
							<button
								className="text-bold text-xl rounded bg-gray-900 hover:bg-gray-800 dark:bg-black dark:hover:bg-gray-800 shadow-lg px-4 py-3 text-gray-50"
								onClick={() => signOut()}
							>
								Déconnection
							</button>
						</div>
					</section>
				</main>
			</>
		);
	}
	return (
		<div className="bg-gray-100 h-screen">
			<div className="bg-white p-5">
				<div className="flex flex-col justify-center items-center">
					<h2 className="text-xl font-semibold p-5">
						Vous devez etre connecté pour aller sur cette page{' '}
						<br />
					</h2>
					<button
						className="text-bold text-xl rounded bg-gray-900 hover:bg-gray-800 shadow-lg px-4 py-3 text-gray-50"
						onClick={() => signIn()}
					>
						Connection
					</button>
				</div>
			</div>
		</div>
	);
};

export default Kitchen;
