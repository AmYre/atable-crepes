import Head from 'next/head';
import Cart from '../components/Cart.js';
import Crepes from '../components/Crepes';
import BottomBar from '../components/BottomBar';

export default function Home() {
	return (
		<>
			<Head>
				<title>A Vos Crêpes !</title>
				<link rel='icon' href='/favi.png' />
				<link rel='preconnect' href='https://fonts.gstatic.com' />
				<link href='https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200;0,300;0,400;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,600;1,700;1,800;1,900&display=swap' rel='stylesheet' />
				<link href='https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400;500;600;700&display=swap' rel='stylesheet' />
			</Head>
			<main className='font-comfortaa text-white h-screen flex flex-col justify-center items-center bg-home bg-cover'>
				<img src='/logo.png' className='absolute left-0 top-0 w-40 pl-4' />
				<Cart />
				<section>
					<Crepes />
				</section>
				<BottomBar />
			</main>
		</>
	);
}
