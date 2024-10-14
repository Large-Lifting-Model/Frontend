// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useState } from "react";

import styles from "./Form.module.css";
import { Link } from "react-router-dom";
import Form_LoginInfo_Core from "./Form_LoginInfo_Core";
import {useNavigate} from "react-router-dom"


const dummyLoginInfo = {
	firstName: "",
	lastName: "",
	email: ""
};

function Form_LoginInfo() {

	const navigate = useNavigate();

	const [loginInfo, setLoginInfo] = useState(dummyLoginInfo);

	const handleSubmit = (event) => {
		// prevents page refresh
		event.preventDefault();
		alert(
			`Register button was clicked! User info:\nFirst Name: ${loginInfo.firstName}\nLast Name: ${loginInfo.lastName}\nEmail: ${loginInfo.email}\n`
		);
		navigate('../HealthInfo');
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
