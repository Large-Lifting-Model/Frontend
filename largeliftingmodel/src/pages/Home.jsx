import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppAPI from "../components/AppAPI";
import useLoader from "../hooks/useLoader";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
import AppNav from "../components/AppNav";
import Loader from "../components/Loader";
import styles from "./Home.module.css";

function Home({
	user,
	token,
	recommendation,
	setRecommendation,
	setWorkout,
	setWorkoutState,
}) {
	const { error, isLoading, withLoader } = useLoader();

	const [workoutExists, setWorkoutExists] = useLocalStorageState(
		false,
		"workoutExists"
	);
	const [suggestionHandled, setSuggestionHandled] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			let recommendationData = await AppAPI.get(
				"workout/recommendation",
				AppAPI.getDefaultHeaders(token)
			);
			// Remove the code block markers and parse the JSON string
			let recommendationString =
				recommendationData.id === null
					? recommendationData.recommendation
							.replace("[", "{")
							.replace("]", "}")
					: recommendationData.recommendation
							.replace(/```json|```/g, "")
							.trim();
			let parsedRecommendation;
			try {
				parsedRecommendation = JSON.parse(recommendationString);
			} catch (error) {
				parsedRecommendation = {};
			}

			recommendationData = {
				...recommendationData,
				recommendation: parsedRecommendation,
			};
			setRecommendation(recommendationData);
		};
		withLoader(async () => {
			await fetchData();
		});
	}, [token, withLoader, setRecommendation]);

	const handleSuggestionClick = () => {
		if (workoutExists) {
			const userConfirmed = window.confirm(
				"This will erase the current workout. Are you sure you want to proceed?"
			);
			if (!userConfirmed) {
				return;
			}
		}
		if (!recommendation.id) {
			navigate("/workout");
			return;
		}
		const workoutSuggestionObj = {
			length: recommendation?.recommendation?.parameters?.length,
			difficulty: AppAPI.emptyWorkout.difficulty,
			workout_type: recommendation?.recommendation?.parameters?.workout_type,
			equipment_access: AppAPI.emptyWorkout.equipment_access,
			target_area: recommendation?.recommendation?.parameters?.target_area,
			included_exercises: AppAPI.emptyWorkout.included_exercises,
			excluded_exercises: AppAPI.emptyWorkout.excluded_exercises,
			other_workout_considerations:
				AppAPI.emptyWorkout.other_workout_considerations,
		};
		// Update all states in sequence

		setWorkout(workoutSuggestionObj);
		setWorkoutExists(false);
		setWorkoutState(0);
		setSuggestionHandled(true);
	};

	useEffect(() => {
		if (suggestionHandled) {
			navigate("/workout");
		}
	}, [suggestionHandled, navigate]);

	return (
		<main className={styles.home}>
			<AppNav />
			<Loader error={error} isLoading={isLoading}>
				<section>
					<h1>Welcome, {user.first_name}</h1>
					<p>Here&apos;s a workout suggestion for you:</p>
					<p className={styles.suggestion} onClick={handleSuggestionClick}>
						{recommendation?.recommendation?.recommendation}
					</p>

					<div className={styles.links}>
						<Link to="/workout" className="cta">
							Custom Workout
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
