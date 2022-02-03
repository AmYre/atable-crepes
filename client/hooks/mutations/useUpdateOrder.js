import { gql } from '@apollo/client';

export const UPDATE_ORDER = gql`
	mutation updateCommande(
		$id: ID!
		$confirm_order: Boolean
		$products: [ComponentProductNameProductListInput]
	) {
		updateCommande(
			id: $id
			data: { confirm_order: $confirm_order, products: $products }
		) {
			data {
				attributes {
					confirm_order
					products {
						product_name
						client_name
						category_name
						price
						quantity
						special_instruction
					}
				}
			}
		}
	}
`;
