import styles from "./Form.module.css";
import buttonStyles from "../components/Button.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Feedback({ setWorkoutState, setWorkoutExists }) {
	const navigate = useNavigate();
	const [feedback, setFeedback] = useState("");
	const [howlong, setHowlong] = useState("");

	const handleSubmit = () => {
		setWorkoutExists(false);
		setWorkoutState(0);
		setFeedback(""); // Clear the input after submission
		setHowlong("");
		navigate("/home");
	};

	return (
		<>
			<form className={styles.form} method="post" onSubmit={handleSubmit}>
				<label>Star Rating Component to go here</label>
				<label>What did you think about this workout?</label>
				<input
					name="feedbackText"
					onChange={(e) => setFeedback(e.target.value)}
					value={feedback}
				/>
				<label>How long did it take?</label>
				<input
					name="howlongText"
					onChange={(e) => setHowlong(e.target.value)}
					value={howlong}
				/>
			</form>
			<button
				type="submit"
				onClick={() => handleSubmit()}
				className={`${buttonStyles.primary}`}>
				Submit
			</button>
		</>
	);
}

export default Feedback;
