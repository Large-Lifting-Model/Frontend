import { Link } from "react-router-dom";
import styles from "./Logo.module.css";

function Logo({ link }) {
	return (
		<div className={styles.logo}>
			<Link to={link}>
				<img src="/Logo.png" alt="LLM Logo" className={styles.img} />
			</Link>
			<h3>Large Lifting Model</h3>
		</div>
	);
}

export default Logo;
