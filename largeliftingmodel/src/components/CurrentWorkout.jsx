import styles from "./CurrentWorkout.module.css";
import buttonStyles from "../components/Button.module.css";
import { useEffect, useState } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
import AppAPI from "../components/AppAPI"
import Loader from "../components/Loader";
import useLoader from "../hooks/useLoader";

function CurrentWorkout({ setWorkoutState, workout, setWorkout }) {
	const { error, isLoading, withLoader } = useLoader();

	const [completionStatus, setCompletionStatus] = useLocalStorageState(
		new Array(AppAPI.parseSuggestedWorkout(workout).length).fill(false),
		"completionStatus"
	);
	const [refinement, setRefinement] = useState("");

	const [suggestedWorkout, setSuggestedWorkout] = useState(AppAPI.parseSuggestedWorkout(workout))

	useEffect(() => {
		//console.info("CurrentWorkoutUSEEFFECT with suggestedWorkout" + JSON.stringify(suggestedWorkout))
		setCompletionStatus((prevStatus) => {
			return prevStatus.length === suggestedWorkout.length ? prevStatus : 
						 new Array(suggestedWorkout.length).fill(false);
		})
	}, [setCompletionStatus]);

	const toggleCompletion = (index) => {
		const updatedStatus = [...completionStatus];
		updatedStatus[index] = !updatedStatus[index];
		setCompletionStatus(updatedStatus);
	}

	const handleFinished = () => {
		setWorkoutState(2);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		await withLoader(async () => {
			const refinedWorkout = await AppAPI.refineWorkout(workout, refinement)
			reactToUpdatedWorkout(refinedWorkout)
		})
	};

	const reactToUpdatedWorkout = (updatedWorkout) => {
		const updatedSuggestedWorkout = AppAPI.parseSuggestedWorkout(updatedWorkout)
		//console.info("UPDATE to SUGGESTED WORKOUT: \n " + JSON.stringify(updatedSuggestedWorkout))
		setWorkout(updatedWorkout)
		setSuggestedWorkout(updatedSuggestedWorkout)
		setCompletionStatus((prevStatus) => {
			return prevStatus.length === updatedSuggestedWorkout.length ? prevStatus : 
						 new Array(updatedSuggestedWorkout.length).fill(false);
		})
		setRefinement("");
	}

	return (
		<Loader error={error} isLoading={isLoading}>
			<main className={styles.workout}>
				<section className={styles.workoutContainer}>
					<div className={styles.exerciseList}>
					<h2 className={styles.title}>Exercises</h2>
						{suggestedWorkout && suggestedWorkout.length > 0 ? (
							suggestedWorkout.map((item, index) => (
								<div key={index} className={`${styles.exerciseCard} ${completionStatus[index] ? styles.completedExercise : ""}`}>
									<div className={styles.exerciseHeader}>
										<span className={styles.exerciseNumber}>{item.exercise.name}</span>
										<span className={styles.exerciseType}>{item.exercise.type}</span>
									</div>
									<div className={styles.exerciseInfo}>{item.exercise.info}</div>
								</div>
							))
						) : (
							<p>Loading workout...</p>
						)}
					</div>
					<div className={styles.completedColumn}>
						<h3 className={styles.title}>Completed?</h3>
						{suggestedWorkout.map((_, index) => (
							<div key={index} className={`${styles.checkboxContainer} ${completionStatus[index] ? styles.completedCheckbox : ""}`}>
								<input
									type="checkbox"
									checked={completionStatus[index]}
									onChange={() => toggleCompletion(index)}
								/>
							</div>
					))}
					</div>
				</section>
				<section>
					<div className={styles.container}>
						<form
							className={styles.form}
							method="post"
							onSubmit={handleSubmit}>
							<label>Suggest Changes...</label>
							<div className={styles.inlineInput}>
								<input
									name="refinementText"
									onChange={(e) => setRefinement(e.target.value)}
									value={refinement}
								/>
								<button type="submit" className={buttonStyles.inline}>
									Submit
								</button>
							</div>
						</form>
						<button
							type="button"
							className={`${buttonStyles.primary} ${styles.completeButton}`}
							style={{ width: "100%" }}
							onClick={() => handleFinished()}>
							Complete Workout
						</button>
					</div>
				</section>
			</main>
		</Loader>
	);
}

export default CurrentWorkout;
