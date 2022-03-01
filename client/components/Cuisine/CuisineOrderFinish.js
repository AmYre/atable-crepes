import { useState } from 'react';

const CuisineOrderFinish = ({ order_id, products, key }) => {
	const [activeTab, setActiveTab] = useState(false);

	return (
		<div
			key={key}
			className="flex flex-col min-h-full border-x-2 overflow-auto"
		>
			{/* <img src={'./'} /> */}
			<div
				onClick={() => setActiveTab(!activeTab)}
				className="flex justify-around p-3 mb-1 bg-gray-300"
			>
				<h2 className="text-xl fond-bold">N° {order_id}</h2>
				<p className="text-xl text-green-500 ">Livrer</p>
			</div>
			{products.map(
				({ product_name, supplement_list, quantity, price }, i) => (
					<div key={i} className={`overflow-hidden`}>
						<div
							className={`flex justify-between px-2 border-b-2 transition duration-500 ${
								activeTab
									? '-translate-y-0 h-auto'
									: '-translate-y-full h-0'
							} `}
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
											{item.name} {item.price.toFixed(2)}{' '}
											€
										</p>
									))}
								</div>
							</div>

							<p>{price.toFixed(2)} €</p>
						</div>
					</div>
				)
			)}
		</div>
	);
};

export default CuisineOrderFinish;
