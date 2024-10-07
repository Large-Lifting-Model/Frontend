import { useNavigate } from "react-router-dom";
import PageNav from "../components/PageNav";
import styles from "./Workout.module.css";
import buttonStyles from "../components/Button.module.css";
import React, { useEffect, useState } from 'react';

function Workout() {

	const dummyText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eget posuere lacus. Donec ut ultrices nisi, ac auctor nisl. Maecenas ultrices scelerisque libero vitae efficitur. Praesent ac condimentum erat. Integer facilisis est lobortis tortor malesuada convallis. Sed finibus, lorem porta porttitor ultricies, enim dui luctus lorem, cursus sodales dolor turpis nec enim. Nullam euismod condimentum nisl, sit amet cursus justo viverra at. Mauris eu velit ac lacus dignissim aliquet. Donec nec quam ultrices augue consectetur hendrerit in eget ex. Integer sed justo non erat tempus pharetra. Fusce vel arcu sit amet nibh blandit tempus accumsan venenatis felis. In venenatis eros a erat gravida venenatis. Phasellus sapien sem, tincidunt eu purus pellentesque, porttitor aliquet ante. Ut iaculis, diam at mattis malesuada, metus metus pulvinar lectus, vel porttitor odio turpis et augue. Nam et fringilla mi. Nullam vel odio eget diam luctus auctor. Morbi at dolor suscipit, tristique nisl in, pretium turpis. Vivamus aliquam diam semper ex eleifend, vel auctor dolor mattis. Integer varius condimentum tempor. Nulla bibendum metus eu quam blandit vehicula. Aenean eu hendrerit sem, id pretium dui. Aliquam lobortis porta risus vel aliquam. Curabitur at pretium arcu, sit amet suscipit magna. Nulla pharetra velit quis imperdiet facilisis. Donec tincidunt eget magna eget vehicula. Phasellus feugiat ipsum metus, at aliquet ante eleifend eget. Curabitur ut velit vel lacus luctus gravida. Cras ultrices est ante, nec ultricies ligula sodales eget. Praesent aliquam est sed ornare convallis. Nam at nulla orci. Sed non sem cursus, accumsan risus eu, varius ipsum. Integer eros nisi, tincidunt sed metus et, bibendum posuere magna. Duis congue non turpis nec dictum. Mauris vehicula in dolor efficitur volutpat. Praesent dignissim maximus feugiat. Cras vel aliquet metus. Etiam et turpis arcu. In augue quam, hendrerit quis consectetur vel, accumsan et nunc. Vivamus facilisis vel libero sed posuere. Maecenas non orci ut enim gravida ornare. Proin sagittis felis non ante rhoncus malesuada. Curabitur sit amet cursus massa, sit amet efficitur est. Aenean at facilisis dui. Nam nec eros sed erat congue maximus."

	const [workout, setWorkout] = useState('');
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);

	const navigate = useNavigate();

	useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await fetch('https://THASDKAHSDKAB'); // Replace with your API URL
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setWorkout(result);
            } catch (error) {
                setError(error);
				// TBD - error should create an alert
				setWorkout(dummyText);
				// TBD - remove dummy text

            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

	const handleClick = (buttonName) => {
		switch(buttonName) {
			case 'cancel':
				alert('cancel')
				break;

			case 'approve':
				alert('approve')
				break;
				
			case 'feedback':
				alert('feedback')
				navigate('/feedback')
				break;
		}
	};

	return (
		<main className={styles.workout}>
			<PageNav />
			<section>
				<h2>
					Here is your current workout
				</h2>
				<div className={styles.scrollview}>
					<h3>
						${workout}
					</h3>
				</div>
				<label>
				What would you like to do?
				</label>
				<div style={workoutStyles.container}>
					<button type="button" className={buttonStyles.back} onClick={() => handleClick('cancel')}>Cancel</button>
					<button type="button" className={buttonStyles.primary} onClick={() => handleClick('approve')}>Looks Good!</button>
					<button type="button" className={buttonStyles.primary} onClick={() => handleClick('feedback')}>Needs work...</button>
				</div>
			</section>
		</main>
	);

}

const workoutStyles = {
    
	container: {
        display: 'flex',
        gap: '5.0rem',
		justifyContent: 'center',
		padding: '2.5rem',
    },

	scroller: {
		height: '20.0rem',
		overflowY : 'scroll',
		border: '1.0rem',
	}
	
};

export default Workout;
