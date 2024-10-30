import AppNav from "../components/AppNav";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from "./History.module.css";
import { useState } from "react";
import {useNavigate} from "react-router-dom"

function History() {

	const navigate = useNavigate();

	const [date, setDate] = useState("");

	const workoutDays = [
		new Date(2024, 9, 6),
		new Date(2024, 9, 10),
		new Date(2024, 9, 15),
	];

	const handleClickDay = (selectedDay) => {
		const year = selectedDay.getFullYear();
		const month = (selectedDay.getMonth() + 1).toString().padStart(2, '0');
		const day = selectedDay.getDate().toString().padStart(2, '0');

		const formattedDate = `${year}-${month}-${day}`

		setDate(formattedDate);
		alert(`The date you selected is: ${formattedDate}`);
		navigate('../historyDay', {state: {selectedDate: formattedDate, workoutDays}});
	};

	const isWorkoutDay = (date) => {
		return workoutDays.some(
			(workoutDate) =>
				workoutDate.getFullYear() === date.getFullYear() &&
				workoutDate.getMonth() === date.getMonth() &&
				workoutDate.getDate() === date.getDate()
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
			<div className={styles.form_description}>Workout History</div>
			<div className={styles.form_sub_description}>Select a date to see the workout you did that day!</div>
				<Calendar 
					className={styles.calendar} 
					onClickDay={handleClickDay}
					tileClassName={({ date, view }) => {
						if (view === 'month') {
							if (isToday(date)) return styles['current-day'];
							if (isWorkoutDay(date)) return styles['workout-day'];
							if (isPastDay(date)) return styles['past-day'];
							if (isFutureDay(date)) return styles['future-day']
						};
					}}
				/>
			</div>
		</div>
	);
}

export default History;
