import OrderBtn from './OrderBtn';

const Orders = ({ currentUserId }) => {
	return (
		<div>
			<OrderBtn currentUserId={currentUserId} />
		</div>
	);
};

export default Orders;
