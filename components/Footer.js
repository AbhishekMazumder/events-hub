import Link from 'next/link';
import styles from '../styles/Footer.module.css';

const Footer = () => {
	return (
		<footer className={styles.footer}>
			<p>Copyright &copy; Events-Hub 2021</p>
			<Link href="/about">About Us</Link>
		</footer>
	);
};

export default Footer;
