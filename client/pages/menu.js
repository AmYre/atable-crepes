import { useRouter } from 'next/router';
import Tabs from '../components/Tabs';
import { useGlobalContext } from '../context/Context';
// import Orders from '../components/Orders';
// import { useOrders } from '../hooks/queries/useOrders';
// import { DELETE_ORDER } from '../hooks/mutations/useDeleteOrder';
// import { useMutation } from '@apollo/client';
import FooterImages from '../components/Footer/FooterImages';
import Orders from '../components/Orders';
// import AddCustomer from '../components/Customer/AddCustomer';
// import { UPDATE_ORDER } from '../hooks/mutations/useUpdateOrder';

const Menu = () => {
	// const { data, refetch } = useOrders();

	const { clients, step, productsList, setProductsList, theme } =
		useGlobalContext();
	const router = useRouter();
	const { table } = router.query;

	const removeProduct = (id) => {
		const removedProduct = productsList.filter(
			(product) => product.order_id !== id
		);
		setProductsList(removedProduct);
	};

	const tot = productsList.map(({ supplement_price }) => supplement_price);

	const concatArrays = tot.reduce((a, b) => a.concat(b), []);
	const totalSupplement = concatArrays.reduce((a, b) => a + b, 0);

	const total = productsList.reduce((a, b) => a + b.price * b.quantity, 0);

	return (
		<div className="flex flex-col bg-blue-300 w-screen h-screen">
			<div className="flex flex-col justify-between">
				<main>
					<>
						<h3 className="p-5 text-center text-white font-bold">
							FAITES VOTRE CHOIX
						</h3>
						<Tabs />
					</>
				</main>
				<section>
					<div className="flex flex-col w-full bg-gray-800 rounded text-gray-50 shadow gap-8 p-10">
						<h2 className="font-semibold text-xl">
							Récap' de votre commande
						</h2>
						<div className="flex justify-between font-bold">
							<p>Nom</p>
							<p>Supplement</p>
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
											order_id,
											quantity,
											supplement_name,
											supplement_price,
										},
										i
									) => (
										<div
											className="flex space-x-16"
											key={i}
										>
											<p>{product_name}</p>
											<div>
												{supplement_name.map(
													(item, i) => (
														<p key={i}>{item}</p>
													)
												)}
											</div>
											{/* <div>
												{supplement_price.map(
													(item, i) => (
														<p key={i}>{item} €</p>
													)
												)}
											</div> */}
											<div className="flex">
												<p className="p-2">
													{quantity}
												</p>
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

							<p>{totalSupplement + total} €</p>
						</div>
					</div>
					<Orders />
				</section>
			</div>
		</div>
	);
};

export default Menu;
