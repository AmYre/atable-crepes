import Image from 'next/image';
import {
	MenuIcon,
	MoonIcon,
	ShoppingBagIcon,
	SunIcon,
} from '@heroicons/react/solid';
import { useGlobalContext } from '../context/Context';
import { useRouter } from 'next/router';
import { useOrders } from '../hooks/queries/useOrders';
import { useEffect, useState } from 'react';
import NavListMobi from './NavListMobi';
import Link from 'next/link';
import NavListDesk from './NavListDesk';

export const Navbar = () => {
	const router = useRouter();
	const { productsList, theme, setTheme } = useGlobalContext();
	const { data, refetch } = useOrders();
	const [active, setActive] = useState(false);
	// const cardLength = productsList.reduce((a, b) => a + b.quantity * 1, 0);

	useEffect(() => {
		setInterval(() => {
			const timer = refetch();
			return clearInterval(timer);
		}, 10000);
	}, []);

	const isPreparedOrder = data?.commandes.data.filter(
		({ attributes: { is_prepared } }) => is_prepared === false // Get the length of the unprepared order
	);

	const handleClick = () => {
		setActive(!active);
	};

	return (
		<header
			className={`flex bg-white ${
				theme && 'bg-gray-600 text-gray-100'
			} justify-between px-7  items-center shadow-md h-20`}
		>
			<div className="relative flex items-center h-10 cursor-pointer my-auto">
				<a href="/">
					<Image
						src="/logo.png"
						alt="logo"
						objectFit="contain"
						objectPosition="left"
						width={100}
						height={'80%'}
					/>
				</a>
			</div>
			<nav
				// onClick={() => setActive(false)}
				className={`md:flex md:gap-3 font-bold transition duration-500 ease-in-out delay-150 dark:bg-grey-600 ${
					active
						? 'translate-x-0 md:hidden fixed top-0 right-0 h-full w-3/4 flex items-center flex-col bg-white'
						: 'translate-x-full fixed top-0 right-0 h-full w-3/4 flex items-center flex-col bg-white'
				}`}
			>
				<div className="flex justify-between w-full items-center px-7">
					<a href="/" className="md:hidden">
						<Image
							src="/logo.png"
							alt="logo"
							objectFit="contain"
							objectPosition="left"
							width={100}
							height={'80%'}
						/>
					</a>

					<h2 className="text-sm font-light md:hidden">
						{isPreparedOrder?.length} Commande en cours ...
					</h2>
					<div className="md:hidden">
						<MenuIcon
							onClick={handleClick}
							className="w-8 h-8 hover:scale-105"
						/>
					</div>
				</div>
				<div className="my-auto">
					<div>
						<NavListMobi />
					</div>
				</div>
			</nav>
			<div className="hidden md:flex">
				<NavListDesk />
				<h2 className="text-sm">
					{isPreparedOrder?.length} Commande en cours ...
				</h2>
			</div>
			{/* <div>
				<a href="/login">Connexion</a>
			</div> */}
			{/* <div onClick={() => setTheme(!theme)}>
				{theme ? (
					<SunIcon className="w-6" />
				) : (
					<MoonIcon className="w-6" />
				)}
			</div> */}
			<div className="md:hidden cursor-pointer">
				<MenuIcon onClick={handleClick} className="w-8 h-8" />
			</div>
		</header>
	);
};
