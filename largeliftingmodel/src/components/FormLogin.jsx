// import { useState } from "react";
import styles from "./Form.module.css";
import { Link } from "react-router-dom";
import SocialLogin from "./SocialLogin";

function FormLogin({ token, setToken }) {
	return (
		<>
			<div className={styles.form_description}>Login to your account</div>
			<form className={styles.form}>
				<SocialLogin token={token} setToken={setToken} />
			</form>
			<p className={styles.paragraph}>
				Not registered yet? <br />
				<Link to="/register" className={styles.link}>
					Register
				</Link>
			</p>
		</>
	);
}

export default FormLogin;
