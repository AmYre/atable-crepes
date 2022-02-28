import Link from 'next/link';
import { useRouter } from 'next/router';
import { NavBarData } from './NavBarData';

const NavListDesk = () => {
	const router = useRouter();

	return (
		<div className={`flex items-center flex-row font-bold`}>
			{NavBarData.map((item) => (
				<Link href={`/${item.link}`}>
					<a
						className={
							router.pathname == item.link
								? 'text-red-500 hover:bg-red-500 hover:text-white rounded-lg py-2 px-4 transition duration-200'
								: 'text-black hover:bg-black hover:text-white rounded-lg py-2 px-4 transition duration-200'
						}
					>
						{item.title}
					</a>
				</Link>
			))}
		</div>
	);
};

export default NavListDesk;
