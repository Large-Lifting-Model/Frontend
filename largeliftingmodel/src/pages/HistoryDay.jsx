import AppNav from "../components/AppNav";
import { useLocation, Link } from "react-router-dom";
import buttonStyles from "../components/Button.module.css";
import styles from "./History.module.css";

function HistoryDay() {
  const location = useLocation();
  const { selectedDate, workouts = [] } = location.state || {};

  const formattedDate = new Date(selectedDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  })

  const workoutCountMessage = `${workouts.length} workout${workouts.length !== 1 ? 's' : ''} completed this day.`;

  return (
    <>
      <AppNav />
      <div className={styles.historyPage}>
        <h2 className={styles.description}>
          {`Workouts for ${formattedDate}`}
        </h2>
        <p className={styles.workoutCount}>{workoutCountMessage}</p>
        <div className={styles.workoutList}>
          {workouts.length > 0 ? (
            workouts.map((workout, index) => (
              <div key={index} className={styles.workoutBox}> 
                <h3 className={styles.workoutTitle}>
                  {`Workout ${index + 1}:`}
                </h3>
                {workout.map((exeriseObj, subIndex) => {
                  const exercise = exeriseObj.exercise || {}
                  return (
                    <div key={`${index}-${subIndex}`} className={styles.exerciseItem}>
                      <p>
                        <strong className={styles.exerciseName}>{exercise.name}</strong>
                        <strong className={styles.exerciseType}>{exercise.type}</strong>
                      </p>
                      <p className={styles.exerciseInfo}>{exercise.info}</p>
                    </div>
                  )
                })}
              </div>
            ))
          ) : (
            <p></p>
          )}
        </div>
        <Link to="/history">
          <button className={buttonStyles.back}>Back</button>
        </Link>
      </div>
    </>
  );
}

export default HistoryDay;

