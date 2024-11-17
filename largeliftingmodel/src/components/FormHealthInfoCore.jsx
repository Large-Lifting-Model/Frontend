import styles from "./Form.module.css";
import Select from "react-select";

const FormHealthInfoCore = ({ health_data, setHealthData }) => {
	const changeElement = (name, value) => {
		const changed = { ...health_data, [name]: value };
		setHealthData(changed);
	};

	const setGender = (value) => {
		changeElement("gender", value.value);
	};
	const setFavouriteWorkoutType = (value) => {
		changeElement("favourite_workout_type", value.value);
	};

	const setWorkoutExperience = (value) => {
		changeElement("workout_experience", value.value);
	};

	const genderOptions = [
		{ value: "Male", label: "Male" },
		{ value: "Female", label: "Female" },
		{ value: "Other", label: "Other" },
	];

	const favouriteWorkoutTypeOptions = [
		{ value: "Weights", label: "Weights" },
		{ value: "Cardio", label: "Cardio" },
		{ value: "Circuits", label: "Circuits" },
		{ value: "Crossfit", label: "Crossfit" },
		{ value: "Yoga", label: "Yoga" },
	];

	const workoutExperienceOptions = [
		{ value: "Beginner", label: "Beginner" },
		{ value: "Intermediate", label: "Intermediate" },
		{ value: "Expert", label: "Expert" },
	];

	return (
		<>
			<div className={styles.row}>
				<label htmlFor="dob">Birth Date</label>
				<input
					type="date"
					id="dob"
					onChange={(e) => changeElement("dob", e.target.value)}
					value={health_data.dob}
				/>
			</div>
			<div className={styles.row}>
				<label htmlFor="gender">Gender</label>
				<Select
					className={styles.dropdown}
					placeholder={!health_data.gender ? "Select Gender..." : null}
					options={genderOptions}
					onChange={setGender}
					value={{ value: health_data.gender, label: health_data.gender }}
				/>
			</div>
			<div className={styles.row}>
				<label htmlFor="height">Height (Meters)</label>
				<input
					id="height"
					type="number"
					onChange={(e) => changeElement("height", e.target.value)}
					value={health_data.height}
				/>
			</div>
			<div className={styles.row}>
				<label htmlFor="weight">Weight (kg)</label>
				<input
					id="weight"
					type="number"
					onChange={(e) => changeElement("weight", e.target.value)}
					value={health_data.weight}
				/>
			</div>
			<div className={styles.row}>
				<label htmlFor="favourite_workout_type">
					Favourite Workout Type
				</label>
				<Select
					className={styles.dropdown}
					placeholder={
						!health_data.favourite_workout_type
							? "Select Favourite Workout Type..."
							: null
					}
					options={favouriteWorkoutTypeOptions}
					onChange={setFavouriteWorkoutType}
					value={{
						value: health_data.favourite_workout_type,
						label: health_data.favourite_workout_type,
					}}
				/>
			</div>
			<div className={styles.row}>
				<label htmlFor="workout_experience">Workout Experience</label>
				<Select
					className={styles.dropdown}
					placeholder={
						!health_data.workout_experience
							? "Select Workout Experience..."
							: null
					}
					options={workoutExperienceOptions}
					onChange={setWorkoutExperience}
					value={{
						value: health_data.workout_experience,
						label: health_data.workout_experience,
					}}
				/>
			</div>
			<div className={styles.row}>
				<label htmlFor="fitness_goal">Fitness Goal</label>
				<input
					id="fitness_goal"
					type="text"
					onChange={(e) => changeElement("fitness_goal", e.target.value)}
					value={health_data.fitness_goal}
				/>
			</div>
			<div className={styles.row}>
				<label htmlFor="injuries">Injuries</label>
				<input
					id="injuries"
					type="text"
					onChange={(e) => changeElement("injuries", e.target.value)}
					value={health_data.injuries}
				/>
			</div>
			<div className={styles.row}>
				<label htmlFor="other_considerations">Other Considerations</label>
				<input
					id="other_considerations"
					type="text"
					onChange={(e) =>
						changeElement("other_considerations", e.target.value)
					}
					value={health_data.other_considerations}
				/>
			</div>
		</>
	);
};

export default FormHealthInfoCore;
