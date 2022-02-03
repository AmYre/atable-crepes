import { useState } from 'react';
import { useGlobalContext } from '../context/Context';
import MenuList from './MenuList/MenuList ';

const Tabs = () => {
	const { clients, activeTab, setActiveTab, setQuantity } =
		useGlobalContext();
	const clientName = clients.map((clientName, index) => {
		return { name: clientName, id: index };
	});

	const tabClick = (id) => {
		activeTab !== id ? setActiveTab(id) : setActiveTab(null);
	};

	return (
		<div className="w-full flex flex-col">
			<ul className="flex bg-transparent m-auto">
				{clientName.map((tab) => (
					<li key={tab.id}>
						<a
							className={`inline-block py-2 px-4 ${
								activeTab == tab.id
									? 'font-bold bg-white '
									: 'bg-gray-200'
							}`}
							href="#"
							title={tab.name}
							onClick={() => {
								tabClick(tab.id);
								setQuantity(1);
							}}
						>
							{tab.name}
						</a>
					</li>
				))}
			</ul>
			<div
				className={`h-96 p-6 mx-5 shadow-md  overflow-hidden overflow-y-scroll ${
					activeTab != null ? 'bg-white' : 'bg-yellow-500'
				}`}
			>
				<div>
					<MenuList />
				</div>
			</div>
		</div>
	);
};

export default Tabs;
