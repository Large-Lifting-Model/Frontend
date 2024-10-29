import AppNav from "../components/AppNav";
import styles from "./Profile.module.css";
import { useState, useEffect,} from 'react'
import LoginInfo_Viewer from "../components/LoginInfo_Viewer";
import HealthInfo_Viewer from "../components/HealthInfo_Viewer";
import Form_LoginInfo_Core from "../components/Form_LoginInfo_Core";
import Form_HealthInfo_Core from "../components/Form_HealthInfo_Core";
import buttonStyles from "../components/Button.module.css"
import formStyles from "../components/Form.module.css"
import {useNavigate} from "react-router-dom"
import React from 'react'

const dummyLoginInfo = {
	firstName: "",
	lastName: "",
	email: ""
};

const dummyHealthInfo = {
	dob: "",
	gender: "",
	height: 0,
	weight: 0,
	favoriteWorkoutType: "",
	workoutExperience: "",
	fitnessGoal: "",
	injuries: "",
	otherConsiderations: ""
}




function Profile({ onLoginInfoSubmit, onHealthInfoSubmit }) {
	
	const [loginInfo, setLoginInfo] = useState(dummyLoginInfo);
	const [wipLoginInfo, setWIPLoginInfo] = useState(dummyLoginInfo);
	const [healthInfo, setHealthInfo] = useState(dummyHealthInfo);
	const [wipHealthInfo, setWIPHealthInfo] = useState(dummyHealthInfo);
	const [isEditingLoginInfo, setIsEditingLoginInfo] = useState(false);
	const [isEditingHealthInfo, setIsEditingHealthInfo] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		setLoginInfo(dummyLoginInfo); // replace with API data
		setWIPLoginInfo(dummyLoginInfo); // replace with API data
		setHealthInfo(dummyHealthInfo); // replace with API data
		setWIPHealthInfo(dummyHealthInfo); // replace with API data
    }, []);

	const handleSubmit = (event) => {
		event.preventDefault();
		const formName = event.target.name;
		switch(formName) {
		case "loginInfo":
			alert(`Saving loginInfo:  "${JSON.stringify(wipLoginInfo)}". This is a placeholder for API call`);
			setLoginInfo(wipLoginInfo)
			onLoginInfoSubmit()
			setIsEditingLoginInfo(false)
			break;
		case "healthInfo":
			alert(`Saving healthInfo:  "${JSON.stringify(wipHealthInfo)}". This is a placeholder for API call`);
			setHealthInfo(wipHealthInfo)
			onHealthInfoSubmit()
			setIsEditingHealthInfo(false)
			break;
		default:

		}
	};

	const deleteProfile = () => {
		alert(`Deleting Profile. This is a placeholder for API call`);
		setLoginInfo(dummyLoginInfo);
		setWIPLoginInfo(loginInfo);
		setHealthInfo(dummyHealthInfo);
		setWIPHealthInfo(healthInfo);
		setIsEditingLoginInfo(false);
		setIsEditingHealthInfo(false);
		navigate('..');
	}

	const cancelEditingLoginInfo = () => {
		setWIPLoginInfo(loginInfo)
		setIsEditingLoginInfo(false)
	}

	const cancelEditingHealthInfo = () => {
		setWIPHealthInfo(healthInfo)
		setIsEditingHealthInfo(false)
	}

	return (
		<main className={styles.feedback.main}>
			<AppNav />
			{isEditingLoginInfo ?
				<div>
					<form name="loginInfo" htmlFor="loginInfo" className={formStyles.form} onSubmit={handleSubmit}>
						<Form_LoginInfo_Core loginInfo = {wipLoginInfo} setLoginInfo = {setWIPLoginInfo}/>
						<div className={formStyles.buttons_bottom}>
							<button type="submit" data-testid="saveLoginInfo" className={formStyles.btn}>Save</button>
							<button type="button" data-testid="cancelLoginInfo" className={formStyles.btn} onClick={()=>cancelEditingLoginInfo()}>Cancel</button>
							<button type="button" data-testid="deleteProfile" className={formStyles.btn} onClick={()=>deleteProfile()}>Delete Profile</button>
						</div>
					</form>
				</div>
				:
				<div>
					<LoginInfo_Viewer loginInfo = {loginInfo} />
					<div className={styles.container}>
						<button type="button" data-testid="editLoginInfo" className={buttonStyles.primary} onClick={() => setIsEditingLoginInfo(true)}>Edit Login Info</button>
					</div>
				</div>
			}
			{isEditingHealthInfo ?
				<div>
					<form name="healthInfo"  htmlFor="healthInfo" className={formStyles.form} onSubmit={handleSubmit}>
						<Form_HealthInfo_Core healthInfo = {wipHealthInfo} setHealthInfo = {setWIPHealthInfo}/>
						<div className={formStyles.buttons_bottom}>
							<button type="submit" data-testid="saveHealthInfo" className={formStyles.btn}>Save</button>
							<button type="button" data-testid="cancelHealthInfo" className={formStyles.btn} onClick={()=>cancelEditingHealthInfo()}>Cancel</button>
						</div>
					</form>
				</div>
				:
				<div>
					<HealthInfo_Viewer healthInfo = {healthInfo} htmlFor="healthInfo" />
					<div className={styles.container}>
						<button type="button" data-testid="editHealthInfo" className={buttonStyles.primary} onClick={() => setIsEditingHealthInfo(true)}>Edit Health Info</button>
					</div>
				</div>
			}


		</main>
	);
}

export default Profile;
