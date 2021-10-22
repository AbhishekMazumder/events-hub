import Head from 'next/head';
import Header from './Header';
import styles from '../styles/Layout.module.css';
import Footer from './Footer';

const Layout = ({ title, keywords, descriptipn, children }) => {
	return (
		<div>
			<Head>
				<title>{title}</title>
				<meta name="description" content={descriptipn} />
				<meta name="keywords" content={descriptipn} />
			</Head>
			<Header />
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
