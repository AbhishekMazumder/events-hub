import { useRouter, Router } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { FaPencilAlt, FaTimes } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { API_URL } from '@/config/index';
import styles from '@/styles/Event.module.css';

import Layout from '../../components/Layout';

export default function SingleEventPage({ data }) {
	const router = useRouter();

	// deleting the event
	const deleteEvent = async e => {
		console.log('Delete');
		if (confirm('Are you sure?')) {
			const res = await fetch(`${API_URL}/events/${data.id}`, {
				method: 'DELETE',
			});
			const item = await res.json();

			if (!res.ok) {
				toast.error(item.message);
			} else {
				router.push('/events');
			}
		}
	};

	return (
		<Layout>
			<div className={styles.event}>
				<div className={styles.controls}>
					<Link href={`/events/edit/${data.id}`}>
						<a>
							<FaPencilAlt /> Edit Event
						</a>
					</Link>
					<a href="#" className={styles.delete} onClick={deleteEvent}>
						<FaTimes /> Delete Event
					</a>
				</div>

				<span>
					{new Date(data.date).toLocaleDateString('en-US')} at {data.time}
				</span>
				<h1>{data.name}</h1>
				<ToastContainer />
				{data.image && (
					<div className={styles.image}>
						<Image
							src={data.image.formats.medium.url}
							width={960}
							height={600}
						/>
					</div>
				)}
				<h3>Performers:</h3>
				<p>{data.performers}</p>
				<h3>Description:</h3>
				<p>{data.description}</p>
				<h3>Venue: {data.venue}</h3>
				<p>{data.address}</p>

				<Link href="/events">
					<a className={styles.back}>{'<'} Go Back</a>
				</Link>
			</div>
		</Layout>
	);
}

// export async function getServerSideProps({ query: { slug } }) {
// 	const res = await fetch(`${API_URL}/api/events/${slug}`);
// 	const data = await res.json();

// 	return {
// 		props: { data: data[0] },
// 	};
// }

export async function getStaticPaths() {
	const res = await fetch(`${API_URL}/events`);
	const data = await res.json();

	const paths = data.map(evnt => ({ params: { slug: evnt.slug } }));
	return {
		paths,
		fallback: true,
	};
}

export async function getStaticProps({ params: { slug } }) {
	const res = await fetch(`${API_URL}/events?slug=${slug}`);
	const data = await res.json();

	return {
		props: { data: data[0] },
		revalidate: 1,
	};
}
