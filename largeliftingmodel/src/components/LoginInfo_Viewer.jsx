// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import styles from "./Form.module.css";

const LoginInfo_Viewer = (props) => {

	return (
		<div>
			<div className={styles.form_description}>
				Here are your Login Details
			</div>
			<div className={styles.row}>
				<div className={styles.container}>
					<label> First Name </label>
					<h2 className={styles.h2}> {props.loginInfo.first_name} </h2>
				</div>
				<div className={styles.container}>
					<label> Last Name </label>
					<h2 className={styles.h2}> {props.loginInfo.last_name} </h2>
				</div>
				<div className={styles.container}>
					<label> Email </label>
					<h2 className={styles.h2}> {props.loginInfo.email} </h2>
				</div>
			</div>
		</div>
	);
}

export default LoginInfo_Viewer;
