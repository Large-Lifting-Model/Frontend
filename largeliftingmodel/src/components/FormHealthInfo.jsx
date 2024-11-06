// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useState } from "react";

import styles from "./Form.module.css";
import FormHealthInfoCore from "./FormHealthInfoCore";
import {useNavigate} from "react-router-dom"


const dummyHealthInfo = {
	dob: "",
	gender: "",
	height: 0,
	weight: 0,
	favourite_workout_type: "",
	workout_experience: "",
	fitness_goal: "",
	injuries: "",
	other_considerations: ""
}


function FormHealthInfo() {

	const navigate = useNavigate();

	const [healthInfo, setHealthInfo] = useState(dummyHealthInfo);

	const handleSubmit = (event) => {
		// prevents page refresh
		event.preventDefault();
		alert("Submit Button Was Clicked" + JSON.stringify(healthInfo));
		// API call to save
		setHealthInfo(dummyHealthInfo)
		navigate('../home');
	};

	return (
		<>
			<div className={styles.form_description}>
				Enter some additional information
			</div>
			<form className={styles.form}>
				
				<FormHealthInfoCore health_data = {healthInfo} setHealthData = {setHealthInfo}/>
				<div className={styles.buttons_bottom}>
					<button type='submit' className={styles.btn} onClick={(e) => handleSubmit(e)}>Save</button>
				</div>
			</form>
		</>
	);
}

export default FormHealthInfo;
