import React, { useState, createContext, useContext } from 'react';

const AppContext = createContext();

const AppProvider = ({ children }) => {
	const [step, setStep] = useState('clients');
	const [clients, setClients] = useState([]);
	const [customer, setCustomer] = useState([]);
	const [productsList, setProductsList] = useState([]);
	const [quantity, setQuantity] = useState(1);
	const [activeTab, setActiveTab] = useState(0);
	const [name, setName] = useState('');
	const [theme, setTheme] = useState(false);
	const [supplementName, setSupplementName] = useState([]);
	const [supplementPrice, setSupplementPrice] = useState([]);

	const randomNumber = Math.floor(Math.random() * 100000 + 1);

	return (
		<AppContext.Provider
			value={{
				clients,
				setClients,
				customer,
				setCustomer,
				activeTab,
				setActiveTab,
				name,
				setName,
				productsList,
				setProductsList,
				step,
				setStep,
				quantity,
				setQuantity,
				randomNumber,
				theme,
				setTheme,
				supplementName,
				setSupplementName,
				supplementPrice,
				setSupplementPrice,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

const useGlobalContext = () => {
	return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };
