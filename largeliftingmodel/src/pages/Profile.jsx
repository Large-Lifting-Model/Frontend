import AppNav from "../components/AppNav";
import styles from "./Profile.module.css";
import { useState, useEffect,} from 'react'
import LoginInfo_Viewer from "../components/LoginInfo_Viewer";
import Form_LoginInfo_Core from "../components/Form_LoginInfo_Core";
import buttonStyles from "../components/Button.module.css"
import formStyles from "../components/Form.module.css"
import {useNavigate} from "react-router-dom"

const dummyLoginInfo = {
	firstName: "",
	lastName: "",
	dob: "",
	email: "",
	password: ""
};

// const dummyHealthInfo = {
// 	gender: "Male",
// 	height: 65.0,
// 	weight: 189.0,
// 	favoriteWorkoutType: "Weights",
// 	workoutExperience: "Intermediate",
// 	fitnessGoal: "Get huge",
// 	injuries: "shoulder impingement",
// 	otherConsiderations: "not taking steroids"
// }




function Profile() {
	
	const [loginInfo, setLoginInfo] = useState(dummyLoginInfo);
	const [wipLoginInfo, setWIPLoginInfo] = useState(dummyLoginInfo);
	//const [healthInfo, setHealthInfo] = useState(null);
	const [isEditing, setIsEditing] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		setLoginInfo(dummyLoginInfo); // replace with API data
		setWIPLoginInfo(dummyLoginInfo);
    }, []);

	const handleSubmit = (event) => {
		event.preventDefault();
		setLoginInfo(wipLoginInfo)
		alert(`Saving loginInfo:  "${loginInfo}". This is a placeholder for API call`);
		setIsEditing(false)
	};

	const deleteProfile = () => {
		alert(`Deleting Profile. This is a placeholder for API call`);
		setLoginInfo(dummyLoginInfo);
		setWIPLoginInfo(loginInfo);
		setIsEditing(false);
		navigate('..');
	}

	const cancelEdit = () => {
		alert(`CancellingTheEdit. This is a placeholder for API call`);
		setWIPLoginInfo(loginInfo)
		setIsEditing(false)

	}

	return (
		<main className={styles.feedback.main}>
			<AppNav />
			{isEditing ?
				<div>
					<form className={formStyles.form} onSubmit={handleSubmit}>
						<Form_LoginInfo_Core loginInfo = {wipLoginInfo} setLoginInfo = {setWIPLoginInfo}/>
						<div className={formStyles.buttons_bottom}>
							<button type="submit" className={formStyles.btn}>Save</button>
							<button type="button" className={formStyles.btn} onClick={()=>cancelEdit()}>Cancel</button>
							<button type="button" className={formStyles.btn} onClick={()=>deleteProfile()}>Delete Profile</button>
						</div>
					</form>
				</div>
				:
				<div>
					<LoginInfo_Viewer loginInfo = {loginInfo} />
					<div className={styles.container}>
						<button type="button" className={buttonStyles.primary} onClick={() => setIsEditing(true)}>Edit Profile</button>
					</div>
				</div>
			}

		</main>
	);
}

export default Profile;
