import { useMutation } from '@apollo/client';
import { useEffect } from 'react';
import { UPDATE_ORDER } from '../../hooks/mutations/useUpdateOrder';

const CuisineOrder = ({
	products,
	id,
	order_id,
	total,
	updatedAt,
	preparation_time,
	minutes,
}) => {
	const [updateOrder] = useMutation(UPDATE_ORDER);

	return (
		<div className="flex flex-col min-h-full overflow-auto">
			{/* <img src={'./'} /> */}
			<div className="flex justify-around p-3 border-gray-900 border-y-2 text-gray-100 bg-gray-800 hover:bg-gray-800">
				<h2
					onClick={() => {
						updateOrder({
							variables: {
								id: Number(id),
								is_prepared: true,
							},
						});
					}}
					className="text-xl fond-bold cursor-pointer"
				>
					N° {order_id}
				</h2>
				<p
					className={`${
						preparation_time + minutes < 5
							? 'text-red-500 text-xl'
							: ''
					}`}
				>
					{preparation_time + minutes} Min
				</p>
				<p className="text-xl fond-bold cursor-pointer">
					Total: {total.toFixed(2)} €
				</p>
			</div>
			{/* <p>{updatedAt}</p> */}
			{products.map(
				({ product_name, supplement_list, quantity, price }, i) => (
					<div
						className="flex justify-between px-2 pt-2 border-gray-900 border-b-2 hover:bg-gray-100"
						key={i}
					>
						<div className="flex flex-col">
							<div className="flex">
								<p className="text-sm md:text-base font-bold pr-5">
									{product_name}
								</p>
								<p className="text-sm md:text-base font-bold">
									x {quantity}
								</p>
							</div>
							<div className="flex flex-wrap my-2">
								{supplement_list?.map((item, i) => (
									<p
										className="font-light text-xs md:text-sm px-1"
										key={i}
									>
										{item.name} {item.price.toFixed(2)} €
									</p>
								))}
							</div>
						</div>
						<p>{price.toFixed(2)} €</p>
					</div>
				)
			)}
		</div>
	);
};

export default CuisineOrder;
