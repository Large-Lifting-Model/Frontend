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
	workout,
	setWorkout,
}) {
	const handleBack = () => {
		setWorkoutState((prev) => {
			return workoutExists && prev > 0 ? prev - 1 : 0;
		});
	};
	const handleForward = () => {
		setWorkoutState((prev) => {
			return workoutExists && prev < 2 ? prev + 1 : 2;
		});
	};
	return (
		<>
			<AppNav token={token} setToken={setToken} />
			<div className={`${styles.container}`}>
				<span className={styles.leftCol}>
					{workoutState === 0 ? (
						<></>
					) : (
						<button className={buttonStyles.back} onClick={handleBack}>
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
							onClick={handleForward}>
							&gt;&gt;
						</button>
					) : (
						<></>
					)}
				</span>
			</div>
			{workoutState === 0 ? (
				<Create
					workoutState={workoutState}
					setWorkoutState={setWorkoutState}
					workoutExists={workoutExists}
					setWorkoutExists={setWorkoutExists}
					workout={workout}
					setWorkout={setWorkout}
				/>
			) : workoutState === 1 ? (
				<CurrentWorkout
					workoutState={workoutState}
					setWorkoutState={setWorkoutState}
					workoutExists={workoutExists}
					setWorkoutExists={setWorkoutExists}
					workout={workout}
					setWorkout={setWorkout}
				/>
			) : (
				<Feedback
					workoutState={workoutState}
					setWorkoutState={setWorkoutState}
					workoutExists={workoutExists}
					setWorkoutExists={setWorkoutExists}
					workout={workout}
					setWorkout={setWorkout}
				/>
			)}
		</>
	);
}

export default Workout;
