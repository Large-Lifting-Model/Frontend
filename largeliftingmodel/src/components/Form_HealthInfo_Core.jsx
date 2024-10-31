import styles from "./Form.module.css";

const Form_HealthInfo_Core = ({healthInfo, setHealthInfo}) => {

	const changeElement = (name, value) => {
		setHealthInfo({...healthInfo,
			[name]: value,
		});
	};

	return (
		<>
			<div className={styles.row}>
				<label htmlFor="dob">Birth Date</label>
				<input
					type="date"
					id="dob"
					onChange={(e) => changeElement('dob', e.target.value)}
					value={healthInfo.dob}
				/>
			</div>
			<div className={styles.row}>
				<label htmlFor="gender">Gender</label>
				<input
					id="gender"
					type="text"
					onChange={(e) => changeElement('gender', e.target.value)}
					value={healthInfo.gender}
				/>
			</div>
			<div className={styles.row}>
				<label htmlFor="height">Height</label>
				<input
					id="height"
					type="number"
					onChange={(e) => changeElement('height', e.target.value)}
					value={healthInfo.height}
				/>
			</div>
			<div className={styles.row}>
				<label htmlFor="weight">Weight</label>
				<input
					id="weight"
					type="number"
					onChange={(e) => changeElement('weight', e.target.value)}
					value={healthInfo.weight}
				/>
			</div>
			<div className={styles.row}>
				<label htmlFor="favourite_workout_type">Favorite Workout Type</label>
				<input
					id="favourite_workout_type"
					type="text"
					onChange={(e) => changeElement('favourite_workout_type', e.target.value)}
					value={healthInfo.favourite_workout_type}
				/>
			</div>
			<div className={styles.row}>
				<label htmlFor="workout_experience">Workout Experience</label>
				<input
					id="workout_experience"
					type="text"
					onChange={(e) => changeElement('workout_experience', e.target.value)}
					value={healthInfo.workout_experience}
				/>
			</div>
			<div className={styles.row}>
				<label htmlFor="fitness_goal">Fitness Goal</label>
				<input
					id="fitness_goal"
					type="text"
					onChange={(e) => changeElement('fitness_goal', e.target.value)}
					value={healthInfo.fitness_goal}
				/>
			</div>
			<div className={styles.row}>
				<label htmlFor="injuries">Injuries</label>
				<input
					id="injuries"
					type="text"
					onChange={(e) => changeElement('injuries', e.target.value)}
					value={healthInfo.injuries}
				/>
			</div>
			<div className={styles.row}>
				<label htmlFor="other_considerations">Other Considerations</label>
				<input
					id="other_considerations"
					type="text"
					onChange={(e) => changeElement('other_considerations', e.target.value)}
					value={healthInfo.other_considerations}
				/>
			</div>
		</>
	);
}

export default Form_HealthInfo_Core;
