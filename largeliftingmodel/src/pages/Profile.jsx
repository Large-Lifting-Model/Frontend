import AppNav from "../components/AppNav";
import styles from "./Profile.module.css";
import { useState, useEffect } from "react";
// import { useState } from "react";
import LoginInfoViewer from "../components/LoginInfoViewer";
import HealthInfoViewer from "../components/HealthInfoViewer";
import FormLoginInfoCore from "../components/FormLoginInfoCore";
import FormHealthInfoCore from "../components/FormHealthInfoCore";
import buttonStyles from "../components/Button.module.css";
import formStyles from "../components/Form.module.css";
import { useNavigate } from "react-router-dom";
import AppAPI from "../components/AppAPI";
// import React from "react"; //needed for testing
import Loader from "../components/Loader";
import useLoader from "../hooks/useLoader";

function Profile() {
	const [isEditingLoginInfo, setIsEditingLoginInfo] = useState(false);
	const [isEditingHealthInfo, setIsEditingHealthInfo] = useState(false);
	const [profile, setProfile] = useState(AppAPI.emptyProfile);
	const [wipProfile, setWIPProfile] = useState(AppAPI.emptyProfile);

	const navigate = useNavigate();

	const { error, isLoading, withLoader } = useLoader();

	const getOrCreateProfileIfTesting = async () => {
		await withLoader(async () => {
			const returnedProfile = await AppAPI.getOrCreateProfileIfTesting();
			setProfile(returnedProfile);
			setWIPProfile(returnedProfile);
		});
	};

	const putProfile = async (profileData) => {
		await withLoader(async () => {
			await AppAPI.put(
				"users/profile/",
				profileData,
				AppAPI.getDefaultHeaders(),
				"profile/" + AppAPI.testUserID
			);
			setProfile(profileData);
			setWIPProfile(profileData);
			setIsEditingLoginInfo(false);
			setIsEditingHealthInfo(false);
		});
	};

	const deleteProfile = async () => {
		window.confirm("Are you sure you want to delete your profile?") &&
			(await withLoader(async () => {
				await AppAPI.delete(
					"users/profile/",
					AppAPI.getDefaultHeaders(),
					"profile/" + AppAPI.testUserID
				);
				setProfile(AppAPI.emptyProfile);
				setWIPProfile(AppAPI.emptyProfile);
				setIsEditingLoginInfo(false);
				setIsEditingHealthInfo(false);
				localStorage.clear();
				navigate("/");
				window.location.reload();
			}));
	};

	//only run once on component mount -> empty array OK.
	useEffect(() => {
		getOrCreateProfileIfTesting();
	}, []);

	const handleSubmit = (event) => {
		event.preventDefault();
		putProfile(wipProfile);
	};

	const handleUserSubmit = (user) => {
		const submittedProfile = {
			...profile,
			first_name: user.first_name,
			last_name: user.last_name,
			email: user.email,
		};
		setWIPProfile(submittedProfile);
	};

	const handleHealthDataSubmit = (value) => {
		setWIPProfile({ ...profile, health_data: value });
	};

	const cancelEditingLoginInfo = () => {
		setWIPProfile(profile);
		setIsEditingLoginInfo(false);
	};

	const cancelEditingHealthInfo = () => {
		setWIPProfile(profile);
		setIsEditingHealthInfo(false);
	};

	return (
		<main>
			<AppNav />
			<Loader error={error} isLoading={isLoading}>
				{isEditingLoginInfo ? (
					<div className={styles.container}>
						<form
							name="loginInfo"
							className={formStyles.form}
							onSubmit={handleSubmit}>
							<FormLoginInfoCore
								profile={wipProfile}
								setProfile={handleUserSubmit}
							/>
							<div className={formStyles.buttons_bottom}>
								<button
									type="submit"
									data-testid="profileUserSaveButton"
									className={formStyles.btn}>
									Save
								</button>
								<button
									type="button"
									data-testid="profileUserCancelButton"
									className={formStyles.btn}
									onClick={() => cancelEditingLoginInfo()}>
									Cancel
								</button>
								<button
									type="button"
									data-testid="profileUserDeleteButton"
									className={formStyles.btn}
									onClick={() => deleteProfile()}>
									Delete Profile
								</button>
							</div>
						</form>
					</div>
				) : (
					<div className={formStyles.view}>
						<LoginInfoViewer profile={profile} />
						<div className={styles.container}>
							<button
								type="button"
								data-testid="profileUserEditButton"
								className={buttonStyles.primary}
								onClick={() => setIsEditingLoginInfo(true)}>
								Edit Login Info
							</button>
						</div>
					</div>
				)}
				{isEditingHealthInfo ? (
					<div>
						<form
							name="healthInfo"
							className={formStyles.form}
							onSubmit={handleSubmit}>
							<FormHealthInfoCore
								health_data={wipProfile.health_data}
								setHealthData={handleHealthDataSubmit}
							/>
							<div className={formStyles.buttons_bottom}>
								<button
									type="submit"
									data-testid="profileHealthDataSaveButton"
									className={formStyles.btn}>
									Save
								</button>
								<button
									type="button"
									data-testid="profileHealthDataCancelButton"
									className={formStyles.btn}
									onClick={() => cancelEditingHealthInfo()}>
									Cancel
								</button>
							</div>
						</form>
					</div>
				) : (
					<div className={formStyles.view}>
						<HealthInfoViewer health_data={profile.health_data} />
						<div className={styles.container}>
							<button
								type="button"
								data-testid="profileHealthDataEditButton"
								className={buttonStyles.primary}
								onClick={() => setIsEditingHealthInfo(true)}>
								Edit Health Info
							</button>
						</div>
					</div>
				)}
			</Loader>
		</main>
	);
}

export default Profile;
