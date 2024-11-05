import styles from "./Form.module.css";
import buttonStyles from "../components/Button.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StarRating from "./StarRating";

function Feedback({ setWorkoutState, setWorkoutExists }) {
	const navigate = useNavigate();
	const [feedback, setFeedback] = useState("");
	const [howlong, setHowlong] = useState("");
	const [rating, setRating] = useState(0);

	const handleSubmit = () => {
		console.log(rating);
		setWorkoutExists(false);
		setWorkoutState(0);
		setFeedback(""); // Clear the input after submission
		setHowlong("");
		navigate("/home");
	};

	return (
		<>
			<form className={styles.form} method="post" onSubmit={handleSubmit}>
				<div className={styles.container_inline}>
					<label>Rate your workout: </label>
					<StarRating size={40} ratingSetter={setRating} />
				</div>
				<div className={styles.container_inline}>
					<label>How long did it take (mins)?</label>
					<input
						name="howlongText"
						onChange={(e) => setHowlong(e.target.value)}
						value={howlong}
					/>
				</div>
				<label>What did you think about this workout?</label>
				<input
					name="feedbackText"
					onChange={(e) => setFeedback(e.target.value)}
					value={feedback}
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
