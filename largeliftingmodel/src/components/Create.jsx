import styles from "./Create.module.css";
import buttonStyles from "../components/Button.module.css";
import Select from "react-select";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
import { useState } from "react";
import AppAPI from "../components/AppAPI"
import Loader from "../components/Loader";
import useLoader from "../hooks/useLoader";
import { flushSync } from 'react-dom';



function Create({ setWorkoutState, workoutExists, setWorkoutExists }) {
	const { error, isLoading, withLoader } = useLoader();

	// const [length, setLength] = useLocalStorageState("", "workoutLength");
	// const [difficulty, setDifficuty] = useLocalStorageState(
	// 	"",
	// 	"workoutDifficulty"
	// );
	// const [workoutType, setWorkoutType] = useLocalStorageState(
	// 	"",
	// 	"workoutType"
	// );
	// const [equipmentAccess, setEquipmentAccess] = useLocalStorageState(
	// 	"",
	// 	"workoutEquipmentAccess"
	// );
	// const [targetMuscle, setMuscleTarget] = useLocalStorageState(
	// 	"",
	// 	"workoutTargetMuscle"
	// );
	// const [includeExercise, setIncludeExercise] = useLocalStorageState(
	// 	"",
	// 	"workoutIncludeExercise"
	// );
	// const [excludeExercise, setExcludeExercise] = useLocalStorageState(
	// 	"",
	// 	"workoutExcludeExercise"
	// );
	// const [considerations, setConsiderations] = useLocalStorageState(
	// 	"",
	// 	"workoutConsiderations"
	// );

	const [workout, setWorkout] = useLocalStorageState(
		AppAPI.emptyWorkoutForState,
		"workout"
	)

	const [showOtherWorkoutType, setShowOtherWorkoutType] = useState(false);
	const [showOtherEquipment, setShowOtherEquipment] = useState(false);

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

	function getWorkoutFromState() {
		console.info("GetWorkoutFromState:" + JSON.stringify(workout))
		return {
			"length": workout.length,
			"difficulty": workout.difficulty.value,
			"workout_type": workout.workout_type.value,
			"target_area": workout.target_area,
			"equipment_access": workout.equipment_access.value,
			"included_exercises": workout.included_exercises,
			"excluded_exercises": workout.excluded_exercises,
			"other_workout_considerations": workout.other_workout_considerations,			
		}
	}

	// function getWorkoutFromTest() {
	// 	//console.info("GetWorkoutFromTest:" + JSON.stringify(AppAPI.testWorkoutForState))
	// 	return {
	// 		"id":AppAPI.testWorkoutForState.id,
   	// 		"user":AppAPI.testWorkoutForState.user,
   	// 		"created":AppAPI.testWorkoutForState.created,
	// 		"length": AppAPI.testWorkoutForState.length,
	// 		"difficulty": AppAPI.testWorkoutForState.difficulty.value,
	// 		"workout_type": AppAPI.testWorkoutForState.workout_type.value,
	// 		"target_area": AppAPI.testWorkoutForState.target_area,
	// 		"equipment_access": AppAPI.testWorkoutForState.equipment_access.value,
	// 		"included_exercises": AppAPI.testWorkoutForState.included_exercises,
	// 		"excluded_exercises": AppAPI.testWorkoutForState.excluded_exercises,
	// 		"other_workout_considerations": AppAPI.testWorkoutForState.other_workout_considerations,			
	// 	}
	// }


	// const handleCreate = async () => {
	// 	await withLoader(async () => {
	// 		const workoutToCreate = getWorkoutFromState()
	// 		console.info("Creating Workout: " + JSON.stringify(workoutToCreate))
	// 		const createdWorkoutReturn = await AppAPI.createWorkout(workoutToCreate)
	// 		console.info("returned: " + JSON.stringify(createdWorkoutReturn))
	// 		console.info("AboutToWrite")
	// 		const testWrite = AppAPI.testWorkoutForState
	// 		await setWorkout("THIS IS THE TEST WRITE")
	// 		console.info("ShouldHaveWrittenCHECK")
	// 		//setWorkout(JSON.stringify(createdWorkoutReturn))
	// 		setWorkoutExists(true);
	// 		setWorkoutState(1);
	// 	})
		
	// };

	const handleCreate = async () => {
		await withLoader(async () => {
			const workoutToCreate = getWorkoutFromState()
			const res = await AppAPI.createWorkout(workoutToCreate)
			flushSync(() => {
				setWorkout(res)
				setWorkoutExists(true)
			});
			setWorkoutState(1)
			
		})
	}

	const handleModify = async () => {
		window.confirm("Are you sure? This will delete the current state of the workout") &&
			await withLoader(async () => {
				console.info("Deleting Workout: " + JSON.stringify(workout))
				await AppAPI.deleteWorkout(workout.id)
				setWorkout(AppAPI.emptyWorkoutForState)
				setWorkoutExists(false);
			})
	};

	const handleWorkoutDifficultyChange = (selectedOption) => {
		setWorkout({ ...workout, difficulty: selectedOption });
	}

	const handleWorkoutTypeChange = (selectedOption) => {
		setWorkout({ ...workout, workout_type: selectedOption });
		setShowOtherWorkoutType(selectedOption?.value === "other");
	}

	const handleEquipmentAccessChange = (selectedOption) => {
		setWorkout({ ...workout, equipment_access: selectedOption });
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
							value={workout.difficulty}
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
							value={showOtherWorkoutType ? {label: "Other", value: "other"} : workout.workout_type}
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
							value={showOtherEquipment ? {label: "Other", value: "other"} : workout.equipment_access}
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
