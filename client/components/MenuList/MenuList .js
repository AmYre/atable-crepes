import CrepesSucrees from './CrepesSucrees';
import { css } from '@emotion/react';
import BounceLoader from 'react-spinners/BounceLoader';
import { useMenuList } from '../../hooks/queries/useMenuList';
import Boisson from './Boisson';

const FoodAndDrink = () => {
	const { loading } = useMenuList();

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
			<div className="bg-gray-100 h-96 p-6 mx-5 mt-2 mb-5 shadow-md overflow-hidden overflow-y-scroll">
				<div className="m-3 my-2 p-2 bg-white shadow-md">
					<CrepesSucrees />
					<Boisson />
				</div>
			</div>
		</div>
	);
};

export default FoodAndDrink;
