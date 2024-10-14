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
				<label htmlFor="favoriteWorkoutType">Favorite Workout Type</label>
				<input
					id="favoriteWorkoutType"
					type="text"
					onChange={(e) => changeElement('favoriteWorkoutType', e.target.value)}
					value={healthInfo.favoriteWorkoutType}
				/>
			</div>
			<div className={styles.row}>
				<label htmlFor="workoutExperience">Workout Experience</label>
				<input
					id="workoutExperience"
					type="text"
					onChange={(e) => changeElement('workoutExperience', e.target.value)}
					value={healthInfo.workoutExperience}
				/>
			</div>
			<div className={styles.row}>
				<label htmlFor="fitnessGoal">Fitness Goal</label>
				<input
					id="fitnessGoal"
					type="text"
					onChange={(e) => changeElement('fitnessGoal', e.target.value)}
					value={healthInfo.fitnessGoal}
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
				<label htmlFor="otherConsiderations">Other Considerations</label>
				<input
					id="otherConsiderations"
					type="text"
					onChange={(e) => changeElement('otherConsiderations', e.target.value)}
					value={healthInfo.otherConsiderations}
				/>
			</div>
		</>
	);
}

export default Form_HealthInfo_Core;
