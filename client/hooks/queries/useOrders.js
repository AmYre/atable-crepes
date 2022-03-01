import { useQuery, gql } from '@apollo/client';

export const GET_ORDER = gql`
	query getOrders {
		commandes(sort: "updatedAt") {
			data {
				id
				attributes {
					order_id
					is_prepared
					is_payed
					preparation_time
					total
					updatedAt
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
