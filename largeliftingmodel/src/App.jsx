import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HealthInfo from "./pages/HealthInfo";
import Profile from "./pages/Profile";
import Create from "./components/Create";
import Workout from "./pages/Workout";
import Feedback from "./components/Feedback";
import History from "./pages/History";
import PageNotFound from "./pages/PageNotFound";
import { useLocalStorageState } from "./hooks/useLocalStorageState";
import HistoryDay from "./pages/HistoryDay";

function App() {
	// Global State Vars
	const [accessToken, setAccessToken] = useLocalStorageState(
		"",
		"accessToken"
	);

	// create, view, finish
	const [workoutState, setWorkoutState] = useLocalStorageState(
		0,
		"workoutState"
	);

	const [workoutExists, setWorkoutExists] = useLocalStorageState(
		false,
		"workoutExists"
	);

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Landing />} />
				{accessToken ? (
					<>
						<Route
							path="home"
							element={
								<Home token={accessToken} setToken={setAccessToken} />
							}
						/>
						<Route
							path="workout"
							element={
								<Workout
									token={accessToken}
									setToken={setAccessToken}
									workoutState={workoutState}
									setWorkoutState={setWorkoutState}
									workoutExists={workoutExists}
									setWorkoutExists={setWorkoutExists}
								/>
							}
						/>
						<Route
							path="history"
							element={
								<History
									token={accessToken}
									setToken={setAccessToken}
								/>
							}
						/>
						<Route
							path="profile"
							element={
								<Profile
									token={accessToken}
									setToken={setAccessToken}
								/>
							}
						/>
						<Route
							path="register"
							element={
								<Register
									token={accessToken}
									setToken={setAccessToken}
								/>
							}
						/>
						<Route
							path="healthInfo"
							element={
								<HealthInfo
									token={accessToken}
									setToken={setAccessToken}
								/>
							}
						/>
						<Route
							path="create"
							element={
								<Create token={accessToken} setToken={setAccessToken} />
							}
						/>
						<Route
							path="feedback"
							element={
								<Feedback
									token={accessToken}
									setToken={setAccessToken}
								/>
							}
						/>
					</>
				) : (
					<>
						<Route
							path="login"
							element={
								<Login token={accessToken} setToken={setAccessToken} />
							}
						/>
					</>
				)}
				<Route path="historyDay" element={<HistoryDay />} />
				<Route path="*" element={<PageNotFound />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
