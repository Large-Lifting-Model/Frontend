import { Link } from "react-router-dom";
import PageNav from "../components/PageNav";
import styles from "./PageNotFound.module.css";

function PageNotFound() {
	return (
		<main className={styles.pagenotfound}>
			<PageNav />
			<section>
				<img src="/sorry.jpeg" alt="Sorry" className={styles.pagenotfound} data-style="sorryImage" />
				<h2>
					<br />
					Sorry, that page does not exist...
				</h2>
				<Link to="/" className="cta">
					Go to Landing Page
				</Link>
			</section>
		</main>
	);


}

export default PageNotFound;
