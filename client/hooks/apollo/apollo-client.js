import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
	uri: `${process.env.NEXT_PUBLIC_HOST_STRAPI}/graphql`,
	cache: new InMemoryCache(),
});

export default client;
