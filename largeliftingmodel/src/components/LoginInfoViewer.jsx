// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"
import styles from "./Form.module.css";
import { useEffect } from "react";

const LoginInfoViewer = (props) => {
	useEffect(() => {
		// console.info(JSON.stringify(props))
	}, []);

	return (
		<div className={styles.view}>
			<div className={styles.form_description}>
				Login Details
				<hr />
			</div>
			<div className={styles.container}>
				<div className={styles.container_inline}>
					<label> First Name </label>
					<h2 className={styles.h2} data-testid="profileUserFirstNameForm">
						{" "}
						{props.profile.first_name}{" "}
					</h2>
				</div>
				<div className={styles.container_inline}>
					<label> Last Name </label>
					<h2 className={styles.h2} data-testid="profileUserLastNameForm">
						{" "}
						{props.profile.last_name}{" "}
					</h2>
				</div>
				<div className={styles.container_inline}>
					<label> Email </label>
					<h2 className={styles.h2} data-testid="profileUserEmailForm">
						{" "}
						{props.profile.email}{" "}
					</h2>
				</div>
			</div>
		</div>
	);
};

export default LoginInfoViewer;
