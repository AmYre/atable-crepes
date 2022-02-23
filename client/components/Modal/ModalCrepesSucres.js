import { useGlobalContext } from '../../context/Context';
import Image from 'next/image';
import { useState } from 'react';
import { useMenuList } from '../../hooks/queries/useMenuList';
import SupplementDetail from '../MenuList/SupplementDetail';
import { PlusIcon } from '@heroicons/react/solid';

const ModalCrepesSucrees = ({
	product_name,
	price,
	category_name,
	url,
	preparation_time,
	width,
	height,
	i,
}) => {
	const [modal, setModal] = useState(false);
	const [inputQuantity, setInputQuantity] = useState(1);

	const {
		productsList,
		setProductsList,
		randomNumber,
		supplementList,
		setSupplementList,
		preparationTime,
		setPreparationTime,
	} = useGlobalContext();

	const { data } = useMenuList();

	const totalSupplement = Number(
		supplementList.reduce((a, b) => a + b.price, 0).toFixed(2)
	);
	// const totalSup = data?.supplements.data.map(
	// 	({ id, attributes: { name, price } }) => price
	// );
	// console.log(Number(totalSupplement.toFixed(2)) + Number(totalSup[0]));

	const myLoader = ({ src, width, quality }) => {
		return `http://localhost:1337${src}?w=${width}&q=${quality || 75}`;
	};
	// console.log(preparationTime);
	return (
		<div className={`flex items-center border-t-2 z-50 hover:bg-gray-100`}>
			<div
				className={`${
					modal
						? 'flex items-center justify-center z-10 bg-white bg-opacity-70 h-screen w-full fixed bottom-0 left-0'
						: 'hidden '
				}`}
			>
				<div className="bg-white py-0 rounded w-full sm:w-2/3 md:w-1/2">
					<div className="w-full h-screen py-10 px-3 bg-gray-100 relative">
						<Image
							loader={myLoader}
							src={url}
							layout="responsive"
							width={370}
							height={180}
							alt={product_name}
							className="object-contain"
						/>
						<p className="text-xl font-bold mt-5">{product_name}</p>

						<span className="text-xl font-bold mt-5">
							Supplement
						</span>

						<div className="h-36 w-full bg-white p-3 mt-2 mb-5 shadow border rounded ring-blue-600 outline-none focus:ring-2 overflow-hidden overflow-y-scroll">
							{data?.supplements.data.map(
								(
									{ id, attributes: { name, price } },
									index
								) => (
									<SupplementDetail
										name={name}
										price={price}
										index={index}
										key={index}
										id={id}
										modal={modal}
									/>
								)
							)}
						</div>
						<div className="absolute bottom-0 left-0 w-full">
							<button
								className="w-full text-bold bg-blue-600 text-white text-xl px-3 py-5"
								onClick={() => {
									setProductsList([
										...productsList,
										{
											product_name: product_name,
											category_name: category_name,
											price: price,
											supplement_list: supplementList,
											quantity: Number(inputQuantity),
											product_id: randomNumber,
										},
									]);
									setPreparationTime([
										...preparationTime,
										Number(preparation_time.slice(4, 5)),
									]);
									setModal(!modal);
									setSupplementList([]);
								}}
							>
								Ajouter aux panier
							</button>
						</div>

						<div className="flex justify-between">
							<button
								className="text-bold"
								onClick={() => {
									setModal(!modal);
									setSupplementList([]);
								}}
							>
								Fermé
							</button>
							<p className="text-xl font-bold">
								{Number(price + totalSupplement).toFixed(2)} €{' '}
							</p>
						</div>
					</div>
				</div>
			</div>
			<Image
				loader={myLoader}
				src={url}
				width={100}
				height={100}
				alt={product_name}
				className="object-contain"
			/>

			<div className="flex justify-between w-full p-2">
				<p className="text-lg font-bold">{product_name}</p>
				<div className="flex space-x-2">
					<p className="text-lg font-bold">{price.toFixed(2)} € </p>
				</div>
			</div>
			<PlusIcon
				onClick={() => {
					setModal(!modal);
				}}
				className="w-8 h-8 cursor-pointer"
			/>
			{/* <button
				onClick={() => {
					setModal(!modal);
				}}
				className="w-6 cursor-pointer"
			>
				Choisir
			</button> */}
		</div>
	);
};

export default ModalCrepesSucrees;
