import { gql } from '@apollo/client';

export const CREATE_ORDER = gql`
	mutation createCommande(
		$order_id: Int
		$total: Float
		$confirm_order: Boolean
	) {
		createCommande(
			data: {
				order_id: $order_id
				total: $total
				confirm_order: $confirm_order
			}
		) {
			data {
				attributes {
					order_id
					total
					confirm_order
					# products {
					# 	product_name
					# 	client_name
					# 	quantity
					# 	price
					# }
				}
			}
		}
	}
`;
