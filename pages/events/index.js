import Link from 'next/link';
import Layout from '@/components/Layout';
import { API_URL } from '@/config/index';
import EventItem from '@/components/EventItem';

const PER_PAGE = 2;

export default function EventsPage({ events, page, total }) {
	const lastPage = Math.ceil(total / PER_PAGE);
	return (
		<Layout>
			<h1>All Events</h1>
			{events.length === 0 && <h3>No Events to show!</h3>}

			{events.map(evnt => (
				<EventItem key={evnt.id} evnt={evnt} />
			))}

			{page > 1 && (
				<Link href={`/events?page=${page - 1}`}>
					<a className="btn-secondary">Prev</a>
				</Link>
			)}

			{page < lastPage && (
				<Link href={`/events?page=${page + 1}`}>
					<a className="btn-secondary">Next</a>
				</Link>
			)}
		</Layout>
	);
}

export async function getServerSideProps({ query: { page = 1 } }) {
	// CALCULATE START PAGE
	const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE;

	// FETCH TOTAL/COUNT EVENTS
	const countRes = await fetch(`${API_URL}/events/count`);
	const eventsCount = await countRes.json();

	// FETCH EVENTS
	const res = await fetch(
		`${API_URL}/events?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`
	);
	const events = await res.json();

	return {
		props: { events, page: +page, total: eventsCount },
	};
}
