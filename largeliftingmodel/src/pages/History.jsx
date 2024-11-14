import AppNav from "../components/AppNav";
import Calendar from 'react-calendar';
import styles from "./History.module.css";
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
//import testWorkout from "../testWorkout.json"; // delete once we call API
import AppAPI from "../components/AppAPI";
import Loader from "../components/Loader";
import useLoader from "../hooks/useLoader";

function History() {
	const navigate = useNavigate();
	const [workoutDays, setWorkoutDays] = useState([]);
	const { error, isLoading, withLoader } = useLoader();

	useEffect(() => {
		getWorkoutDays()
	},[])

	const getWorkoutDays = async () => {
		await withLoader(async () => {
			const workoutList = await AppAPI.getAllWorkouts();
			if (Object.keys(workoutList).length === 0) {	
				console.info("returnedWorkoutList is empty")
				setWorkoutDays([])
			} else {
				console.info("workoutlist contains " + workoutList.length + " workouts")
				//console.info(JSON.stringify(workoutList))
				const returnedDict = workoutList.reduce((acc, workoutListElement) => {
					const createdYMD = workoutListElement.created.slice(0, 10)
					//console.info(createdYMD.toString())
					if (!acc[createdYMD]) {
						acc[createdYMD] = [workoutListElement]
					} else {
						acc[createdYMD].push(workoutListElement)
					}
					return acc
				}, {});
				const returnedWorkoutDays = Object.entries(returnedDict).map(([key, value]) => ({
					date: new Date(key),
					workouts: value
				}));
				console.info("workoutDays contains " + returnedWorkoutDays.length + " days")
				setWorkoutDays(returnedWorkoutDays)
			}
		})
	}

	// Use API Call to get dates and past workouts
	// const workoutDays = [
	// 	{ date: new Date(2024, 9, 6), workouts: [testWorkout.workout, testWorkout.workout] },
	// 	{ date: new Date(2024, 9, 10), workouts: [testWorkout.workout] },
	// 	{ date: new Date(2024, 9, 15), workouts: [testWorkout.workout, testWorkout.workout, testWorkout.workout] },
	// ];

	const handleClickDay = (selectedDay) => {
		const today = new Date();
		if(selectedDay > today) {
			return;
		}

		const year = selectedDay.getFullYear();
		const month = (selectedDay.getMonth() + 1).toString().padStart(2, '0');
		const day = selectedDay.getDate().toString().padStart(2, '0');
		const formattedDate = `${year}-${month}-${day}`

		alert(`The date you selected is: ${formattedDate}`);

		const selectedWorkouts = workoutDays.find(
			(workoutDay) => 
				workoutDay.date.getFullYear() === selectedDay.getFullYear() &&
				workoutDay.date.getMonth() === selectedDay.getMonth() &&
				workoutDay.date.getDate() === selectedDay.getDate()
		)?.workouts || [];

		navigate('../historyDay', {state: {selectedDate: formattedDate, workouts: selectedWorkouts}});
	};

	const isWorkoutDay = (date) => {
		return workoutDays.some(
			(workoutDate) =>
				workoutDate.date.getFullYear() === date.getFullYear() &&
				workoutDate.date.getMonth() === date.getMonth() &&
				workoutDate.date.getDate() === date.getDate()
		)
	}

	const isToday = (date) => {
		const today = new Date();
		return (
			date.getDate() === today.getDate() &&
			date.getMonth() === today.getMonth() &&
			date.getFullYear() === today.getFullYear()
		)
	}

	const isPastDay = (date) => {
		const today = new Date();
		return date < today;
	};

	const isFutureDay = (date) => {
		const today = new Date();
		return date > today;
	};

	return (
		<Loader error={error} isLoading={isLoading}>
			<AppNav />
			<div className={styles.historyPage}>
				<div className={styles.description}>Workout History</div>
				<div className={styles.subDescription}>Select a date to see the workout you did that day!</div>
				<Calendar 
					className={styles.calendar} 
					onClickDay={handleClickDay}
					tileClassName={({ date, view }) => {
						if (view === 'month') {
							if (isToday(date)) return styles['current-day'];
							if (isWorkoutDay(date)) return styles['workout-day'];
							if (isPastDay(date)) return styles['past-day'];
							if (isFutureDay(date)) return styles['future-day']
						}
						return "";
					}}
					calendarType='gregory'
					tileDisabled={({ date }) => isFutureDay(date)}
				/>
			</div>
		</Loader>
	);
}

export default History;
