import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";
import Logo from "./Logo";

function PageNav() {
	return (
		<nav className={styles.nav}>
			<Logo link="/" />
			<ul>
				<li>
					<NavLink to="/">Large Lifting Model</NavLink>
				</li>
				<li>
					<NavLink to="/login">Login / Register</NavLink>
				</li>
			</ul>
		</nav>
	);
}

export default PageNav;
