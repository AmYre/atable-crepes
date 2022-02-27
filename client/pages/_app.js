import Head from 'next/head';
import { ThemeProvider } from 'next-themes';
// import Navbar from '../components/navbar';
import { AppProvider } from '../context/Context';
import 'tailwindcss/tailwind.css';
import { ApolloProvider } from '@apollo/client';
import client from '../hooks/apollo/apollo-client';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
	return (
		<AppProvider>
			<ApolloProvider client={client}>
				<ThemeProvider attribute="class">
					<Component {...pageProps} />
				</ThemeProvider>
			</ApolloProvider>
		</AppProvider>
	);
}

export default MyApp;
