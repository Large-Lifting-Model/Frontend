import { Link } from "react-router-dom";
import PageNav from "../components/PageNav";
import styles from "./PageNotFound.module.css";

function PageNotFound({ token }) {
	return (
		<main className={styles.pagenotfound}>
			<PageNav />
			<section>
				<img
					src="/sorry.jpeg"
					alt="Sorry"
					className={styles.pagenotfound}
					data-style="sorryImage"
				/>
				<h2>
					<br />
					Sorry, that page does not exist...
				</h2>
				{token ? (
					<Link to="/home" className="cta">
						Go to Home
					</Link>
				) : (
					<Link to="/" className="cta">
						Go to Main
					</Link>
				)}
			</section>
		</main>
	);
}

export default PageNotFound;
