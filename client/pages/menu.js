import { useGlobalContext } from '../context/Context';
import MenuList from '../components/MenuList/MenuList ';
import Orders from '../components/Orders';
import { useMutation, useQuery } from '@apollo/client';
import { useMenuList } from '../hooks/queries/useMenuList';
import { CREATE_ORDER } from '../hooks/mutations/useCreateOrder';
import { useOrders } from '../hooks/queries/useOrders';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { TrashIcon } from '@heroicons/react/solid';

const Menu = () => {
	const router = useRouter();
	const { refetch } = useOrders();
	const { loading } = useMenuList();
	const {
		productsList,
		setProductsList,
		theme,
		firstStep,
		setFirstStep,
		randomNumber,
		supplementList,
	} = useGlobalContext();

	const [createOrder, { data: newOrderData }] = useMutation(CREATE_ORDER);

	const currentOrderId = newOrderData?.createCommande.data.id;

	const removeProduct = (id) => {
		const removedProduct = productsList.filter(
			(product) => product.product_id !== id
		);
		setProductsList(removedProduct);
		localStorage.clear();
	};

	// concat all the arrays together and get all totals amounts
	const tot = productsList?.map(({ supplement_list }) => supplement_list);
	const concatArrays = tot?.reduce((a, b) => a.concat(b), []);
	const totalSupplement = concatArrays.reduce((a, b) => a + b?.price, 0);
	const total = productsList.reduce((a, b) => a + b.price * b.quantity, 0);

	if (typeof window !== 'undefined') {
		// require to have localstorage to work with next
		const localProduct = localStorage.getItem('productList');
		const parserdData = JSON.parse(localProduct);
		// console.log(parserdData);
	}

	useEffect(() => {
		if (parserdData) {
			setProductsList(parserdData);
		}
	}, []);

	if (loading) return 'Loading...';

	console.log(productsList);
	return (
		<div className="flex flex-col bg-blue-300 w-screen h-screen">
			{(firstStep && !loading) || (router.query.id && !loading) ? (
				<div className="flex flex-col justify-between">
					<main>
						<MenuList />
					</main>
					<section>
						<div className="flex flex-col w-full bg-gray-800 rounded text-gray-50 shadow gap-8 p-10">
							<h2 className="font-bold text-2xl uppercase border-b-2 py-1">
								Récap' de votre commande
							</h2>
							<div className="flex justify-between font-bold">
								<p className="uppercase">Produit</p>
								<p className="uppercase">quantite</p>
								<p className="uppercase">supprimer</p>
								<p className="uppercase">prix</p>
							</div>
							<div className="flex flex-col pb-2">
								{productsList.map(
									(
										{
											product_name,
											price,
											product_id,
											quantity,
											supplement_list,
										},
										i
									) => (
										<div
											className="flex justify-between"
											key={i}
										>
											<div className="flex flex-col">
												<div className="flex">
													<p className="text-lg font-bold pr-5">
														{product_name}
													</p>
													<p className="text-lg font-bold">
														x {quantity}
													</p>
												</div>
												<div className="flex my-2">
													{supplement_list?.map(
														(item, i) => (
															<p
																className="font-light text-xs md:text-sm px-1"
																key={i}
															>
																{item.name}{' '}
																{item.price.toFixed(
																	2
																)}{' '}
																€
															</p>
														)
													)}
												</div>
											</div>
											{/* <div className="flex">
												<p className="p-2">
													{quantity}
												</p>
											</div> */}
											<TrashIcon
												className="cursor-pointer w-4 h-4"
												onClick={() =>
													removeProduct(product_id)
												}
											/>

											<p>{price.toFixed(2)} €</p>
										</div>
									)
								)}
							</div>
							<div className="flex pt-5 justify-between w-full border-t-2 border-gray-50">
								<p className="text-xl font-bold">Total</p>

								<p className="text-xl font-bold">
									{Number(totalSupplement + total).toFixed(2)}{' '}
									€
								</p>
							</div>
						</div>
						<Orders currentOrderId={currentOrderId} />
					</section>
				</div>
			) : (
				<button
					className="w-1/5 m-auto bg-red-500 hover:bg-red-400 rounded-md shadow-lg px-4 py-3 text-gray-50"
					onClick={() => {
						setFirstStep(!firstStep);
						createOrder({
							variables: {
								order_id: randomNumber,
								total: 0,
								confirm_order: false,
							},
						});
						refetch();
					}}
				>
					Choisir une crépes
				</button>
			)}
		</div>
	);
};

export default Menu;
