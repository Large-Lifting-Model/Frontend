import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";
import Logo from "./Logo";

function PageNav() {
	return (
		<nav className={styles.nav}>
			<Logo link="/" />
			<ul>
				{/* <li>
					<NavLink to="/">Main</NavLink>
				</li> */}
				<li>
					<NavLink to="/login">Login</NavLink>
				</li>
				<li>
					<NavLink to="/register">Register</NavLink>
				</li>
			</ul>
		</nav>
	);
}

export default PageNav;
