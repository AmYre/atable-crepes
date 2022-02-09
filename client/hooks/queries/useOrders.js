import { useQuery, gql } from '@apollo/client';

export const GET_ORDER = gql`
	query getOrders {
		commandes {
			data {
				id
				attributes {
					order_id
					is_prepared
					confirm_order
					total
					products {
						id
						quantity
						product_name
						category_name
						price
						supplement_list {
							id
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
