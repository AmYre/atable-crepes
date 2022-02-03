import { useMenuList } from '../../hooks/queries/useMenuList';
import ModalCrepesSucrees from '../Modal/ModalCrepesSucres';

const CrepesSucrees = () => {
	const { data } = useMenuList();
	// console.log('first');
	return (
		<div>
			<h2 className="text-center text-xl font-bold mb-3">
				Crepes Sucrée
			</h2>
			<div>
				{data?.crepesSucrees.data.map(
					(
						{
							attributes: {
								product_name,
								price,
								category_name,
								image: {
									data: {
										attributes: { url, width, height },
									},
								},
							},
						},
						i
					) => (
						<ModalCrepesSucrees
							product_name={product_name}
							price={price}
							category_name={category_name}
							url={url}
							width={width}
							height={height}
							i={i}
							key={i}
						/>
					)
				)}
			</div>
		</div>
	);
};

export default CrepesSucrees;
