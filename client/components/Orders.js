import OrderBtn from './OrderBtn';

const Orders = ({ currentOrderId }) => {
	return (
		<div>
			<OrderBtn currentOrderId={currentOrderId} />
		</div>
	);
};

export default Orders;
