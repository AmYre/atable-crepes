import Link from 'next/link';
import { useRouter } from 'next/router';

const NavListMobi = ({ active }) => {
	const router = useRouter();

	return (
		<div className={`flex items-center flex-col font-bold space-y-14`}>
			<Link href="/">
				<a
					className={
						router.pathname == '/'
							? 'text-red-500 hover:bg-red-500 hover:text-white rounded-3xl py-2 px-4 transition duration-200'
							: 'text-black hover:bg-black hover:text-white rounded-3xl py-2 px-4 transition duration-200'
					}
				>
					Acceuil
				</a>
			</Link>
			<Link href="/menu">
				<a
					className={
						router.pathname == '/menu'
							? 'text-red-500 hover:bg-red-500 hover:text-white rounded-3xl py-2 px-4 transition duration-200'
							: 'text-black hover:bg-black hover:text-white rounded-3xl py-2 px-4 transition duration-200'
					}
				>
					Menu
				</a>
			</Link>
			<Link href="/contact">
				<a
					className={
						router.pathname == '/contact'
							? 'text-red-500 hover:bg-red-500 hover:text-white rounded-3xl py-2 px-4 transition duration-200'
							: 'text-black hover:bg-black hover:text-white rounded-3xl py-2 px-4 transition duration-200'
					}
				>
					Contact
				</a>
			</Link>
			<Link href="/login">
				<a
					className={
						router.pathname == '/login'
							? 'text-red-500 hover:bg-red-500 hover:text-white rounded-3xl py-2 px-4 transition duration-200'
							: 'text-black hover:bg-black hover:text-white rounded-3xl py-2 px-4 transition duration-200'
					}
				>
					Connexion
				</a>
			</Link>
		</div>
	);
};

export default NavListMobi;
