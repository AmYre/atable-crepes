import { useQuery, gql } from '@apollo/client';

export const GET_ORDER = gql`
	query getOrders {
		commandes {
			data {
				id
				attributes {
					order_id
					confirm_order
					total
					products {
						quantity
						product_name
						category_name
						price
						supplement_list {
							name
							price
						}
					}
				}
			}
		}
	}
`;

export const useOrders = () => {
	const { loading, error, data, refetch } = useQuery(GET_ORDER);
	return { loading, error, data, refetch };
};
