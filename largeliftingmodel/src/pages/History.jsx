import AppNav from "../components/AppNav";
import Calendar from 'react-calendar';
import styles from "./History.module.css";
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from "react-router-dom"

function History() {
	const navigate = useNavigate();

	// Use API Call to get dates and past workouts
	const workoutDays = [
		{ date: new Date(2024, 9, 6), workouts: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quis venenatis eros. Fusce maximus, sapien ac cursus gravida, lorem leo vulputate erat, sed porttitor nunc mi nec nunc. Fusce a commodo urna. Aliquam eu iaculis ex. Fusce malesuada luctus nibh vel sagittis. Nunc quis purus a risus tincidunt convallis nec ut orci. Nam ac tellus risus. Duis a venenatis lorem, sit amet rutrum erat. Nulla faucibus erat a efficitur pellentesque. Vestibulum quis dictum nisi, in luctus augue. Morbi a laoreet risus. Aliquam faucibus tortor at mattis suscipit.", 
																						 "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris commodo tempus aliquet. Phasellus aliquam pellentesque eros quis eleifend. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Quisque congue erat ipsum, tincidunt posuere mauris finibus ac. Cras efficitur, arcu tempus fringilla congue, mi nibh lacinia nunc, eget tempus velit nunc ac magna. Maecenas fermentum sit amet ante et rhoncus. Fusce aliquam felis sem, sit amet ultricies arcu molestie et. Proin et diam mi. Fusce aliquet, ante vel iaculis eleifend, orci arcu lacinia urna, rhoncus interdum nunc orci sit amet turpis. Ut id dui imperdiet, malesuada augue eu, imperdiet ipsum. Integer vitae tortor nec mauris pretium ultrices."] },
		{ date: new Date(2024, 9, 10), workouts: ["Workout 1"] },
		{ date: new Date(2024, 9, 15), workouts: ["Workout 1", "Workout 2", "Workout 3"] },
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
