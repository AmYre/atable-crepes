import { useRouter } from 'next/router';
import Tabs from '../components/Tabs';
import { useGlobalContext } from '../context/Context';
// import Orders from '../components/Orders';
// import { useOrders } from '../hooks/queries/useOrders';
// import { DELETE_ORDER } from '../hooks/mutations/useDeleteOrder';
// import { useMutation } from '@apollo/client';
import FooterImages from '../components/Footer/FooterImages';
import AddCustomer from '../components/Customer/AddCustomer';
// import { UPDATE_ORDER } from '../hooks/mutations/useUpdateOrder';

const Menu = () => {
	// const { data, refetch } = useOrders();

	const { clients, step, productsList, setProductsList, theme } =
		useGlobalContext();
	const router = useRouter();
	const { table } = router.query;

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
				<FooterImages />
			</div>
		</div>
	);
};

export default Menu;
