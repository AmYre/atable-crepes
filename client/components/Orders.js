import { gql, useMutation } from '@apollo/client';
import Link from 'next/link';
import { useGlobalContext } from '../context/Context';
import { UPDATE_ORDER } from '../hooks/mutations/useUpdateOrder';
// import { useOrders } from '../hooks/queries/useOrders';

const Orders = () => {
	// const { refetch, data: orderData } = useOrders();
	const { clients, activeTab, productsList, setProductsList } =
		useGlobalContext();

	// const currentUser = orderData?.commandes.data.find(
	// 	(user) => user.attributes.client_name === clients[0]
	// );

	// const [updateOrder, { called }] = useMutation(UPDATE_ORDER, {
	// 	variables: {
	// 		id: Number(currentUser?.id),
	// 		confirm_order: true,
	// 		products: productsList,
	// 	},
	// });

	return (
		<div>
			{/* {called && <h2>Votre commande est en cours de préparation</h2>} */}
			<button
				onClick={() => {
					// updateOrder();
					// refetch();
					setProductsList([]);
				}}
				className="bg-red-500 rounded-md shadow-lg px-4 py-3 text-gray-50"
			>
				Commander
			</button>
			<Link href="/menu">
				<a>Retour</a>
			</Link>
		</div>
	);
};

export default Orders;
