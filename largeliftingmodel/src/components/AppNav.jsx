import { NavLink } from "react-router-dom";
import styles from "./AppNav.module.css";
import Logo from "./Logo";
import React from 'react'


function AppNav() {
	return (
		<nav className={styles.nav}>
			<Logo link="/home" />
			<ul>
				<li>
					<NavLink to="/home">Home</NavLink>
				</li>
				<li>
					<NavLink to="/create">Create Workout</NavLink>
				</li>
				<li>
					<NavLink to="/history">Past Workouts</NavLink>
				</li>
				<li>
					<NavLink to="/profile">Profile</NavLink>
				</li>
			</ul>
		</nav>
	);
}

export default AppNav;
