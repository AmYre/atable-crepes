import React from 'react';
import Orders from '../components/Orders';
import { useGlobalContext } from '../context/Context';

const card = () => {
	const { productsList, setProductsList } = useGlobalContext();

	const total = productsList.reduce((a, b) => a + b.price * b.quantity, 0);

	const removeProduct = (id) => {
		const removedProduct = productsList.filter(
			(product) => product.order_id !== id
		);
		setProductsList(removedProduct);
	};

	return (
		<div>
			<section>
				<div className="flex flex-col w-full bg-gray-800 rounded text-gray-50 shadow gap-8 p-10">
					<h2 className="font-semibold text-xl">
						Récap' de votre commande
					</h2>
					<div className="flex justify-between font-bold">
						<p>Nom</p>
						<p>desc'</p>
						<p>quantite</p>
						<p>supprimer</p>
						<p>prix</p>
					</div>
					<div className="flex justify-between pb-2">
						{/* <p>{client_name}</p> */}
						<div>
							{productsList.map(
								(
									{
										product_name,
										price,
										client_name,
										order_id,
										quantity,
									},
									i
								) => (
									<div className="flex space-x-16" key={i}>
										<p>{client_name} </p>
										<p>{product_name}</p>
										<div className="flex">
											<p className="p-2">{quantity}</p>
										</div>
										<p
											className="cursor-pointer"
											onClick={() =>
												removeProduct(order_id)
											}
										>
											X
										</p>
										<p>{price} €</p>
									</div>
								)
							)}
						</div>
					</div>
					<div className="flex pt-5 justify-between w-full border-t-2 border-gray-50">
						<p>Total</p>

						<p>{total} €</p>
					</div>
				</div>
				<Orders />
			</section>
		</div>
	);
};

export default card;
