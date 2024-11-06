import styles from "./Form.module.css";
import { useEffect, useState } from "react";
import Select from "react-select";

const FormHealthInfoCore = ({health_data, setHealthData}) => {

	useEffect(() => {
		console.info(JSON.stringify(health_data))
    }, []);

	const changeElement = (name, value) => {
		console.info("Name:" + name + " Value: " + JSON.stringify(value))
		const changed = {...health_data,
			[name]: value,
		}
		console.info(JSON.stringify(changed))
		setHealthData(changed);
	};

	const setFavouriteWorkoutType = (value) => {
		changeElement("favourite_workout_type", value.value)
	}

	const favouriteWorkoutTypeOptions = [
		{ value: "Weights", label: "Weights" },
		{ value: "Cardio", label: "Cardio" },
		{ value: "Circuits", label: "Circuits" },
		{ value: "Crossfit", label: "Crossfit" },
		{ value: "Yoga", label: "Yoga" },
		{ value: "Other", label: "Other" },
	];

	return (
		<>
			<div className={styles.row}>
				<label htmlFor="dob">Birth Date</label>
				<input
					type="date"
					id="dob"
					onChange={(e) => changeElement('dob', e.target.value)}
					value={health_data.dob}
				/>
			</div>
			<div className={styles.row}>
				<label htmlFor="gender">Gender</label>
				<input
					id="gender"
					type="text"
					onChange={(e) => changeElement('gender', e.target.value)}
					value={health_data.gender}
				/>
			</div>
			<div className={styles.row}>
				<label htmlFor="height">Height (Meters)</label>
				<input
					id="height"
					type="number"
					onChange={(e) => changeElement('height', e.target.value)}
					value={health_data.height}
				/>
			</div>
			<div className={styles.row}>
				<label htmlFor="weight">Weight (kg)</label>
				<input
					id="weight"
					type="number"
					onChange={(e) => changeElement('weight', e.target.value)}
					value={health_data.weight}
				/>
			</div>
			<div className={styles.row}>
				<label htmlFor="favourite_workout_type">Favourite Workout Type</label>
				<Select
					className={styles.dropdown}
					placeholder= {!health_data.favourite_workout_type ? 'Select Favourite Workout Type...' : null}
					options={favouriteWorkoutTypeOptions}
					onChange={setFavouriteWorkoutType}
					value={{value: health_data.favourite_workout_type, label: health_data.favourite_workout_type}}
				/>
			</div>
			<div className={styles.row}>
				<label htmlFor="workout_experience">Workout Experience</label>
				<input
					id="workout_experience"
					type="text"
					onChange={(e) => changeElement('workout_experience', e.target.value)}
					value={health_data.workout_experience}
				/>
			</div>
			<div className={styles.row}>
				<label htmlFor="fitness_goal">Fitness Goal</label>
				<input
					id="fitness_goal"
					type="text"
					onChange={(e) => changeElement('fitness_goal', e.target.value)}
					value={health_data.fitness_goal}
				/>
			</div>
			<div className={styles.row}>
				<label htmlFor="injuries">Injuries</label>
				<input
					id="injuries"
					type="text"
					onChange={(e) => changeElement('injuries', e.target.value)}
					value={health_data.injuries}
				/>
			</div>
			<div className={styles.row}>
				<label htmlFor="other_considerations">Other Considerations</label>
				<input
					id="other_considerations"
					type="text"
					onChange={(e) => changeElement('other_considerations', e.target.value)}
					value={health_data.other_considerations}
				/>
			</div>
		</>
	);
}

export default FormHealthInfoCore;
