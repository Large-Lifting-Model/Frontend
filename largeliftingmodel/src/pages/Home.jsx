import AppNav from "../components/AppNav";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
//import {useNavigate} from "react-router-dom"

const dummyUsername = "<username>";

const dummySuggestion = "<Suggested workout from LLM>";

//Will need api call for the suggested workout

function Home({ token, setToken }) {
	const [username, setUsername] = useState(dummyUsername);
	const [suggestion, setSuggestion] = useState(dummySuggestion);

	//const navigate = useNavigate();

	useEffect(() => {
		setUsername(dummyUsername); // replace with API data
		setSuggestion(dummySuggestion); // replace with API data
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
