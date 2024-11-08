import AppNav from "../components/AppNav";
import formStyles from "../components/Form.module.css";
import styles from "./Workout.module.css";
import buttonStyles from "../components/Button.module.css";
import Create from "../components/Create";
import CurrentWorkout from "../components/CurrentWorkout";
import Feedback from "../components/Feedback";

function Workout({
	token,
	setToken,
	workoutState,
	setWorkoutState,
	workoutExists,
	setWorkoutExists,
}) {
	const handleBack = () => {
		workoutExists && workoutState > 0
			? setWorkoutState(workoutState - 1)
			: setWorkoutState(0);
	};

	const handleForward = () => {
		workoutExists && workoutState < 2
			? setWorkoutState(workoutState + 1)
			: setWorkoutState(2);
	};
	return (
		<>
			<AppNav token={token} setToken={setToken} />
			<div className={`${styles.container}`}>
				<span className={styles.leftCol}>
					{workoutState === 0 ? (
						<></>
					) : (
						<button
							className={buttonStyles.back}
							onClick={() => handleBack()}>
							&lt;&lt;
						</button>
					)}
				</span>
				<span
					className={`${styles.middleCol} ${formStyles.form_description}`}>
					{workoutState === 0 && !workoutExists
						? "Create Workout"
						: workoutState === 0
						? "Change Workout Parameters"
						: workoutState === 1
						? "Current Workout"
						: "Finished Workout"}
				</span>
				<span className={styles.rightCol}>
					{workoutState !== 2 && workoutExists ? (
						<button
							className={`${buttonStyles.back} ${styles.btnRight}`}
							onClick={() => handleForward()}>
							&gt;&gt;
						</button>
					) : (
						<></>
					)}
				</span>
			</div>
			{workoutState === 0 ? (
				<Create
					workoutExists={workoutExists}
					setWorkoutState={setWorkoutState}
					setWorkoutExists={setWorkoutExists}
				/>
			) : workoutState === 1 ? (
				<CurrentWorkout
					workoutState={workoutState}
					setWorkoutState={setWorkoutState}
					workoutExists={workoutExists}
					setWorkoutExists={setWorkoutExists}
				/>
			) : (
				<Feedback
					setWorkoutState={setWorkoutState}
					setWorkoutExists={setWorkoutExists}
				/>
			)}
		</>
	);
}

export default Workout;
