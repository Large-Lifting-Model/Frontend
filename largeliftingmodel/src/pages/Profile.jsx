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

const testProfile = {
	id: testUserID.toString(),
	first_name: "testUser_fName",
	last_name: "testUser_lname",
	email: "testUser_e@mail"
};

const emptyProfile = {
	id: "",
	first_name: "",
	last_name: "",
	email: ""
};

const testHealth = {
	id: testUserID.toString(),
	dob: "November 20 2004",
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
	id: "",
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

/*
{
  "user": {
    "first_name": "Updated First Name",
    "last_name": "Updated Last Name",
    "email": "updated.email@example.com"
  },
  "health_data": {
    "dob": "2000-01-01",
    "gender": "Male",
    "height": 6.1,
    "weight": 170,
    "favourite_workout_type": "Weights",
    "workout_experience": "Intermediate",
    "fitness_goal": "Improve endurance",
    "injuries": "None",
    "other_considerations": "Focus on cardio"
  }
}
*/

// const testProfile = {
// 	"user": testUser,
// 	"health_data": testHealth
// }

// const emptyProfile = {
// 	"user": emptyUser,
// 	"health_data": emptyHealth
// }




function Profile() {
	
	const [loginInfo, setLoginInfo] = useState(emptyProfile);
	const [wipLoginInfo, setWIPLoginInfo] = useState(emptyProfile);
	const [healthInfo, setHealthInfo] = useState(emptyHealth);
	const [wipHealthInfo, setWIPHealthInfo] = useState(emptyHealth);
	const [isEditingLoginInfo, setIsEditingLoginInfo] = useState(false);
	const [isEditingHealthInfo, setIsEditingHealthInfo] = useState(false);

	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true)

	const navigate = useNavigate();

	const getOrCreateProfile = async () => {
		try {
			const profileResponse = await fetch('http://localhost:8000/profile/' + testUserID.toString());
			if (!profileResponse.ok) throw new Error('Profile fetch failed');
			const profile = await profileResponse.json();
			setLoginInfo(profile);
			setWIPLoginInfo(profile);
		} catch (error) { // If it has been deleted, re-create it.
			console.info("CREATING test profile")
			const testCreateResponse = await fetch('http://localhost:8000/profile/', {
				method: 'POST', // Specify PUT method
				headers: {
				  'Content-Type': 'application/json', // Indicate JSON content
				},
				body: JSON.stringify(testProfile)
			})
			if (!testCreateResponse.ok) throw new Error('Creating new test profile failed');
			setLoginInfo(testProfile);
			setWIPLoginInfo(testProfile)
		}
	}

	const getOrCreateHealth = async () => {
		try {
			const response = await fetch('http://localhost:8000/health/' + testUserID.toString());
			if (!response.ok) throw new Error('Health fetch failed');
			const health = await response.json();
			setHealthInfo(health);
			setWIPHealthInfo(health);
		} catch (error) { // If it has been deleted, re-create it.
			console.info("CREATING test health")
			const testCreateResponse = await fetch('http://localhost:8000/health/', {
				method: 'POST', // Specify PUT method
				headers: {
				  'Content-Type': 'application/json', // Indicate JSON content
				},
				body: JSON.stringify(testHealth)
			})
			if (!testCreateResponse.ok) throw new Error('Creating new test health failed');
			setHealthInfo(testHealth);
			setWIPHealthInfo(testHealth);
		}
	}

	const getAllData = async () => {
		try {
			setLoading(true);
			await getOrCreateProfile()
			await getOrCreateHealth()

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
			const profileResponse = await fetch('http://localhost:8000/profile/' + testUserID.toString(), {
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
			setLoginInfo(profileData)
			setWIPLoginInfo(profileData)
			setIsEditingLoginInfo(false)
		}
	}

	const putHealth = async (healthData) => {
		try {
			setLoading(true);
			const healthResponse = await fetch('http://localhost:8000/health/' + testUserID.toString(), {
				method: 'PUT', // Specify PUT method
				headers: {
				  'Content-Type': 'application/json', // Indicate JSON content
				},
				body: JSON.stringify(healthData)
			})
			if (!healthResponse.ok) throw new Error('Health PUT failed');

		} catch (err) {
			console.error(err)
			setError(err.message);
		} finally {
			setLoading(false); // Ensure loading is stopped after fetch completes
			setHealthInfo(healthData)
			setWIPHealthInfo(healthData)
			setIsEditingHealthInfo(false)
		}
	}

	const delProfile = async () => {
		try {
			setLoading(true);
			const profileResponse = await fetch('http://localhost:8000/profile/' + testUserID.toString(), {
				method: 'DELETE', // Specify PUT method
			})
			if (!profileResponse.ok) throw new Error('Profile DELETE failed');
			const healthResponse = await fetch('http://localhost:8000/health/' + testUserID.toString(), {
				method: 'DELETE', // Specify PUT method
			})
			if (!healthResponse.ok) throw new Error('Health DELETE failed');
		} catch (err) {
			console.error(err)
			setError(err.message);
		} finally {
			setLoading(false); // Ensure loading is stopped after fetch completes
			setLoginInfo(emptyProfile);
			setWIPLoginInfo(emptyProfile);
			setHealthInfo(emptyHealth);
			setWIPHealthInfo(emptyHealth);
			setIsEditingLoginInfo(false);
			setIsEditingHealthInfo(false);
			navigate('..');
		}
	}

	

	useEffect(() => {
		getAllData();
    }, []);



	const handleSubmit = (event) => {
		event.preventDefault();
		const formName = event.target.name;
		switch(formName) {
		case "loginInfo":
			putProfile(wipLoginInfo)
			break;
		case "healthInfo":
			putHealth(wipHealthInfo)
			break;
		default:

		}
	};

	const deleteProfile = () => {
		delProfile()
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
					<form name="loginInfo" className={formStyles.form} onSubmit={handleSubmit}>
						<Form_LoginInfo_Core loginInfo = {wipLoginInfo} setLoginInfo = {setWIPLoginInfo}/>
						<div className={formStyles.buttons_bottom}>
							<button type="submit" className={formStyles.btn}>Save</button>
							<button type="button" className={formStyles.btn} onClick={()=>cancelEditingLoginInfo()}>Cancel</button>
							<button type="button" className={formStyles.btn} onClick={()=>deleteProfile()}>Delete Profile</button>
						</div>
					</form>
				</div>
				:
				<div>
					<LoginInfo_Viewer loginInfo = {loginInfo} />
					<div className={styles.container}>
						<button type="button" className={buttonStyles.primary} onClick={() => setIsEditingLoginInfo(true)}>Edit Login Info</button>
					</div>
				</div>
			}
			{isEditingHealthInfo ?
				<div>
					<form name="healthInfo" className={formStyles.form} onSubmit={handleSubmit}>
						<Form_HealthInfo_Core healthInfo = {wipHealthInfo} setHealthInfo = {setWIPHealthInfo}/>
						<div className={formStyles.buttons_bottom}>
							<button type="submit" className={formStyles.btn}>Save</button>
							<button type="button" className={formStyles.btn} onClick={()=>cancelEditingHealthInfo()}>Cancel</button>
						</div>
					</form>
				</div>
				:
				<div>
					<HealthInfo_Viewer healthInfo = {healthInfo} />
					<div className={styles.container}>
						<button type="button" className={buttonStyles.primary} onClick={() => setIsEditingHealthInfo(true)}>Edit Health Info</button>
					</div>
				</div>
			}


		</main>
	);
}

export default Profile;
