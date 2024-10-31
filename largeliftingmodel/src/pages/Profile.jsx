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

const testUserID = "12903781273"

const testUser = {
	first_name: "testUser_fName",
	last_name: "testUser_lname",
	email: "testUser_e@mail"
};

const emptyUser = {
	first_name: "",
	last_name: "",
	email: ""
};

const testHealth = {
	dob: "2002-11-20",
	gender: "Male",
	height: 172,
	weight: 90,
	favourite_workout_type: "weights",
	workout_experience: "medium",
	fitness_goal: "hypertrophy",
	injuries: "bad left knee",
	other_considerations: "none"
}

const emptyHealth = {
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

const testProfile = {
	id: testUserID.toString(),
	"user": testUser,
	"health_data": testHealth
}

const emptyProfile = {
	id: "",
	"user": emptyUser,
	"health_data": emptyHealth
}




function Profile() {
	
	const [isEditingLoginInfo, setIsEditingLoginInfo] = useState(false);
	const [isEditingHealthInfo, setIsEditingHealthInfo] = useState(false);
	const [profile, setProfile] = useState(emptyProfile)
	const [wipProfile, setWIPProfile] = useState(emptyProfile)

	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true)

	const navigate = useNavigate();

	const getOrCreateProfile = async () => {
		try {
			const profileResponse = await fetch('http://localhost:3000/profile/' + testUserID.toString());
			if (!profileResponse.ok) throw new Error('Profile fetch failed');
			const response = await profileResponse.json();

			console.info("SET - GET PROFILE")
			console.info(JSON.stringify(response))
			setProfile(response);
			setWIPProfile(response);
		} catch (error) { // If it has been deleted, re-create it.
			console.info("CREATING test profile")
			const testCreateResponse = await fetch('http://localhost:3000/profile/', {
				method: 'POST', // Specify PUT method
				headers: {
				  'Content-Type': 'application/json', // Indicate JSON content
				},
				body: JSON.stringify(testProfile)
			})
			if (!testCreateResponse.ok) throw new Error('Creating new test profile failed');
			console.info("SET - CREATE TEST PROFILE")
			setProfile(testProfile);
			setWIPProfile(testProfile)
		}
	}

	const getAllData = async () => {
		try {
			setLoading(true);
			await getOrCreateProfile()

		} catch (err) {
			console.error("GetOrCREATE - " + err.message)
			setError(err.message);
		} finally {
			setLoading(false); // Ensure loading is stopped after fetch completes
		}
		
	}

	const putProfile = async (profileData) => {
		try {
			setLoading(true);
			const profileResponse = await fetch('http://localhost:3000/profile/' + testUserID.toString(), {
				method: 'PUT', // Specify PUT method
				headers: {
				  'Content-Type': 'application/json', // Indicate JSON content
				},
				body: JSON.stringify(profileData)
			})
			if (!profileResponse.ok) throw new Error('Profile PUT failed');

		} catch (err) {
			console.error("I HAVE AN ERROR FOR SOME REASON")
			console.info(err)
			setError(err.message);
		} finally {
			setLoading(false); // Ensure loading is stopped after fetch completes
			console.info("SET - PUT FINALLY")
			setProfile(profileData)
			setWIPProfile(profileData)
			setIsEditingLoginInfo(false)
		}
	}

	const delProfile = async () => {
		try {
			setLoading(true);
			const profileResponse = await fetch('http://localhost:3000/profile/' + testUserID.toString(), {
				method: 'DELETE', // Specify PUT method
			})
			if (!profileResponse.ok) throw new Error('Profile DELETE failed');
		} catch (err) {
			console.error(err)
			setError(err.message);
		} finally {
			setLoading(false); // Ensure loading is stopped after fetch completes
			console.info("SET - DELETE PROFILE")
			setProfile(emptyProfile);
			setWIPProfile(emptyProfile);
			setIsEditingLoginInfo(false);
			setIsEditingHealthInfo(false);
			navigate('..');
		}
	}
	useEffect(() => {
		// console.info("CATCH")
		// console.info(JSON.stringify(testProfile))
		// console.info(JSON.stringify(emptyProfile))
		// console.info(JSON.stringify(profile))
		// console.info(JSON.stringify(wipProfile))
		// console.info("/CATCH")
		getAllData();
    }, []);



	const handleSubmit = (event) => {
		event.preventDefault();
		const formName = event.target.name;
		switch(formName) {
		case "loginInfo":
			putProfile(wipProfile)
			break;
		case "healthInfo":
			putProfile(wipProfile)
			break;
		default:

		}
	};

	const handleUserSubmit = (value) => {
		setWIPProfile({...profile,
			"user" : value,
		});
	}

	const handleHealthDataSubmit = (value) => {
		setWIPProfile({...profile,
			"health_data" : value,
		});
	}

	const deleteProfile = () => {
		delProfile()
	}

	const cancelEditingLoginInfo = () => {
		setWIPProfile(profile)
		setIsEditingLoginInfo(false)
	}

	const cancelEditingHealthInfo = () => {
		setWIPProfile(profile)
		setIsEditingHealthInfo(false)
	}

	return (
		<main className={styles.feedback.main}>
			<AppNav />
			{isEditingLoginInfo ?
				<div>
					<form name="loginInfo" className={formStyles.form} onSubmit={handleSubmit}>
						<Form_LoginInfo_Core user = {wipProfile.user} setUser= {handleUserSubmit}/>
						<div className={formStyles.buttons_bottom}>
							<button type="submit" className={formStyles.btn}>Save</button>
							<button type="button" className={formStyles.btn} onClick={()=>cancelEditingLoginInfo()}>Cancel</button>
							<button type="button" className={formStyles.btn} onClick={()=>deleteProfile()}>Delete Profile</button>
						</div>
					</form>
				</div>
				:
				<div>
					<LoginInfo_Viewer user = {profile.user} />
					<div className={styles.container}>
						<button type="button" className={buttonStyles.primary} onClick={() => setIsEditingLoginInfo(true)}>Edit Login Info</button>
					</div>
				</div>
			}
			{isEditingHealthInfo ?
				<div>
					<form name="healthInfo" className={formStyles.form} onSubmit={handleSubmit}>
						<Form_HealthInfo_Core health_data = {wipProfile.health_data} setHealthData = {handleHealthDataSubmit}/>
						<div className={formStyles.buttons_bottom}>
							<button type="submit" className={formStyles.btn}>Save</button>
							<button type="button" className={formStyles.btn} onClick={()=>cancelEditingHealthInfo()}>Cancel</button>
						</div>
					</form>
				</div>
				:
				<div>
					<HealthInfo_Viewer health_data = {profile.health_data} />
					<div className={styles.container}>
						<button type="button" className={buttonStyles.primary} onClick={() => setIsEditingHealthInfo(true)}>Edit Health Info</button>
					</div>
				</div>
			}


		</main>
	);
}

export default Profile;
