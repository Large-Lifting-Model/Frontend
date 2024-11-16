import styles from "./Create.module.css";
import buttonStyles from "../components/Button.module.css";
import Select from "react-select";
import { useEffect, useState } from "react";
import AppAPI from "../components/AppAPI";
import Loader from "../components/Loader";
import useLoader from "../hooks/useLoader";
import { flushSync } from "react-dom";

function Create({
	setWorkoutState,
	workoutExists,
	setWorkoutExists,
	workout,
	setWorkout,
}) {
	const { error, isLoading, withLoader } = useLoader();
	const [otherWorkoutType, setOtherWorkoutType] = useState("");
	const [otherEquipmentAccess, setOtherEquipmentAccess] = useState("");
	const [showOtherWorkoutType, setShowOtherWorkoutType] = useState(false);
	const [showOtherEquipment, setShowOtherEquipment] = useState(false);
	// const [workoutDifficulty, setWorkoutDifficulty] = useState({
	// 	value: workout.difficulty,
	// 	label: workout.difficulty,
	// });
	// const [workoutType, setWorkoutType] = useState({
	// 	value: workout.workout_type,
	// 	label: workout.workout_type,
	// });
	// const [workoutEquipmentAccess, setWorkoutEquipmentAccess] = useState({
	// 	value: workout.equipment_access,
	// 	label: workout.equipment_access,
	// });

	const difficultyOptions = [
		{ value: "Easy", label: "Easy" },
		{ value: "Medium", label: "Medium" },
		{ value: "Hard", label: "Hard" },
	];

	const workoutTypeOptions = [
		{ value: "Weights", label: "Weights" },
		{ value: "Cardio", label: "Cardio" },
		{ value: "Circuits", label: "Circuits" },
		{ value: "Crossfit", label: "Crossfit" },
		{ value: "Yoga", label: "Yoga" },
		{ value: "other", label: "Other" },
	];

	const equipmentAccessOptions = [
		{ value: "Full Gym", label: "Full Gym" },
		{ value: "Limited Gym", label: "Limited Gym" },
		{ value: "Dumbbells", label: "Dumbbells only" },
		{ value: "No Equipment", label: "No equipment" },
		{ value: "other", label: "Other" },
	];

	const getOptionFromValue = (options, value) => {
		const option = options.find((option) => option.value === value);
		return option || { value, label: value };
	};

	useEffect(() => {
		// Read state from local storage when the component mounts
		const storedWorkout = localStorage.getItem("workout");
		const storedWorkoutState = localStorage.getItem("workoutState");
		const storedWorkoutExists = localStorage.getItem("workoutExists");

		if (storedWorkout) {
			setWorkout(JSON.parse(storedWorkout));
		} else {
			// Initialize with default values if not present in local storage
			setWorkout({
				length: "",
				difficulty: difficultyOptions[0].value,
				workout_type: workoutTypeOptions[0].value,
				equipment_access: equipmentAccessOptions[0].value,
				target_area: "",
				included_exercises: "",
				excluded_exercises: "",
				other_workout_considerations: "",
			});
		}
		if (storedWorkoutState) {
			setWorkoutState(JSON.parse(storedWorkoutState));
		}
		if (storedWorkoutExists) {
			setWorkoutExists(JSON.parse(storedWorkoutExists));
		}
	}, []);

	function getCreationWorkoutFromState() {
		//:" + JSON.stringify(workout))
		return {
			length: workout.length,
			difficulty: workout.difficulty,
			workout_type: workout.workout_type,
			target_area: workout.target_area,
			equipment_access: workout.equipment_access,
			included_exercises: workout.included_exercises,
			excluded_exercises: workout.excluded_exercises,
			other_workout_considerations: workout.other_workout_considerations,
		};
	}

	const handleCreate = async () => {
		await withLoader(async () => {
			const workoutToCreate = getCreationWorkoutFromState();
			const res = await AppAPI.createWorkout(workoutToCreate);
			//Workout" + JSON.stringify(res))
			flushSync(() => {
				// To avoid race conditions with setWorkoutState
				setWorkout(res);
				setWorkoutExists(true);
			});
			setWorkoutState(1);
		});
	};

	const handleModify = async () => {
		window.confirm(
			"Are you sure? This will delete the current state of the workout"
		) &&
			(await withLoader(async () => {
				await AppAPI.deleteWorkout(workout.id);
				flushSync(() => {
					setWorkoutExists(false);
				});
				setWorkoutState(0);
			}));
	};

	const handleWorkoutDifficultyChange = (selectedOption) => {
		// setWorkoutDifficulty(selectedOption);
		setWorkout({ ...workout, difficulty: selectedOption.value });
	};

	const handleWorkoutTypeChange = (selectedOption) => {
		if (selectedOption.value === "other") {
			setShowOtherWorkoutType(true);
			setOtherWorkoutType("");
		} else {
			setShowOtherWorkoutType(false);
			setWorkout({ ...workout, workout_type: selectedOption.value });
		}
	};

	const handleEquipmentAccessChange = (selectedOption) => {
		if (selectedOption.value === "other") {
			setShowOtherEquipment(true);
			setOtherEquipmentAccess("");
		} else {
			setShowOtherEquipment(false);
			setWorkout({ ...workout, equipment_access: selectedOption.value });
		}
	};

	const handleOtherWorkoutTypeChange = (e) => {
		setOtherWorkoutType(e.target.value);
		setWorkout({ ...workout, workout_type: e.target.value });
	};

	const handleOtherEquipmentAccessChange = (e) => {
		setOtherEquipmentAccess(e.target.value);
		setWorkout({ ...workout, equipment_access: e.target.value });
	};

	return (
		<>
			<Loader error={error} isLoading={isLoading}>
				<form className={styles.form}>
					<div className={styles.row}>
						<label htmlFor="length">Length (minutes): </label>
						<input
							id="length"
							type="text"
							onChange={(e) =>
								setWorkout({ ...workout, length: e.target.value })
							}
							value={workout.length || ""}
							disabled={workoutExists}
						/>
					</div>
					<div className={styles.row}>
						<label htmlFor="difficulty">Select difficulty: </label>
						<Select
							className={styles.dropdown}
							options={difficultyOptions}
							onChange={handleWorkoutDifficultyChange}
							value={
								getOptionFromValue(
									difficultyOptions,
									workout.difficulty
								) || difficultyOptions[0]
							}
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
							value={
								showOtherWorkoutType
									? { label: "Other", value: "other" }
									: getOptionFromValue(
											workoutTypeOptions,
											workout.workout_type
									  ) || workoutTypeOptions[0]
							}
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
								onChange={handleOtherWorkoutTypeChange}
								value={workout.workout_type || ""}
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
							options={equipmentAccessOptions}
							onChange={handleEquipmentAccessChange}
							value={
								getOptionFromValue(
									equipmentAccessOptions,
									workout.equipment_access
								) || equipmentAccessOptions[0]
							}
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
								onChange={handleOtherEquipmentAccessChange}
								value={workout.equipment_access || ""}
								disabled={workoutExists}
							/>
						</div>
					)}
					<div className={styles.row}>
						<label htmlFor="targetArea">
							Enter muscles you would like to target:{" "}
						</label>
						<input
							id="targetArea"
							type="text"
							onChange={(e) =>
								setWorkout({ ...workout, target_area: e.target.value })
							}
							value={workout.target_area || ""}
							disabled={workoutExists}
						/>
					</div>
					<div className={styles.row}>
						<label htmlFor="includeExercise">
							Enter any exercises you would like to INCLUDE in this
							workout:{" "}
						</label>
						<input
							id="includeExercise"
							type="text"
							onChange={(e) =>
								setWorkout({
									...workout,
									included_exercises: e.target.value,
								})
							}
							value={workout.included_exercises || ""}
							disabled={workoutExists}
						/>
					</div>
					<div className={styles.row}>
						<label htmlFor="excludeExercise">
							Enter any exercises you would like to EXCLUDE in this
							workout:{" "}
						</label>
						<input
							id="excludeExercise"
							type="text"
							onChange={(e) =>
								setWorkout({
									...workout,
									excluded_exercises: e.target.value,
								})
							}
							value={workout.excluded_exercises || ""}
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
							onChange={(e) =>
								setWorkout({
									...workout,
									other_workout_considerations: e.target.value,
								})
							}
							value={workout.other_workout_considerations || ""}
							disabled={workoutExists}
						/>
					</div>
				</form>
				{workoutExists === true ? (
					<button
						className={`${styles.btn_create} ${buttonStyles.primary}`}
						onClick={() => handleModify()}>
						Modify
					</button>
				) : (
					<>
						<button
							className={`${styles.btn_create} ${buttonStyles.primary}`}
							onClick={() => {
								handleCreate();
							}}>
							CREATE WORKOUT
						</button>
					</>
				)}
			</Loader>
		</>
	);
}

export default Create;
