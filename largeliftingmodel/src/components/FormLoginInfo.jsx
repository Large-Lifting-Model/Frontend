// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useState } from "react";

import styles from "./Form.module.css";
import { Link } from "react-router-dom";
import FormLoginInfoCore from "./FormLoginInfoCore";
import { useNavigate } from "react-router-dom";

const dummyLoginInfo = {
	first_name: "",
	last_name: "",
	email: "",
};

function FormLoginInfo() {
	const navigate = useNavigate();

	const [loginInfo, setLoginInfo] = useState(dummyLoginInfo);

	const handleSubmit = (event) => {
		// prevents page refresh
		event.preventDefault();
		navigate("../HealthInfo");
		setLoginInfo(dummyLoginInfo);
	};

	return (
		<>
			<div className={styles.form_description}>
				Enter your details to get started
			</div>
			<form className={styles.form}>
				<FormLoginInfoCore user={loginInfo} setUser={setLoginInfo} />
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

export default FormLoginInfo;
