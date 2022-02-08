import { useGlobalContext } from '../context/Context';
import MenuList from '../components/MenuList/MenuList ';
import Orders from '../components/Orders';
import { useMutation } from '@apollo/client';
import { useMenuList } from '../hooks/queries/useMenuList';
import { CREATE_ORDER } from '../hooks/mutations/useCreateOrder';
import { useOrders } from '../hooks/queries/useOrders';
// import Orders from '../components/Orders';
// import { DELETE_ORDER } from '../hooks/mutations/useDeleteOrder';
// import AddCustomer from '../components/Customer/AddCustomer';
// import { UPDATE_ORDER } from '../hooks/mutations/useUpdateOrder';

const Menu = () => {
	const { refetch, data: orderData } = useOrders();
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

	const currentUserId = newOrderData?.createCommande.data.id;

	const removeProduct = (id) => {
		const removedProduct = productsList.filter(
			(product) => product.product_id !== id
		);
		setProductsList(removedProduct);
	};

	const tot = productsList.map(({ supplement_list }) => supplement_list);

	const concatArrays = tot.reduce((a, b) => a.concat(b), []);

	const totalSupplement = concatArrays.reduce((a, b) => a + b.price, 0);

	const total = productsList.reduce((a, b) => a + b.price * b.quantity, 0);

	return (
		<div className="flex flex-col bg-blue-300 w-screen h-screen">
			{firstStep && !loading ? (
				<div className="flex flex-col justify-between">
					<main>
						<MenuList />
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
											<p>{product_name}</p>
											<div>
												{supplement_list.map(
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
											<p
												className="cursor-pointer"
												onClick={() =>
													removeProduct(product_id)
												}
											>
												X
											</p>
											<p>{price} €</p>
										</div>
									)
								)}
							</div>
							<div className="flex pt-5 justify-between w-full border-t-2 border-gray-50">
								<p>Total</p>

								<p>{totalSupplement + total} €</p>
							</div>
						</div>
						<Orders currentUserId={currentUserId} />
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
					}}
				>
					Choisir une crépes
				</button>
			)}
		</div>
	);
};

export default Menu;
