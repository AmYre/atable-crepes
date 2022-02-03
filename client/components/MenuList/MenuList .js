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
		<>
			<div className="shadow-xl m-2 my-2">
				<CrepesSucrees />
				<Boisson />
			</div>
		</>
	);
};

export default FoodAndDrink;
