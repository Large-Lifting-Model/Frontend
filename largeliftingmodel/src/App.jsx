import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Workout from "./pages/Workout";
import History from "./pages/History";
import PageNotFound from "./pages/PageNotFound";
import { useLocalStorageState } from "./hooks/useLocalStorageState";
import HistoryDay from "./pages/HistoryDay";
import ProtectedRoute from "./components/ProtectedRoute";

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
				{/* Public Routes */}
				<Route path="/" element={<Landing />} />
				<Route
					path="login"
					element={<Login token={accessToken} setToken={setAccessToken} />}
				/>

				{/* Protected Routes */}
				<>
					<Route
						path="home"
						element={
							<ProtectedRoute token={accessToken}>
								<Home />
							</ProtectedRoute>
						}
					/>
					<Route
						path="workout"
						element={
							<ProtectedRoute token={accessToken}>
								<Workout
									workoutState={workoutState}
									setWorkoutState={setWorkoutState}
									workoutExists={workoutExists}
									setWorkoutExists={setWorkoutExists}
								/>
							</ProtectedRoute>
						}
					/>
					<Route
						path="history"
						element={
							<ProtectedRoute token={accessToken}>
								<History />
							</ProtectedRoute>
						}
					/>
					<Route
						path="historyDay"
						element={
							<ProtectedRoute token={accessToken}>
								<HistoryDay />
							</ProtectedRoute>
						}
					/>
					<Route
						path="profile"
						element={
							<ProtectedRoute token={accessToken}>
								<Profile />
							</ProtectedRoute>
						}
					/>
				</>

				<Route path="*" element={<PageNotFound token={accessToken} />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
