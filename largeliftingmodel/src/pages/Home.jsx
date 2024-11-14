import AppNav from "../components/AppNav";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import AppAPI from "../components/AppAPI";
import Loader from "../components/Loader";
import useLoader from "../hooks/useLoader";
//import {useNavigate} from "react-router-dom"

// const dummyUsername = "<username>";

// const dummySuggestion = "<Suggested workout from LLM>";

//Will need api call for the suggested workout

function Home({ token, setToken }) {
	const [username, setUsername] = useState("");
	const [suggestion, setSuggestion] = useState("");
	const { error, isLoading, withLoader } = useLoader();

	//const navigate = useNavigate();

	useEffect(() => {
		// setUsername(dummyUsername); // replace with API data
		// setSuggestion(dummySuggestion); // replace with API data


		const fetchData = async () => {
			await withLoader(async () => {
				const userData = await AppAPI.get("/users/profile", AppAPI.getDefaultHeaders(token));
				setUsername(userData?.first_name || "User");

				const workoutData = await AppAPI.get("/workout/recommendation", AppAPI.getDefaultHeaders(token));
				// let recommendationText = workoutData.recommendation;

        // Remove markdown code block syntax (```json\n at the start and ``` at the end)
        // recommendationText = recommendationText.replace(/^```json\n/, '').replace(/```$/, '');
				// console.log(recommendationText)

        // Parse the cleaned JSON string
				console.log(workoutData.recommendation)
        const parsedData = JSON.parse(workoutData);
        setSuggestion(parsedData.recommendation);
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
