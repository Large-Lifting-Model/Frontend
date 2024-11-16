// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import styles from "./Form.module.css";
import buttonStyles from "./Button.module.css";
import FormHealthInfoCore from "./FormHealthInfoCore";
import Loader from "./Loader";
import AppAPI from "./AppAPI";
import useLoader from "../hooks/useLoader";
import { useNavigate } from "react-router-dom";

function FormHealthInfo({ user, setUser, healthInfo, setHealthInfo }) {
	const navigate = useNavigate();
	const { error, isLoading, withLoader } = useLoader();

	const handleSubmit = async (profileData) => {
		await withLoader(async () => {
			await AppAPI.put(
				"users/profile/",
				profileData,
				AppAPI.getDefaultHeaders(),
				"profile/" + AppAPI.testUserID
			);
			setUser({ ...user, health_data: healthInfo, is_new: false });
			navigate("../home");
		});
	};

	return (
		<Loader error={error} isLoading={isLoading}>
			<div className={styles.form_description}>
				Enter some additional information
			</div>
			<form className={styles.form}>
				<FormHealthInfoCore
					health_data={healthInfo}
					setHealthData={setHealthInfo}
				/>
				<div className={styles.buttons_bottom}>
					<button
						type="submit"
						className={buttonStyles.primary}
						onClick={() =>
							handleSubmit({ ...user, health_data: healthInfo })
						}>
						Save
					</button>
				</div>
			</form>
		</Loader>
	);
}

export default FormHealthInfo;
