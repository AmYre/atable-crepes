import { gql } from '@apollo/client';

export const CREATE_ORDER = gql`
	mutation createCommande(
		$table_number: Int
		$client_name: String
		$table_token: String
		$confirm_order: Boolean
	) {
		createCommande(
			data: {
				table_number: $table_number
				client_name: $client_name
				table_token: $table_token
				confirm_order: $confirm_order
			}
		) {
			data {
				attributes {
					table_number
					client_name
					products {
						product_name
						client_name
						quantity
						price
					}
				}
			}
		}
	}
`;
