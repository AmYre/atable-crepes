import { useState } from 'react';
import { useGlobalContext } from '../../context/Context';

const SupplementDetail = ({ name, price, index }) => {
	const {
		supplementPrice,
		setSupplementPrice,
		supplementName,
		setSupplementName,
	} = useGlobalContext();
	const [activeTab, setActiveTab] = useState(false);

	return (
		<div
			className={`flex items-center h-5 py-5 border-b-2 ${
				activeTab && 'bg-blue-300'
			}`}
			key={index}
		>
			<label
				// htmlFor={`${name} ${product_name}`}
				className={`flex w-full justify-between`}
			>
				<span className="ml-3 text-sm sm:text-sm lg:text-base font-medium text-black cursor-pointer">
					{name}
				</span>{' '}
				<span className="ml-3 text-sm lg:text-base font-bold text-black cursor-pointer">
					{price} €
				</span>
			</label>
			<button
				onClick={() => {
					setActiveTab(!activeTab);
					setSupplementName([...supplementName, name]);
					setSupplementPrice([...supplementPrice, price]);
				}}
			>
				Add
			</button>
		</div>
	);
};

export default SupplementDetail;
