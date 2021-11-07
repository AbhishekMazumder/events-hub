import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/EventItem.module.css';

const EventItem = ({ evnt }) => {
	return (
		<div className={styles.event}>
			<div className={styles.img}>
				<Image
					src={
						evnt.image
							? evnt.image.formats.thumbnail.url
							: '/images/event-default.png'
					}
					width={170}
					height={110}
				/>
			</div>
			<div className={styles.info}>
				<span>
					{new Date(evnt.date).toLocaleDateString('en-US')} at {evnt.time}
				</span>
				<h3>{evnt.name}</h3>
			</div>
			<div className={styles.link}>
				<Link href={`/events/${evnt.slug}`}>
					<a className="btn">Details</a>
				</Link>
			</div>
		</div>
	);
};

export default EventItem;
