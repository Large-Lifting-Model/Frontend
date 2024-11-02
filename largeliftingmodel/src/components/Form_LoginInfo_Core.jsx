import styles from "./Form.module.css";
import { useEffect } from "react";
import React from "react";


const Form_LoginInfo_Core = ({user, setUser}) => {

	useEffect(() => {
		//console.info(JSON.stringify(user))
    }, []);

	const changeElement = (name, value) => {
		setUser({...user,
			[name]: value,
		});
	};

	return (
		<>

			<div className={styles.row}>
				<label htmlFor="first_name">First Name</label>
				<input
					id="first_name"
					type="text"
					onChange={(e) => changeElement('first_name', e.target.value)}
					value={user.first_name}
					data-testid='profileUserFirstNameForm' 
				/>
			</div>
			<div className={styles.row}>
				<label htmlFor="last_name">Last Name</label>
				<input
					id="last_name"
					type="text"
					onChange={(e) => changeElement('last_name', e.target.value)}
					value={user.last_name}
					data-testid='profileUserLastNameForm' 
				/>
			</div>
			<div className={styles.row}>
				<label htmlFor="email">Email</label>
				<input
					id="email"
					type="email"
					onChange={(e) => changeElement('email', e.target.value)}
					value={user.email}
					data-testid='profileUserEmailForm' 
				/>
			</div>
		</>
	);
}

export default Form_LoginInfo_Core;
