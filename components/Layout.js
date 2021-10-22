import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from './Header';
import Footer from './Footer';
import Hero from './Hero';
import styles from '../styles/Layout.module.css';

const Layout = ({ title, keywords, descriptipn, children }) => {
	const router = useRouter();
	return (
		<div>
			<Head>
				<title>{title}</title>
				<meta name="description" content={descriptipn} />
				<meta name="keywords" content={descriptipn} />
			</Head>
			<Header />
			{router.pathname === '/' && <Hero />}
			<div className={styles.container}>{children}</div>
			<Footer />
		</div>
	);
};

export default Layout;

Layout.defaultProps = {
	title: 'Events-Hub | Find the Hottest parties and Events',
	description: 'Find the latest and greatest events around you',
	keywords: 'music, party, dj, events, talkshow, meetups',
};
