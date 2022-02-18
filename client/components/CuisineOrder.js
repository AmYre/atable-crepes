import { useMutation } from '@apollo/client';
import { UPDATE_ORDER } from '../hooks/mutations/useUpdateOrder';

const CuisineOrder = ({ products, id }) => {
	const [updateOrder] = useMutation(UPDATE_ORDER);

	return (
		<div className="flex flex-col pb-2">
			{/* <img src={'./'} /> */}
			{products.map(
				({ product_name, supplement_list, quantity, price }, i) => (
					<div className="flex justify-between" key={i}>
						<p>{product_name}</p>
						<div>
							{supplement_list?.map((item, i) => (
								<p key={i}>{item.name}</p>
							))}
						</div>
						<div className="flex">
							<p className="p-2">{quantity}</p>
						</div>
						<p
							className="cursor-pointer"
							onClick={() => {
								updateOrder({
									variables: {
										id: Number(id),
										is_prepared: true,
									},
								});
							}}
						>
							X
						</p>
						<p>{price} €</p>
					</div>
				)
			)}
		</div>
	);
};

export default CuisineOrder;
