import { useQuery, gql } from '@apollo/client';

const GET_PRODUCTS = gql`
	{
		crepesSucrees {
			data {
				attributes {
					category_name
					price_id
					price
					product_name
					preparation_time
					image {
						data {
							attributes {
								url
								width
								height
							}
						}
					}
				}
			}
		}
		boissons {
			data {
				attributes {
					category_name
					price_id
					product_name
					price
					image {
						data {
							attributes {
								url
								width
								height
							}
						}
					}
				}
			}
		}
		supplements {
			data {
				attributes {
					price_id
					name
					price
				}
			}
		}
	}
`;

export const useMenuList = () => {
	const { loading, error, data } = useQuery(GET_PRODUCTS);
	return { loading, error, data };
};
