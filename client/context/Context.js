import React, { useState, createContext, useContext } from 'react';

const AppContext = createContext();

const AppProvider = ({ children }) => {
	const [firstStep, setFirstStep] = useState(false);
	const [secondStep, setSecondStep] = useState(false);
	const [productsList, setProductsList] = useState([]);
	const [quantity, setQuantity] = useState(1);
	const [theme, setTheme] = useState(false);
	const [supplementList, setSupplementList] = useState([]);

	const randomNumber = Math.floor(Math.random() * 100000 + 1);

	return (
		<AppContext.Provider
			value={{
				productsList,
				setProductsList,
				firstStep,
				setFirstStep,
				secondStep,
				setSecondStep,
				quantity,
				setQuantity,
				randomNumber,
				theme,
				setTheme,
				supplementList,
				setSupplementList,
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
