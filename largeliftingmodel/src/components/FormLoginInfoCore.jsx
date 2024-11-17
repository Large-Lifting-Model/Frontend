import styles from "./Form.module.css";
import { useEffect } from "react";

const FormLoginInfoCore = ({ profile, setProfile }) => {
	useEffect(() => {}, []);

	const changeElement = (name, value) => {
		setProfile({ ...profile, [name]: value });
	};

	return (
		<>
			<div className={styles.row}>
				<label htmlFor="first_name">First Name</label>
				<input
					id="first_name"
					type="text"
					onChange={(e) => changeElement("first_name", e.target.value)}
					value={profile.first_name}
					data-testid="profileUserFirstNameForm"
				/>
			</div>
			<div className={styles.row}>
				<label htmlFor="last_name">Last Name</label>
				<input
					id="last_name"
					type="text"
					onChange={(e) => changeElement("last_name", e.target.value)}
					value={profile.last_name}
					data-testid="profileUserLastNameForm"
				/>
			</div>
			<div className={styles.container}>
				<label> Email </label>
				<h2 className={styles.h2} data-testid="profileUserEmailForm">
					{" "}
					{profile.email}{" "}
				</h2>
			</div>
		</>
	);
};

export default FormLoginInfoCore;
