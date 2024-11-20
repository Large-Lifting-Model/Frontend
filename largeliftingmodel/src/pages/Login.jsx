import PageNav from "../components/PageNav";
import FormLogin from "../components/FormLogin";
import styles from "../components/Form.module.css";

function Login({ token, handleLogin }) {
	return (
		<div className={styles.container}>
			<PageNav />
			<FormLogin token={token} handleLogin={handleLogin} />
			<div className={styles.instructions}>
				<h3>Can&apos;t login? Follow these steps:</h3>
				<ol>
					<li>
						Change your browser settings to allow sites marked as not
						secure
					</li>
					<li>Clear your browser&apos;s cache and cookies</li>
					<li>
						Navigate to the{" "}
						<a
							href="https://34.65.243.247:8000/"
							target="_blank"
							rel="noopener noreferrer">
							Large Lifting Model API Website,
						</a>
						and choose to &quot; to proceed to the unsafe site &quot;
					</li>
					<li>
						Close the API website and try to login again using the above
						button.
					</li>
				</ol>
			</div>
		</div>
	);
}

export default Login;
