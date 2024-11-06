import styles from "./Create.module.css";
import buttonStyles from "../components/Button.module.css";
import Select from "react-select";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
import { useState } from "react";

function Create({ setWorkoutState, workoutExists, setWorkoutExists }) {
	const [length, setLength] = useLocalStorageState("", "workoutLength");
	const [difficulty, setDifficuty] = useLocalStorageState(
		"",
		"workoutDifficulty"
	);
	const [workoutType, setWorkoutType] = useLocalStorageState(
		"",
		"workoutType"
	);
	const [equipmentAccess, setEquipmentAccess] = useLocalStorageState(
		"",
		"workoutEquipmentAccess"
	);
	const [targetMuscle, setMuscleTarget] = useLocalStorageState(
		"",
		"workoutTargetMuscle"
	);
	const [includeExercise, setIncludeExercise] = useLocalStorageState(
		"",
		"workoutIncludeExercise"
	);
	const [excludeExercise, setExcludeExercise] = useLocalStorageState(
		"",
		"workoutExcludeExercise"
	);
	const [considerations, setConsiderations] = useLocalStorageState(
		"",
		"workoutConsiderations"
	);

	const [showOtherWorkoutType, setShowOtherWorkoutType] = useState(false);
	const [showOtherEquipment, setShowOtherEquipment] = useState(false);

	const difficultyOptions = [
		{ value: "easy", label: "Easy" },
		{ value: "medium", label: "Medium" },
		{ value: "hard", label: "Hard" },
	];

	const workoutTypeOptions = [
		{ value: "weights", label: "Weights" },
		{ value: "cardio", label: "Cardio" },
		{ value: "circuit", label: "Circuit" },
		{ value: "crossfit", label: "Crossfit" },
		{ value: "yoga", label: "Yoga" },
		{ value: "other", label: "Other" },
	];

	const equipementAccessOptions = [
		{ value: "full gym", label: "Full Gym" },
		{ value: "limited gym", label: "Limited Gym" },
		{ value: "dumbbells", label: "Dumbbells only" },
		{ value: "no equipment", label: "No equipment" },
		{ value: "other", label: "Other" },
	];

	const handleCreate = () => {
		setWorkoutExists(true);
		setWorkoutState(1);
	};

	const handleModify = () => {
		window.confirm("Are you sure you want to erase the current workout?") &&
			setWorkoutExists(false);
	};

	const handleWorkoutTypeChange = (selectedOption) => {
		setWorkoutType(selectedOption);
		setShowOtherWorkoutType(selectedOption?.value === "other");
	}

	const handleEquipmentAccessChange = (selectedOption) => {
		setEquipmentAccess(selectedOption);
		setShowOtherEquipment(selectedOption?.value === "other");
	}

	return (
		<>
			<form className={styles.form}>
				<div className={styles.row}>
					<label htmlFor="length">Length (minutes): </label>
					<input
						id="length"
						type="text"
						onChange={(e) => setLength(e.target.value)}
						value={length}
						disabled={workoutExists}
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
						isDisabled={workoutExists}
					/>
				</div>
				<div className={styles.row}>
					<label htmlFor="workoutType">Select workout type: </label>
					<Select
						className={styles.dropdown}
						placeholder="Select Workout Type..."
						options={workoutTypeOptions}
						onChange={handleWorkoutTypeChange}
						value={showOtherWorkoutType ? {label: "Other", value: "other"} : workoutType}
						isDisabled={workoutExists}
					/>
				</div>
				{showOtherWorkoutType && (
					<div className={styles.row}>
						<label htmlFor="otherWorkoutType">
							Please specify workout type:
						</label>
						<input 
							id="otherWorkoutType"
							type="text"
							onChange={(e) => setWorkoutType({ value: e.target.value, label: e.target.value })}
							disabled={workoutExists}
						/>
					</div>
				)}
				<div className={styles.row}>
					<label htmlFor="equipmentAccess">
						What access to workout equipment do you have?{" "}
					</label>
					<Select
						className={styles.dropdown}
						placeholder="Select Equipment Access..."
						options={equipementAccessOptions}
						onChange={handleEquipmentAccessChange}
						value={showOtherEquipment ? {label: "Other", value: "other"} : equipmentAccess}
						isDisabled={workoutExists}
					/>
				</div>
				{showOtherEquipment && (
					<div className={styles.row}>
						<label htmlFor="otherEquipment">
							Please specify equipment access:
						</label>
						<input 
							id="otherEquipment"
							type="text"
							onChange={(e) => setEquipmentAccess({ value: e.target.value, label: e.target.value})}
							disabled={workoutExists}
						/>
					</div>
				)}
				<div className={styles.row}>
					<label htmlFor="targetMuscle">
						Enter muscles you would like to target:{" "}
					</label>
					<input
						id="targetMuscle"
						type="text"
						onChange={(e) => setMuscleTarget(e.target.value)}
						value={targetMuscle}
						disabled={workoutExists}
					/>
				</div>
				<div className={styles.row}>
					<label htmlFor="includeExercise">
						Enter any exercises you would like to INCLUDE in this workout:{" "}
					</label>
					<input
						id="includeExercise"
						type="text"
						onChange={(e) => setIncludeExercise(e.target.value)}
						value={includeExercise}
						disabled={workoutExists}
					/>
				</div>
				<div className={styles.row}>
					<label htmlFor="excludeExercise">
						Enter any exercises you would like to EXCLUDE in this workout:{" "}
					</label>
					<input
						id="excludeExercise"
						type="text"
						onChange={(e) => setExcludeExercise(e.target.value)}
						value={excludeExercise}
						disabled={workoutExists}
					/>
				</div>
				<div className={styles.row}>
					<label htmlFor="considerations">
						Enter any other considerations for this workout:{" "}
					</label>
					<input
						id="considerations"
						type="text"
						onChange={(e) => setConsiderations(e.target.value)}
						value={considerations}
						disabled={workoutExists}
					/>
				</div>
			</form>
			{workoutExists === true ? (
				<button
					className={`${buttonStyles.primary} ${styles.container}`}
					onClick={() => handleModify()}>
					Modify
				</button>
			) : (
				<>
					<button
						className={`${buttonStyles.primary} ${styles.container}`}
						onClick={() => handleCreate()}>
						CREATE WORKOUT
					</button>
				</>
			)}
		</>
	);
}

export default Create;
