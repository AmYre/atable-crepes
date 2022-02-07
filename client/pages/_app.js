import Head from 'next/head';
import { ThemeProvider } from 'next-themes';
import Navbar from '../components/navbar';
import { AppProvider } from '../context/Context';
import 'tailwindcss/tailwind.css';
import { ApolloProvider } from '@apollo/client';
import client from '../hooks/apollo/apollo-client';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
	return (
		<AppProvider>
			<ApolloProvider client={client}>
				<Navbar />
				<Head>
					<title>@ Table Crépes!</title>
					<link rel="icon" href="/favi.png" />
					<link rel="preconnect" href="https://fonts.gstatic.com" />
					<link rel="preconnect" href="https://fonts.gstatic.com" />
					<link
						href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200;0,300;0,400;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,600;1,700;1,800;1,900&display=swap"
						rel="stylesheet"
					/>
					<link
						href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400;500;600;700&display=swap"
						rel="stylesheet"
					/>
				</Head>
				<ThemeProvider attribute="class">
					<Component {...pageProps} />
				</ThemeProvider>
			</ApolloProvider>
		</AppProvider>
	);
}

export default MyApp;
