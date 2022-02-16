import React from 'react';

const Card = () => {
	return (
		<div>
			<section>
				<div className="flex flex-col w-full bg-gray-800 rounded text-gray-50 shadow gap-8 p-10">
					<h2 className="font-semibold text-xl">
						Récap' de votre commande
					</h2>
					<div className="flex justify-between font-bold">
						<p>Produit</p>
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
	);
};

export default Card;
