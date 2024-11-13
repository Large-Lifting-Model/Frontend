import FormHealthInfoCore from "../components/FormHealthInfoCore";
import FormHealthInfo from "../components/FormHealthInfo";
import AppNav from "../components/AppNav";
import { useState } from "react";

function Register({ user, setUser }) {
	const dummyHealthInfo = {
		dob: "",
		gender: "",
		height: 0,
		weight: 0,
		favourite_workout_type: "",
		workout_experience: "",
		fitness_goal: "",
		injuries: "",
		other_considerations: "",
	};
	const [healthInfo, setHealthInfo] = useState(dummyHealthInfo);

	return (
		<div>
			<AppNav />
			<FormHealthInfo
				user={user}
				setUser={setUser}
				healthInfo={healthInfo}
				setHealthInfo={setHealthInfo}>
				<FormHealthInfoCore
					healthInfo={healthInfo}
					setHealthInfo={setUser}
				/>
			</FormHealthInfo>
		</div>
	);
}

export default Register;
