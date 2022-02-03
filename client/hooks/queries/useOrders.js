import { useQuery, gql } from '@apollo/client';

// export const GET_ORDER = gql`
// 	query getOrders {
// 		commandes {
// 			data {
// 				id
// 				attributes {
// 					table_number
// 					confirm_order
// 					client_name
// 					products {
// 						product_name
// 						client_name
// 						category_name
// 						price
// 						quantity
// 						id
// 						special_instruction
// 					}
// 				}
// 			}
// 		}
// 	}
// `;

// export const useOrders = () => {
// 	const { loading, error, data, refetch } = useQuery(GET_ORDER);
// 	return { loading, error, data, refetch };
// };
