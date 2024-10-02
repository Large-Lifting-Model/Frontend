// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useState } from "react";

import styles from "./Form.module.css";

function Form() {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [dob, setDob] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	return (
		<form className={styles.form}>
			<div className={styles.row}>
				<label htmlFor="firstName">First Name</label>
				<input
					id="firstName"
					onChange={(e) => setFirstName(e.target.value)}
					value={firstName}
				/>
			</div>
			<div className={styles.row}>
				<label htmlFor="lastName">Last Name</label>
				<input
					id="lastName"
					onChange={(e) => setLastName(e.target.value)}
					value={lastName}
				/>
			</div>
			<div className={styles.row}>
				<label htmlFor="dob">Birth Date</label>
				<input
					id="dob"
					onChange={(e) => setDob(e.target.value)}
					value={dob}
				/>
			</div>
			<div className={styles.row}>
				<label htmlFor="email">Email</label>
				<input
					id="email"
					onChange={(e) => setEmail(e.target.value)}
					value={email}
				/>
			</div>
			<div className={styles.row}>
				<label htmlFor="password">Password</label>
				<input
					type="password"
					id="password"
					onChange={(e) => setPassword(e.target.value)}
					value={password}
				/>
			</div>

			<div className={styles.buttons}>
				<button className={styles.btn}>Register</button>
				<button className={styles.btn}>&larr; Back</button>
			</div>
		</form>
	);
}

export default Form;
