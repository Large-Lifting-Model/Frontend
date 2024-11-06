// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"
import styles from "./Form.module.css";
import { useEffect } from "react";
import React from "react";

const LoginInfo_Viewer = (props) => {

	useEffect(() => {
		console.info("LOGININFO_VIEWER")
		console.info(JSON.stringify(props))
		// console.info(JSON.stringify(props.user.first_name))
    }, []);

	return (
		<div>
			<div className={styles.form_description}>
				Here are your Login Details
			</div>
			<div className={styles.row}>
				<div className={styles.container}>
					<label> First Name </label>
					<h2 className={styles.h2} data-testid='profileUserFirstNameForm'> {props.profile.first_name} </h2>
				</div>
				<div className={styles.container}>
					<label> Last Name </label>
					<h2 className={styles.h2} data-testid='profileUserLastNameForm'> {props.profile.last_name} </h2>
				</div>
				<div className={styles.container}>
					<label> Email </label>
					<h2 className={styles.h2} data-testid='profileUserEmailForm'> {props.profile.email} </h2>
				</div>
			</div>
		</div>
	);
}

export default LoginInfo_Viewer;
