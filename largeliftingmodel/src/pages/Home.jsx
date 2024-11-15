import AppNav from "../components/AppNav";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import AppAPI from "../components/AppAPI";
import useLoader from "../hooks/useLoader";
import Loader from "../components/Loader";

function Home({ user, token }) {
	const [suggestion, setSuggestion] = useState("");
	const { error, isLoading, withLoader } = useLoader();

	useEffect(() => {
		const fetchData = async () => {
			let workoutData = await AppAPI.get(
				"/workout/recommendation",
				AppAPI.getDefaultHeaders(token)
			);
			workoutData = {
				...workoutData,
				recommendation: JSON.parse(
					workoutData.recommendation.replace("[", "{").replace("]", "}")
				),
			};
			setSuggestion(workoutData.recommendation);
		};
		fetchData();
	}, [token]);

	return (
		<main className={styles.home}>
			<AppNav />
			<Loader error={error} isLoading={isLoading}>
				<section>
					<h1>Welcome, {user.first_name}</h1>

					<p className={styles.suggestion}>{suggestion.recommendation}</p>

					<div className={styles.links}>
						<Link to="/workout" className="cta">
							Create Workout
						</Link>
						<Link to="/history" className="cta">
							Past Workouts
						</Link>
						<Link to="/profile" className="cta">
							Profile
						</Link>
					</div>
				</section>
			</Loader>
		</main>
	);
}

export default Home;
