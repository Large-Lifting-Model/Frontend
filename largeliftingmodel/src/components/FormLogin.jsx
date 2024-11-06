// import { useState } from "react";
import styles from "./Form.module.css";
import SocialLogin from "./SocialLogin";

function FormLogin({ token, handleLogin }) {
	return (
		<>
			<div className={styles.form_description}>
				Sign into your Google Account.<br></br>
				<p>
					If you are not registered, you can sign up after authenticating.
				</p>
			</div>
			<form className={styles.form}>
				<SocialLogin token={token} handleLogin={handleLogin} />
			</form>
		</>
	);
}

export default FormLogin;
