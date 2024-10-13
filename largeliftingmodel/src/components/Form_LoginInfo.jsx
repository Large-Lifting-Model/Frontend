// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useState } from "react";

import styles from "./Form.module.css";
import { Link } from "react-router-dom";
import Form_LoginInfo_Core from "./Form_LoginInfo_Core";

const dummyLoginInfo = {
	firstName: "",
	lastName: "",
	dob: "",
	email: "",
	password: ""
};

function Form_LoginInfo() {
	const [loginInfo, setLoginInfo] = useState(dummyLoginInfo);

	const handleSubmit = (event) => {
		// prevents page refresh
		event.preventDefault();
		alert(
			`Register button was clicked! User info:\nFirst Name: ${loginInfo.firstName}\nLast Name: ${loginInfo.lastName}\nBirth Date: ${loginInfo.dob}\nEmail: ${loginInfo.email}\nPassword: ${loginInfo.password}`
		);
		setLoginInfo(dummyLoginInfo)
	};

	return (
		<>
			<div className={styles.form_description}>
				Enter your details to get started
			</div>
			<form className={styles.form}>
				
				<Form_LoginInfo_Core loginInfo = {loginInfo} setLoginInfo = {setLoginInfo}/>
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
					Login
				</Link>
			</p>
		</>
	);
}

export default Form_LoginInfo;
