import styles from "./Form.module.css";
import buttonStyles from "../components/Button.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StarRating from "./StarRating";
import AppAPI from "../components/AppAPI";
import Loader from "../components/Loader";
import useLoader from "../hooks/useLoader";
import { flushSync } from "react-dom";

function Feedback({
	workoutState,
	setWorkoutState,
	workoutExists,
	setWorkoutExists,
	workout,
	setWorkout,
}) {
	const { error, isLoading, withLoader } = useLoader();

	const navigate = useNavigate();
	const [feedback, setFeedback] = useState("");
	const [howlong, setHowlong] = useState("");
	const [rating, setRating] = useState(0);

	const handleSubmit = async () => {
		await withLoader(async () => {
			await AppAPI.rateWorkout(workout, rating, feedback, howlong);
			flushSync(() => {
				// To avoid race conditions with setWorkoutState
				setWorkout(AppAPI.emptyWorkout);
				setWorkoutExists(false);
				setFeedback(""); // Clear the input after submission
				setHowlong("");
			});
			setWorkoutState(0);
			navigate("/home");
		});
	};

	return (
		<Loader error={error} isLoading={isLoading}>
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
		</Loader>
	);
}

export default Feedback;
