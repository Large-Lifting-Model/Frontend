import styles from "./Create.module.css";
import buttonStyles from "../components/Button.module.css";
import Select from "react-select";
import { useEffect, useState } from "react";
import AppAPI from "../components/AppAPI";
import Loader from "../components/Loader";
import useLoader from "../hooks/useLoader";
import { flushSync } from "react-dom";

function Create({
	workoutState,
	setWorkoutState,
	workoutExists,
	setWorkoutExists,
	workout,
	setWorkout,
	user,
}) {
	const { error, isLoading, withLoader } = useLoader();
	const [showOtherWorkoutType, setShowOtherWorkoutType] = useState(false);
	const [showOtherEquipment, setShowOtherEquipment] = useState(false);

	const difficultyOptions = [
		{ value: "Easy", label: "Easy" },
		{ value: "Medium", label: "Medium" },
		{ value: "Hard", label: "Hard" },
	];

	const workoutTypeOptions = [
		{ value: "Resistance Training", label: "Resistance Training" },
		{ value: "Cardio", label: "Cardio" },
		{ value: "Circuits", label: "Circuits" },
		{ value: "Crossfit", label: "Crossfit" },
		{ value: "Yoga", label: "Yoga" },
		{ value: "Other", label: "Other" },
	];

	const equipmentAccessOptions = [
		{ value: "No Equipment", label: "No equipment" },
		{ value: "Dumbbells", label: "Dumbbells only" },
		{ value: "Limited Gym", label: "Limited Gym" },
		{ value: "Full Gym", label: "Full Gym" },
		{ value: "Other", label: "Other" },
	];

	const getOptionFromValue = (options, value) => {
		const option = options.find((option) => option.value === value);
		return option || { value, label: value };
	};

	const health_data = user.health_data;

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
		if (storedWorkoutState && workoutState === undefined) {
			setWorkoutState(JSON.parse(storedWorkoutState));
		}
		if (storedWorkoutExists) {
			setWorkoutExists(JSON.parse(storedWorkoutExists));
		}
	}, []);

	function getCreationWorkoutFromState() {
		//:" + JSON.stringify(workout))
		return {
			...workout,
		};
	}

	const handleCreate = async () => {
		// Validate required fields
		if (
			!workout.length ||
			isNaN(Number(workout.length)) ||
			Number(workout.length) <= 0
		) {
			alert("Please provide a valid workout length in minutes.");
			return;
		}
		if (!workout.difficulty) {
			alert("Please select a difficulty level.");
			return;
		}
		if (!workout.workout_type) {
			alert("Please select a workout type.");
			return;
		}
		if (!workout.equipment_access) {
			alert("Please specify equipment access.");
			return;
		}
		await withLoader(async () => {
			const workoutToCreate = getCreationWorkoutFromState();
			const res = await AppAPI.createWorkout(workoutToCreate);
			//Workout" + JSON.stringify(res))
			flushSync(() => {
				// To avoid race conditions with setWorkoutState
				setWorkout(res);
				setWorkoutExists(true);
			});
			if (workoutState !== 1) {
				setWorkoutState(1); // Only set if needed
			}
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
		} else {
			setShowOtherWorkoutType(false);
			setWorkout({ ...workout, workout_type: selectedOption.value });
		}
	};

	const handleEquipmentAccessChange = (selectedOption) => {
		if (selectedOption.value === "other") {
			setShowOtherEquipment(true);
		} else {
			setShowOtherEquipment(false);
			setWorkout({ ...workout, equipment_access: selectedOption.value });
		}
	};

	const handleOtherWorkoutTypeChange = (e) => {
		setWorkout({ ...workout, workout_type: e.target.value });
	};

	const handleOtherEquipmentAccessChange = (e) => {
		setWorkout({ ...workout, equipment_access: e.target.value });
	};

	return (
		<>
			<Loader error={error} isLoading={isLoading}>
				<form className={styles.form}>
					<div className={styles.row}>
						<label htmlFor="length">
							Length (minutes): <i style={{ opacity: 0.5 }}>required</i>
						</label>
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
						<label htmlFor="difficulty">
							Select difficulty: <i style={{ opacity: 0.5 }}>required</i>
						</label>
						<Select
							className={styles.dropdown}
							options={difficultyOptions}
							onChange={handleWorkoutDifficultyChange}
							value={
								getOptionFromValue(
									difficultyOptions,
									workout.difficulty
								).value === ""
									? health_data?.workout_experience === "Expert"
										? { label: "Hard", value: "Hard" }
										: health_data?.workout_experience ===
										  "Intermediate"
										? { label: "Medium", value: "Medium" }
										: { label: "Easy", value: "Easy" }
									: getOptionFromValue(
											difficultyOptions,
											workout.difficulty
									  )
							}
							isDisabled={workoutExists}
						/>
					</div>
					<div className={styles.row}>
						<label htmlFor="workoutType">
							Select workout type:{" "}
							<i style={{ opacity: 0.5 }}>required</i>
						</label>
						<Select
							className={styles.dropdown}
							placeholder="Select Workout Type..."
							options={workoutTypeOptions}
							onChange={handleWorkoutTypeChange}
							value={
								getOptionFromValue(
									workoutTypeOptions,
									workout.workout_type
								).value === ""
									? health_data.favourite_workout_type !== null ||
									  health_data?.favourite_workout_type !== undefined
										? {
												value: health_data.favourite_workout_type,
												label: health_data.favourite_workout_type,
										  }
										: workoutTypeOptions[0]
									: getOptionFromValue(
											workoutTypeOptions,
											workout.workout_type
									  )
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
								disabled={workoutExists}
							/>
						</div>
					)}
					<div className={styles.row}>
						<label htmlFor="equipmentAccess">
							What access to workout equipment do you have?{" "}
							<i style={{ opacity: 0.5 }}>required</i>
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
								).value === ""
									? equipmentAccessOptions[0]
									: getOptionFromValue(
											equipmentAccessOptions,
											workout.equipment_access
									  )
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
