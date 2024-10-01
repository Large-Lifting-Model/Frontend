import PageNav from "../components/PageNav";
import styles from "./Landing.module.css";

function Landing() {
	return (
		<main className={styles.landing}>
			<PageNav />
			<div>Landing</div>
		</main>
	);
}

export default Landing;
