// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import styles from "./Form.module.css";
import React from 'react'

const HealthInfo_Viewer = (props) => {

	return (
		<div>
			<div className={styles.form_description}>
				Here is your Health Info
			</div>
			<div className={styles.row}>
			<div className={styles.container}>
					<label> Date of Birth </label>
					<h2 className={styles.h2} data-testid="dobLabel"> {props.healthInfo.dob} </h2>
				</div>
				<div className={styles.container}>
					<label> Gender </label>
					<h2 className={styles.h2} data-testid="genderLabel"> {props.healthInfo.gender} </h2>
				</div>
				<div className={styles.container}>
					<label> Height </label>
					<h2 className={styles.h2} data-testid="heightLabel"> {props.healthInfo.height} </h2>
				</div>
				<div className={styles.container}>
					<label> Weight </label>
					<h2 className={styles.h2} data-testid="weightLabel"> {props.healthInfo.weight} </h2>
				</div>
				<div className={styles.container}>
					<label> Favorite Workout Type </label>
					<h2 className={styles.h2} data-testid="favoriteWorkoutTypeLabel"> {props.healthInfo.favoriteWorkoutType} </h2>
				</div>
				<div className={styles.container}>
					<label> Workout Experience </label>
					<h2 className={styles.h2} data-testid="workoutExperienceLabel"> {props.healthInfo.workoutExperience} </h2>
				</div>
				<div className={styles.container}>
					<label> Fitness Goal </label>
					<h2 className={styles.h2} data-testid="fitnessGoalLabel"> {props.healthInfo.fitnessGoal} </h2>
				</div>
				<div className={styles.container}>
					<label> Injuries </label>
					<h2 className={styles.h2} data-testid="injuriesLabel"> {props.healthInfo.injuries} </h2>
				</div>
				<div className={styles.container}>
					<label> Other Considerations </label>
					<h2 className={styles.h2} data-testid="otherConsiderationsLabel"> {props.healthInfo.otherConsiderations} </h2>
				</div>
			</div>
		</div>
	);
}

export default HealthInfo_Viewer;
