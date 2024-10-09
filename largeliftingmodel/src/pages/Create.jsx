import AppNav from "../components/AppNav";
import { useState } from "react";
import styles from "./Create.module.css"
import { Link } from "react-router-dom";
import Select from "react-select";

function Create() {

	const [length, setLength] = useState("");
	const [difficulty, setDifficuty] = useState("");
	const [workoutType, setWorkoutType] = useState("");
	const [targetMuscle, setMuscleTarget] = useState("");
	const [includeExercise, setIncludeExercise] = useState("");
	const [excludeExercise, setExcludeExercise] = useState("");
	const [considerations, setConsiderations] = useState("");

	const difficultyOptions = [
		{value: "easy", label: "Easy"},
		{value: "medium", label: "Medium"},
		{value: "hard", label: "Hard"},
	]

	const workoutTypeOptions = [
		{value: "weights", label: "Weights"},
		{value: "cardio", label: "Cardio"},
		{value: "circuit", label: "Circuit"},
		{value: "crossfit", label: "Crossfit"},
		{value: "yoga", label: "Yoga"},
		{value: "any", label: "Any"},
	]

	const handleCreate = (event) => {
		alert(
			`Create button was clicked! Workout info:\nLength: ${length}\nDifficulty: ${difficulty}\nWorkout Type: ${workoutType}\nTarget Muscle: ${targetMuscle}\nExercise to Include: ${includeExercise}\nExercise to Exclude: ${excludeExercise}\nConsiderations: ${considerations}`
		)
	}

	return (
		<>
			<AppNav />
				<div className={styles.form_description}>
					Create Daily Workout
				</div>
				<form className={styles.form}>
					<div className={styles.row}>
						<label htmlFor="length">Length (minutes): </label>
						<input
							id="length"
							type="text"
							onChange={(e) => setLength(e.target.value)}
							value={length}
						/>
					</div>
					<div className={styles.row}>
						<label htmlFor="difficulty">Select difficulty: </label>
						<Select
							className={styles.dropdown}
							placeholder="Select Difficulty..."
							options={difficultyOptions}
							onChange={setDifficuty}
							value={difficulty}
						/>
					</div>
					<div className={styles.row}>
						<label htmlFor="workoutType">Select Workout Type: </label>
						<Select
							className={styles.dropdown}
							placeholder="Select Workout Type..."
							options={workoutTypeOptions}
							onChange={setWorkoutType}
							value={workoutType}
						/>
					</div>
					<div className={styles.row}>
						<label htmlFor="targetMuscle">Enter muscles you would like to target: </label>
						<input
							id="targetMuscle"
							type="text"
							onChange={(e) => setMuscleTarget(e.target.value)}
							value={targetMuscle}
						/>
					</div>
					<div className={styles.row}>
						<label htmlFor="includeExercise">Enter any exercises you would like to INCLUDE in this workout: </label>
						<input
							id="includeExercise"
							type="text"
							onChange={(e) => setIncludeExercise(e.target.value)}
							value={includeExercise}
						/>
					</div>
					<div className={styles.row}>
						<label htmlFor="excludeExercise">Enter any exercises you would like to EXCLUDE in this workout: </label>
						<input
							id="excludeExercise"
							type="text"
							onChange={(e) => setExcludeExercise(e.target.value)}
							value={excludeExercise}
						/>
					</div>					<div className={styles.row}>
						<label htmlFor="considerations">Enter any other considerations for this workout: </label>
						<input
							id="considerations"
							type="text"
							onChange={(e) => setConsiderations(e.target.value)}
							value={considerations}
						/>
					</div>
					<div className={styles.btn_bottom}>
					<Link to="/workout">
						<button className={styles.btn_create} onClick={(e) => handleCreate(e)}>
							CREATE WORKOUT
						</button>
					</Link>
					</div>
				</form>
		</>
	);
}

export default Create;
