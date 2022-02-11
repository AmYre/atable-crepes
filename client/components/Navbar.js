import Image from 'next/image';
import { MoonIcon, ShoppingBagIcon, SunIcon } from '@heroicons/react/solid';
import { useGlobalContext } from '../context/Context';
import Link from 'next/link';
import { useOrders } from '../hooks/queries/useOrders';
import { useEffect } from 'react';

const Navbar = () => {
	const { productsList, theme, setTheme } = useGlobalContext();
	const { data, refetch } = useOrders();
	const cardLength = productsList.reduce((a, b) => a + b.quantity * 1, 0);

	useEffect(() => {
		setInterval(() => {
			const timer = refetch();
			return clearInterval(timer);
		}, 10000);
	}, []);

	const isPreparedOrder = data?.commandes.data.filter(
		({ attributes: { is_prepared } }) => is_prepared === false
	);

	return (
		<div
			className={`flex ${
				theme && 'bg-gray-600 text-gray-100'
			} justify-around items-center shadow-md h-20 `}
		>
			<a href="/">
				<Image src="/logo.png" alt="logo" width={150} height={'80%'} />
			</a>
			<nav className="flex gap-3 dark:bg-grey-600">
				<div>Contact</div>
				<div>Menus</div>
				<div>{isPreparedOrder?.length - 1} Commande en cours ...</div>
			</nav>
			<div>
				<a href="/login">Connexion</a>
			</div>
			<div className="relative">
				<ShoppingBagIcon className="w-6 cursor-pointer absolute right-0 top-0" />
				<Link href="/card">
					<a className="absolute left-0 bottom-0 text-white p-2 bg-red-600 rounded-full">
						{cardLength}
					</a>
				</Link>
			</div>
			<div onClick={() => setTheme(!theme)}>
				{theme ? (
					<SunIcon className="w-6" />
				) : (
					<MoonIcon className="w-6" />
				)}
			</div>
		</div>
	);
};

export default Navbar;
