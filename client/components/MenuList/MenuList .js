import CrepesSucrees from './CrepesSucrees';
import { css } from '@emotion/react';
import BounceLoader from 'react-spinners/BounceLoader';
import { useMenuList } from '../../hooks/queries/useMenuList';
import Boisson from './Boisson';
import { useOrders } from '../../hooks/queries/useOrders';
import { useEffect } from 'react';

const FoodAndDrink = () => {
	const { loading } = useMenuList();

	// const productsArray = data?.commandes.data.map(
	// 	(item) => item?.attributes.products
	// );

	// const mergedArray = [].concat.apply([], productsArray);

	// const categoryRequired = mergedArray.filter(
	// 	({ category_name }, i) => category_name === 'crepes sucree'
	// );

	// const waiting_time = data?.commandes.data
	// 	.filter((item) => item.attributes.is_prepared === false)
	// 	.reduce((a, b) => a + b.attributes.preparation_time, 0);

	if (loading)
		return (
			<BounceLoader
				loading={true}
				css={css`
					display: flex;
				`}
				size={50}
			/>
		);

	return (
		<div>
			<h3 className="p-5 text-center text-white text-xl font-bold">
				FAITES VOTRE CHOIX
			</h3>
			<div className="bg-white h-96 p-6 mx-5 mt-2 mb-5 shadow-md  overflow-hidden overflow-y-scroll">
				<div className="shadow-xl m-2 my-2">
					<CrepesSucrees />
					<Boisson />
				</div>
			</div>
		</div>
	);
};

export default FoodAndDrink;
