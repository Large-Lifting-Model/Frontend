import styles from "./CurrentWorkout.module.css";
import buttonStyles from "../components/Button.module.css";
import { useEffect, useState } from "react";
import testWorkout from "../testWorkout.json"; // delete once we call API
import { useLocalStorageState } from "../hooks/useLocalStorageState";

function CurrentWorkout({ setWorkoutState }) {
	
	const [workout, setWorkout] = useState([]);
	const [completionStatus, setCompletionStatus] = useLocalStorageState(
		new Array(testWorkout.workout.length).fill(false),
		"completionStatus"
	);
	const [refinement, setRefinement] = useState("");

	useEffect(() => {
		setWorkout(testWorkout.workout); // replace with API data
		setCompletionStatus((prevStatus) => {
			return prevStatus.length === testWorkout.workout.length ? prevStatus : 
						 new Array(testWorkout.workout.length).fill(false);
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

	const handleSubmit = (event) => {
		event.preventDefault();
		alert(
			`Submitting refinement:  "${refinement}". This is a placeholder for API call`
		);
		setRefinement(""); // Clear the input after submission
	};

	return (
		<main className={styles.workout}>
			<section className={styles.workoutContainer}>
				<div className={styles.exerciseList}>
				<h2 className={styles.title}>Exercises</h2>
					{workout && workout.length > 0 ? (
						workout.map((item, index) => (
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
					{workout.map((_, index) => (
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
	);
}

export default CurrentWorkout;
