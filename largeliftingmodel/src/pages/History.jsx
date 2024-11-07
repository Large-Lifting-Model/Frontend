import AppNav from "../components/AppNav";
import Calendar from 'react-calendar';
import styles from "./History.module.css";
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from "react-router-dom"
import testWorkout from "../testWorkout.json"; // delete once we call API

function History() {
	const navigate = useNavigate();

	// Use API Call to get dates and past workouts
	const workoutDays = [
		{ date: new Date(2024, 9, 6), workouts: [testWorkout.workout, testWorkout.workout] },
		{ date: new Date(2024, 9, 10), workouts: [testWorkout.workout] },
		{ date: new Date(2024, 9, 15), workouts: [testWorkout.workout, testWorkout.workout, testWorkout.workout] },
	];

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
		<div>
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
		</div>
	);
}

export default History;
