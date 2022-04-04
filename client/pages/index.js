import Head from 'next/head';
import Navbar from '../components/Navbar/Navbar';
import Homes from '../components/Home';

export default function Home() {
	return (
		<>
			<Head>
				<title>A Vos Crêpes !</title>
				<link rel='icon' href='/favi.png' />
				<link rel='preconnect' href='https://fonts.gstatic.com' />
				<link rel='preconnect' href='https://fonts.gstatic.com' />
				<link href='https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200;0,300;0,400;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,600;1,700;1,800;1,900&display=swap' rel='stylesheet' />
				<link href='https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400;500;600;700&display=swap' rel='stylesheet' />
			</Head>
			<Navbar />
			<main className='font-comfortaa text-white h-screen flex flex-col justify-center items-center'>
				<img
					src='/pancakes-2291908_1920.jpg'
					style={{
						position: 'absolute',
						zIndex: '-1',
						filter: 'brightness(0.8)',
					}}
				/>
				<div className='h-1/3 w-full flex flex-col justify-center items-center'>
					<h1 className='text-xl text-center md:text-2xl'>Bienvenue sur a Pomme de Pain - Crêpes</h1>
				</div>
				<section className='h-2/3 w-full flex flex-col justify-start items-center'></section>
			</main>
		</>
	);
}
