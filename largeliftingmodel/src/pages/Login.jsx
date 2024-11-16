import PageNav from "../components/PageNav";
import FormLogin from "../components/FormLogin";
import styles from "../components/Form.module.css";

function Login({ token, handleLogin }) {
	return (
		<div className={styles.container}>
			<PageNav />
			<FormLogin token={token} handleLogin={handleLogin} />
		</div>
	);
}

export default Login;
