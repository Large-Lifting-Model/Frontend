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
import AppAPI from "../AppAPI";

function Profile() {

	const profileID = AppAPI.djangoTestUserID // REPLACE THIS WITH PROFILE ID FROM USERDATA
	
	const [isEditingLoginInfo, setIsEditingLoginInfo] = useState(false);
	const [isEditingHealthInfo, setIsEditingHealthInfo] = useState(false);
	const [profile, setProfile] = useState(AppAPI.emptyProfile)
	const [wipProfile, setWIPProfile] = useState(AppAPI.emptyProfile)

	const navigate = useNavigate();

	const getOrCreateProfile = async () => {
		const returnedProfile = await AppAPI.getOrCreateProfile(profileID)
		setProfile(returnedProfile)
		setWIPProfile(returnedProfile)
	}

	const putProfile = async (profileData) => {
		await AppAPI.put("PROFILE", profileData, profileID)
		setProfile(profileData)
		setWIPProfile(profileData)
		setIsEditingLoginInfo(false)
		setIsEditingHealthInfo(false)
	}

	const deleteProfile = async () => {
		await AppAPI.delete("PROFILE", profileID)
		setProfile(AppAPI.emptyProfile);
		setWIPProfile(AppAPI.emptyProfile);
		setIsEditingLoginInfo(false);
		setIsEditingHealthInfo(false);
		navigate('..');
	}

	useEffect(() => {
		getOrCreateProfile();
    }, []);



	const handleSubmit = (event) => {
		event.preventDefault();
		putProfile(wipProfile)
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
