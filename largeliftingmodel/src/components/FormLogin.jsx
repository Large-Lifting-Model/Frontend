
import { useState } from "react";
import styles from "./Form.module.css"
import { Link } from "react-router-dom";

function LoginForm() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
		// prevents page refresh
		event.preventDefault();
		alert(
			`Login button was clicked! User info:\nEmail: ${email}\nPassword: ${password}`
		);
	};

  return (
    <>
      <div className={styles.form_description}>
        Sign in to your account
      </div>
      <form className={styles.form}>
        <div className={styles.buttons_top}>
          <Link to="/">
            <button className={styles.btn}>&larr; Home</button>
          </Link>
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
						Login
					</button>
					<Link to="/">
						<button className={styles.btn}>&larr; Home</button>
					</Link>
				</div>
      </form>
      <p className={styles.paragraph}>
				Not registered yet? <br />
				<Link to="/register" className={styles.link}>
					Register
				</Link>
			</p>
    </>
  )
}

export default LoginForm;