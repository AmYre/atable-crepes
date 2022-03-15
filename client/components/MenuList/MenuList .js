import CrepesSucrees from './CrepesSucrees';
import { css } from '@emotion/react';
import BounceLoader from 'react-spinners/BounceLoader';
import { useMenuList } from '../../hooks/queries/useMenuList';
import Boisson from './Boisson';

const FoodAndDrink = ({ data }) => {
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
			<h3 className="p-5 text-center text-xl font-bold">
				FAITES VOTRE CHOIX
			</h3>
			<div className="h-96 mx-5 mt-2 mb-5 bg-white dark:bg-gray-800 shadow-md overflow-hidden overflow-y-scroll">
				<div className="m-3 my-2 p-2 bg-white dark:bg-gray-800">
					<CrepesSucrees data={data} />
					<Boisson data={data} />
				</div>
			</div>
		</div>
	);
};

export default FoodAndDrink;
