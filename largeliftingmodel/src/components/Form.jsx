// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useState } from "react";

import styles from "./Form.module.css";
import { Link } from "react-router-dom";

function Form() {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [dob, setDob] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = (event) => {
		// prevents page refresh
		event.preventDefault();
		alert(
			`Register button was clicked! User info:\nFirst Name: ${firstName}\nLast Name: ${lastName}\nBirth Date: ${dob}\nEmail: ${email}\nPassword: ${password}`
		);
	};

	return (
		<>
			<div className={styles.form_description}>
				Enter your details to get started
			</div>
			<form className={styles.form}>
				<div className={styles.buttons_top}>
					<Link to="/">
						<button className={styles.btn}>&larr; Home</button>
					</Link>
				</div>
				<div className={styles.row}>
					<label htmlFor="firstName">First Name</label>
					<input
						id="firstName"
						type="text"
						onChange={(e) => setFirstName(e.target.value)}
						value={firstName}
					/>
				</div>
				<div className={styles.row}>
					<label htmlFor="lastName">Last Name</label>
					<input
						id="lastName"
						type="text"
						onChange={(e) => setLastName(e.target.value)}
						value={lastName}
					/>
				</div>
				<div className={styles.row}>
					<label htmlFor="dob">Birth Date</label>
					<input
						type="date"
						id="dob"
						onChange={(e) => setDob(e.target.value)}
						value={dob}
					/>
				</div>
				<div className={styles.row}>
					<label htmlFor="email">Email</label>
					<input
						id="email"
						type="email"
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

				<div className={styles.buttons_bottom}>
					<button className={styles.btn} onClick={(e) => handleSubmit(e)}>
						Register
					</button>
					<Link to="/">
						<button className={styles.btn}>&larr; Home</button>
					</Link>
				</div>
			</form>
			<p className={styles.paragraph}>
				Already Registered? <br />
				<Link to="/login" className={styles.link}>
					Sign In
				</Link>
			</p>
		</>
	);
}

export default Form;
