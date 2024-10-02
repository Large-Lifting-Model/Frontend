import { Link } from "react-router-dom";
import PageNav from "../components/PageNav";
import styles from "./Landing.module.css";

function Landing() {
	return (
		<main className={styles.landing}>
			<PageNav />
			<section>
				<h1>
					<br />
					On Demand Customized Workouts
				</h1>
				<Link to="/Register" className="cta">
					Start Tracking Now
				</Link>
			</section>
		</main>
	);
}

export default Landing;
