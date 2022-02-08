import { gql, useMutation } from '@apollo/client';
import Link from 'next/link';
import { useGlobalContext } from '../context/Context';
import { UPDATE_ORDER } from '../hooks/mutations/useUpdateOrder';

const Orders = ({ currentUserId }) => {
	const { productsList } = useGlobalContext();

	const tot = productsList.map(({ supplement_list }) => supplement_list);

	const concatArrays = tot.reduce((a, b) => a.concat(b), []);

	const totalSupplement = concatArrays.reduce((a, b) => a + b.price, 0);

	const total = productsList.reduce((a, b) => a + b.price * b.quantity, 0);

	const [updateOrder, { called }] = useMutation(UPDATE_ORDER, {
		variables: {
			id: Number(currentUserId),
			confirm_order: true,
			total: total + totalSupplement,
			products: productsList,
		},
	});

	return (
		<div>
			{called && <h2>Votre commande est en cours de préparation</h2>}
			<button
				onClick={() => {
					updateOrder();
					// setProductsList([]);
				}}
				className="bg-red-500 rounded-md shadow-lg px-4 py-3 text-gray-50"
			>
				Commander
			</button>
		</div>
	);
};

export default Orders;
