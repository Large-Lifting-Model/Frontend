import AppNav from "../components/AppNav";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import AppAPI from "../components/AppAPI";
import useLoader from "../hooks/useLoader";

function Home({ token, setToken }) {
	const [username, setUsername] = useState("");
	const [suggestion, setSuggestion] = useState("");
	const { error, isLoading, withLoader } = useLoader();

	useEffect(() => {
		const fetchData = async () => {
			await withLoader(async () => {
				const userData = await AppAPI.get("/users/profile", AppAPI.getDefaultHeaders(token));

				setUsername(userData?.first_name || "User");

				const workoutData = await AppAPI.get("/workout/recommendation", AppAPI.getDefaultHeaders(token));
				console.log(workoutData.recommendation)
				console.info("WORKOUTDATA:" + JSON.stringify(workoutData))
				const workoutDataRecommendationJSONString = workoutData.recommendation
				const workoutDataRecommendationList = AppAPI.extractJSON(workoutDataRecommendationJSONString)
				if (workoutDataRecommendationList.length > 0) {
					const workoutDataRecommendation = workoutDataRecommendationList[workoutDataRecommendationList.length - 1]
					const workoutDataRecommendationParameters = workoutDataRecommendation.parameters
					console.info("WORKOUTDATA_LAST_RECOMMENDATION: " + JSON.stringify(workoutDataRecommendation))
					console.info("WORKOUTDATA_LAST_RECOMMENDATION_PARAMETERS: " + JSON.stringify(workoutDataRecommendationParameters))
				}
				setSuggestion(workoutDataRecommendation);
			});
		};
		fetchData();
	}, []);

	return (
		<main className={styles.home}>
			<AppNav />
			<section>
				<h1>Welcome, {username}</h1>

				<p className={styles.suggestion}>{suggestion}</p>

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
		</main>
	);
}

export default Home;
