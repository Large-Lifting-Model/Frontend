import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
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
	const [googleAccessToken, setGoogleAccessToken] = useLocalStorageState(
		"",
		"googleAccessToken"
	);

	const [accessToken, setAccessToken] = useLocalStorageState(
		"",
		"accessToken"
	);
	const [refreshToken, setRefreshToken] = useLocalStorageState(
		"",
		"refreshToken"
	);
	const [refreshTime, setRefreshTime] = useLocalStorageState(
		"",
		"refreshTime"
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
				<Route
					path="/"
					element={
						googleAccessToken ? <Navigate to="/home" /> : <Landing />
					}
				/>
				<Route
					path="login"
					element={
						googleAccessToken ? (
							<Navigate to="/home" />
						) : (
							<Login
								token={googleAccessToken}
								setToken={setGoogleAccessToken}
							/>
						)
					}
				/>

				{/* Protected Routes */}
				<>
					<Route
						path="home"
						element={
							<ProtectedRoute token={googleAccessToken}>
								<Home />
							</ProtectedRoute>
						}
					/>
					<Route
						path="workout"
						element={
							<ProtectedRoute token={googleAccessToken}>
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
							<ProtectedRoute token={googleAccessToken}>
								<History />
							</ProtectedRoute>
						}
					/>
					<Route
						path="historyDay"
						element={
							<ProtectedRoute token={googleAccessToken}>
								<HistoryDay />
							</ProtectedRoute>
						}
					/>
					<Route
						path="profile"
						element={
							<ProtectedRoute token={googleAccessToken}>
								<Profile />
							</ProtectedRoute>
						}
					/>
				</>

				<Route
					path="*"
					element={<PageNotFound token={googleAccessToken} />}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
