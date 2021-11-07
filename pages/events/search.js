import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { API_URL } from '@/config/index';
import EventItem from '@/components/EventItem';
import qs from 'qs';

export default function SearchPage({ events }) {
	const router = useRouter();
	return (
		<Layout title="search results">
      <Link href="/">Go Back</Link>
			<h1>Search Results For: {router.query.term}</h1>
			{events.length === 0 && <h3>No Events to show!</h3>}

			{events.map(evnt => (
				<EventItem key={evnt.id} evnt={evnt} />
			))}
		</Layout>
	);
}

export async function getServerSideProps({ query: { term } }) {
	const query = qs.stringify({
		_where: {
			_or: [
				{ name_contains: term },
				{ performers_contains: term },
				{ description_contains: term },
				{ venue: term },
			],
		},
	});

	const res = await fetch(`${API_URL}/events?${query}`);
	const events = await res.json();

	return {
		props: { events },
	};
}
