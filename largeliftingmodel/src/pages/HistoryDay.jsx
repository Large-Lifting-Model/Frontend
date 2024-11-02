import AppNav from "../components/AppNav";
import { useLocation, Link } from "react-router-dom";
import styles from "./History.module.css";
import { useState, useEffect } from "react";
import buttonStyles from "../components/Button.module.css"

function HistoryDay() {

  const dummyText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eget posuere lacus. Donec ut ultrices nisi, ac auctor nisl. Maecenas ultrices scelerisque libero vitae efficitur. Praesent ac condimentum erat. Integer facilisis est lobortis tortor malesuada convallis. Sed finibus, lorem porta porttitor ultricies, enim dui luctus lorem, cursus sodales dolor turpis nec enim. Nullam euismod condimentum nisl, sit amet cursus justo viverra at. Mauris eu velit ac lacus dignissim aliquet. Donec nec quam ultrices augue consectetur hendrerit in eget ex. Integer sed justo non erat tempus pharetra. Fusce vel arcu sit amet nibh blandit tempus accumsan venenatis felis. In venenatis eros a erat gravida venenatis. Phasellus sapien sem, tincidunt eu purus pellentesque, porttitor aliquet ante. Ut iaculis, diam at mattis malesuada, metus metus pulvinar lectus, vel porttitor odio turpis et augue. Nam et fringilla mi. Nullam vel odio eget diam luctus auctor. Morbi at dolor suscipit, tristique nisl in, pretium turpis. Vivamus aliquam diam semper ex eleifend, vel auctor dolor mattis. Integer varius condimentum tempor. Nulla bibendum metus eu quam blandit vehicula. Aenean eu hendrerit sem, id pretium dui. Aliquam lobortis porta risus vel aliquam. Curabitur at pretium arcu, sit amet suscipit magna. Nulla pharetra velit quis imperdiet facilisis. Donec tincidunt eget magna eget vehicula. Phasellus feugiat ipsum metus, at aliquet ante eleifend eget. Curabitur ut velit vel lacus luctus gravida. Cras ultrices est ante, nec ultricies ligula sodales eget. Praesent aliquam est sed ornare convallis. Nam at nulla orci. Sed non sem cursus, accumsan risus eu, varius ipsum. Integer eros nisi, tincidunt sed metus et, bibendum posuere magna. Duis congue non turpis nec dictum. Mauris vehicula in dolor efficitur volutpat. Praesent dignissim maximus feugiat. Cras vel aliquet metus. Etiam et turpis arcu. In augue quam, hendrerit quis consectetur vel, accumsan et nunc. Vivamus facilisis vel libero sed posuere. Maecenas non orci ut enim gravida ornare. Proin sagittis felis non ante rhoncus malesuada. Curabitur sit amet cursus massa, sit amet efficitur est. Aenean at facilisis dui. Nam nec eros sed erat congue maximus."
  const noWorkoutText = "No workout recorded for this day."

  const location = useLocation();
  const {selectedDate, workoutDays = [] } = location.state || {};

  const [workout, setWorkout] = useState("");

  const hasWorkout = workoutDays.some((workoutDate) =>
    workoutDate.toISOString().split("T")[0] === selectedDate
  );

  useEffect(() => {
    if (hasWorkout) {
      setWorkout(dummyText); // Replace with API data
    } else {
      setWorkout(noWorkoutText);
    }
  }, [hasWorkout]);

  return(
    <>
      <AppNav/>
      <div className={styles.historyPage}>
        <h2 className={styles.description}>
          {hasWorkout ? `Here is the workout for ${selectedDate}` : `No workout for ${selectedDate}`}
        </h2>
        <h3>
          {workout}
        </h3>
        <Link to="/history">
          <button className={buttonStyles.back}>Back</button>
        </Link>
      </div>
    </>

  );
};

export default HistoryDay