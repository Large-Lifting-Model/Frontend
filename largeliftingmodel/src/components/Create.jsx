import styles from "./Create.module.css";
import buttonStyles from "../components/Button.module.css";
import Select from "react-select";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
import { useState, useEffect } from "react";
import AppAPI from "../components/AppAPI"
import Loader from "../components/Loader";
import useLoader from "../hooks/useLoader";
import { flushSync } from 'react-dom';



function Create({ workoutState, setWorkoutState, workoutExists, setWorkoutExists, workout, setWorkout }) {
	const { error, isLoading, withLoader } = useLoader();

	const [showOtherWorkoutType, setShowOtherWorkoutType] = useState(false);
	const [showOtherEquipment, setShowOtherEquipment] = useState(false);
	const [workoutDifficulty, setWorkoutDifficulty] = useState({value: workout.difficulty, label: workout.difficulty})
	const [workoutType, setWorkoutType] = useState({value: workout.workout_type, label: workout.workout_type})
	const [workoutEquipmentAccess, setWorkoutEquipmentAccess] = useState({value: workout.equipment_access, label: workout.equipment_access})

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

	const equipementAccessOptions = [
		{ value: "Full Gym", label: "Full Gym" },
		{ value: "Limited Gym", label: "Limited Gym" },
		{ value: "Dumbbells", label: "Dumbbells only" },
		{ value: "No Equipment", label: "No equipment" },
		{ value: "other", label: "Other" },
	];

	function getCreationWorkoutFromState() {
		console.info("GetWorkoutFromState:" + JSON.stringify(workout))
		return {
			"length": workout.length,
			"difficulty": workout.difficulty,
			"workout_type": workout.workout_type,
			"target_area": workout.target_area,
			"equipment_access": workout.equipment_access,
			"included_exercises": workout.included_exercises,
			"excluded_exercises": workout.excluded_exercises,
			"other_workout_considerations": workout.other_workout_considerations,			
		}
	}

	const handleCreate = async () => {
		await withLoader(async () => {
			const workoutToCreate = getCreationWorkoutFromState()
			const res = await AppAPI.createWorkout(workoutToCreate)
			console.info("CreatedWorkout" + JSON.stringify(res))
			flushSync(() => { // To avoid race conditions with setWorkoutState
				setWorkout(res)
				setWorkoutExists(true)
			});
			setWorkoutState(1)
			
		})
	}

	const handleModify = async () => {
		window.confirm("Are you sure? This will delete the current state of the workout") &&
			await withLoader(async () => {
				await AppAPI.deleteWorkout(workout.id)
				flushSync(() => {
					setWorkoutExists(false);
				})
				setWorkoutState(0)

			})
	};

	const handleWorkoutDifficultyChange = (selectedOption) => {
		setWorkoutDifficulty(selectedOption)
		setWorkout({ ...workout, difficulty: selectedOption.value });
	}

	const handleWorkoutTypeChange = (selectedOption) => {
		setWorkoutType(selectedOption)
		setWorkout({ ...workout, workout_type: selectedOption.value });
		setShowOtherWorkoutType(selectedOption?.value === "other");
	}

	const handleEquipmentAccessChange = (selectedOption) => {
		setWorkoutEquipmentAccess(selectedOption)
		setWorkout({ ...workout, equipment_access: selectedOption.value });
		setShowOtherEquipment(selectedOption?.value === "other");
	}

	return (
		<>
			<Loader error={error} isLoading={isLoading}>
				<form className={styles.form}>
					<div className={styles.row}>
						<label htmlFor="length">Length (minutes): </label>
						<input
							id="length"
							type="text"
							onChange={(e) => setWorkout({ ...workout, length: e.target.value })}
							value={workout.length}
							disabled={workoutExists}
						/>
					</div>
					<div className={styles.row}>
						<label htmlFor="difficulty">Select difficulty: </label>
						<Select
							className={styles.dropdown}
							placeholder="Select Difficulty..."
							options={difficultyOptions}
							onChange={handleWorkoutDifficultyChange}
							value={workoutDifficulty}
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
								onChange={(e) => setWorkout({ ...workout, workout_type: e.target.value })}
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
							value={showOtherEquipment ? {label: "Other", value: "other"} : workoutEquipmentAccess}
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
								onChange={handleEquipmentAccessChange}
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
							onChange={(e) => setWorkout({ ...workout, target_area: e.target.value })}
							value={workout.target_area}
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
							onChange={(e) => setWorkout({ ...workout, included_exercises: e.target.value })}
							value={workout.included_exercises}
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
							onChange={(e) => setWorkout({ ...workout, excluded_exercises: e.target.value })}
							value={workout.excluded_exercises}
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
							onChange={(e) => setWorkout({ ...workout, other_workout_considerations: e.target.value })}
							value={workout.other_workout_considerations}
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
							onClick={() => {handleCreate();}}>
							CREATE WORKOUT
						</button>
					</>
				)}
			</Loader>
		</>
	);
}

export default Create;
