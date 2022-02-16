import React from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { useGlobalContext } from '../context/Context';

const Result = () => {
	const { productsList } = useGlobalContext();
	const router = useRouter();

	// console.log(productsList);

	const { data, error } = useSWR(
		router.query.session_id ? `/api/${router.query.session_id}` : null,
		(url) =>
			fetch(url)
				.then((res) => res.json())
				.catch((err) => console.log(err.message))
	);
	console.log(data);
	// data const { session } = data;

	return (
		<>
			{data ? (
				<div>
					<h1>
						Payment Result {data?.session.payment_intent.status}
					</h1>
					<p>Status: {data?.session.payment_status}</p>
					<p>Total: {data?.session.amount_total / 100} €</p>
					{/* <pre>
						{data ? JSON.stringify(data, null, 2) : 'Loading...'}
					</pre> */}
				</div>
			) : (
				'Loading'
			)}
		</>
	);
};

export default Result;
