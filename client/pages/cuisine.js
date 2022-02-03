import { useOrders } from '../hooks/queries/useOrders';
import { useEffect } from 'react';

const Kitchen = () => {
	const { data, refetch } = useOrders();

	// useEffect(() => {
	// 	setInterval(() => {
	// 		const timer = refetch();
	// 		return clearInterval(timer);
	// 	}, 10000);
	// }, []);

	// const total = data?.commandes.reduce((a, b) => a + b.price, 0);

	return (
		<>
			<main className="flex flex-col gap-10 justify-center items-center p-20">
				<section className="w-1/2">
					<div className="flex flex-col w-full bg-gray-800 rounded text-gray-50 shadow gap-8 p-10">
						<h2 className="font-semibold text-xl">
							Commande en cours
						</h2>

						<div>
							<div className="flex justify-between font-bold">
								<p>Table</p>
								<p>Nom</p>
								<p>descr..</p>
							</div>
						</div>
						{data?.commandes.data.map(
							(
								{
									attributes: {
										client_name,
										table_number,
										products,
									},
								},
								i
							) => (
								<div
									key={i}
									className="flex justify-between pb-2"
								>
									<p>N° {table_number}</p>
									<p>{client_name}</p>
									<div>
										{/* <img src={'./'} /> */}
										{products.map(({ product_name }, i) => (
											<p key={i}>{product_name}</p>
										))}
									</div>
								</div>
							)
						)}
						<div className="flex pt-5 justify-between w-full border-t-2 border-gray-50">
							<p>Total</p>
							{/* <p>{total} €</p> */}
						</div>
					</div>
				</section>
			</main>
		</>
	);
};

export default Kitchen;
