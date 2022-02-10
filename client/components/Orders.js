import { gql, useMutation } from '@apollo/client';
import Link from 'next/link';
import { useGlobalContext } from '../context/Context';
import { UPDATE_ORDER } from '../hooks/mutations/useUpdateOrder';
import { useOrders } from '../hooks/queries/useOrders';

const Orders = ({ currentUserId }) => {
	const { productsList, preparationTime } = useGlobalContext();
	const { data: orderData } = useOrders();

	const tot = productsList.map(({ supplement_list }) => supplement_list);

	const concatArrays = tot.reduce((a, b) => a.concat(b), []);

	const totalSupplement = concatArrays.reduce((a, b) => a + b?.price, 0);

	const total = productsList.reduce((a, b) => a + b.price * b.quantity, 0);

	const totalPreparationTime = preparationTime.reduce((a, b) => a + b, 0);

	const [updateOrder, { called }] = useMutation(UPDATE_ORDER, {
		variables: {
			id: Number(currentUserId),
			confirm_order: true,
			preparation_time: totalPreparationTime,
			total: total + totalSupplement,
			products: productsList,
		},
	});

	const waiting_time = orderData?.commandes.data
		.filter((item) => item.attributes.is_prepared === false)
		.reduce((a, b) => a + b.attributes.preparation_time, 0);

	let time = (waiting_time + totalPreparationTime) * 60;
	let minutes;
	let seconds;

	const timerCountDown = () => {
		if (time > 0) {
			minutes = Math.floor(time / 60);
			seconds = time % 60;
			time--;
			seconds = seconds < 10 ? `0${seconds}` : seconds;
			console.log(
				`Temps restant ${minutes} et ${seconds} and time is ${time}`
			);
		} else {
			console.log('Commande est prete');
		}
	};
	console.log(
		`Votre temps pour cette commande ${totalPreparationTime} minute`
	);
	console.log(`Temps en attente ds la base ${waiting_time}`);
	console.log((waiting_time + totalPreparationTime) * 60);

	return (
		<div>
			{called && <h2>Votre commande est en cours de préparation</h2>}
			<button
				onClick={() => {
					updateOrder();
					setInterval(() => {
						const timer = timerCountDown();
						return clearInterval(timer);
					}, 1000);
				}}
				className="bg-red-500 rounded-md shadow-lg px-4 py-3 text-gray-50"
			>
				Commander
			</button>
		</div>
	);
};

export default Orders;
