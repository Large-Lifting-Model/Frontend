// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useState } from "react";

import styles from "./Form.module.css";
import Form_HealthInfo_Core from "./Form_HealthInfo_Core";

const dummyHealthInfo = {
	gender: "",
	height: 0,
	weight: 0,
	favoriteWorkoutType: "",
	workoutExperience: "",
	fitnessGoal: "",
	injuries: "",
	otherConsiderations: ""
}


function Form_HealthInfo() {

	const [healthInfo, setHealthInfo] = useState(dummyHealthInfo);

	const handleSubmit = (event) => {
		// prevents page refresh
		event.preventDefault();
		alert("Submit Button Was Clicked" + JSON.stringify(healthInfo));
		setHealthInfo(dummyHealthInfo)
	};

	return (
		<>
			<div className={styles.form_description}>
				Enter some additional information
			</div>
			<form className={styles.form}>
				
				<Form_HealthInfo_Core healthInfo = {healthInfo} setHealthInfo = {setHealthInfo}/>
				<div className={styles.buttons_bottom}>
					<button type='submit' className={styles.btn} onClick={(e) => handleSubmit(e)}>Save</button>
					<button type='submit' className={styles.btn} onClick={(e) => handleSubmit(e)}>Maybe Later</button>
				</div>
			</form>
		</>
	);
}

export default Form_HealthInfo;
