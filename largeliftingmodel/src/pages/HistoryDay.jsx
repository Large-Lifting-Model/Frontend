import AppNav from "../components/AppNav";
import { useLocation, Link } from "react-router-dom";
import buttonStyles from "../components/Button.module.css";
import styles from "./History.module.css";
import Loader from "../components/Loader";
import useLoader from "../hooks/useLoader";

import AppAPI from "../components/AppAPI";

function HistoryDay() {
  const location = useLocation();
  const { selectedDate, workouts = [] } = location.state || {};
  const { error, isLoading, withLoader } = useLoader();

  const formattedDate = selectedDate
  const workoutCountMessage = `${workouts.length} workout${workouts.length !== 1 ? 's' : ''} completed this day.`;

  return (
		<Loader error={error} isLoading={isLoading}>
      <AppNav />
      <div className={styles.historyPage}>
        <h2 className={styles.description}>
          {`Workouts for ${formattedDate}`}
        </h2>
        <p className={styles.workoutCount}>{workoutCountMessage}</p>
        <div className={styles.workoutList}>
          {workouts && workouts.length > 0 ? (
            workouts.map((workout, index) => (
              <div key={index} className={styles.workoutBox}> 
                <h3 className={styles.workoutTitle}>
                  {`Workout ${index + 1}:`}
                </h3>
                { workout && AppAPI.convertWorkoutToExercises(workout).map((exeriseObj, subIndex) => {
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
    </Loader>
  );
}

export default HistoryDay;

