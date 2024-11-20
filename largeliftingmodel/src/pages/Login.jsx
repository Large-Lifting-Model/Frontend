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
						Navigate to the{" "}
						<a
							href="https://34.65.243.247:8000/"
							target="_blank"
							rel="noopener noreferrer">
							Large Lifting Model API Website,
						</a>
						and choose to &quot;proceed to the unsafe site&quot;
					</li>
					<li>
						Close the API website and try to login again using the above
						button.
					</li>
					<li>
						If you are still unable to login, you may need to change your
						browser settings to &quot;allow unsafe scripts&quot; or
						&quot;allow unsafe content&quot;, and you may need to clear
						your browser&apos;s cache and cookies.
					</li>
				</ol>
			</div>
		</div>
	);
}

export default Login;
