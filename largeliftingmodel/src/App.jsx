import {
	Navigate,
	Route,
	Routes,
	useLocation,
	useNavigate,
} from "react-router-dom";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Workout from "./pages/Workout";
import History from "./pages/History";
import PageNotFound from "./pages/PageNotFound";
import Register from "./pages/Register";
import { useLocalStorageState } from "./hooks/useLocalStorageState";
import HistoryDay from "./pages/HistoryDay";
import ProtectedRoute from "./components/ProtectedRoute";
import AppAPI from "./components/AppAPI";
import { useCallback, useEffect } from "react";
// import { useEffect } from "react";
// import { test } from "vitest";

const TIMER_BUFFER = 300;

function App() {
	// Global State Vars
	const [tokens, setTokens] = useLocalStorageState({}, "tokens");

	// create, view, finish
	const [workoutState, setWorkoutState] = useLocalStorageState(
		0,
		"workoutState"
	);

	const [workoutExists, setWorkoutExists] = useLocalStorageState(
		false,
		"workoutExists"
	);

	const [workout, setWorkout] = useLocalStorageState(
		AppAPI.emptyWorkout,
		"workout"
	);

	const [recommendation, setRecommendation] = useLocalStorageState(
		"",
		"recommendation"
	);

	const [user, setUser] = useLocalStorageState({}, "user");

	const navigate = useNavigate();
	const location = useLocation();

	// callback function for useEffect directly below; refreshes tokens
	const refreshTokens = useCallback(async () => {
		if (AppAPI.useTestServer) {
			return;
		}
		try {
			const res = await AppAPI.post(
				"users/auth/token/refresh/",
				{
					refresh: tokens.refresh,
				},
				{
					"Content-Type": "application/json",
				},
				""
			);
			if (res) {
				const tokenObj = {
					...tokens,
					access: res.access,
					refresh: res.refresh,
					tokenReceivedTimeInSec: Math.floor(Date.now() / 1000),
				};
				// setTimeout(res.expires);
				setTokens(tokenObj);
			}
		} catch (error) {
			console.error("Error during login");
		}
	}, [tokens, setTokens]);

	// Determine when to refresh tokens
	useEffect(() => {
		const timer = setInterval(() => {
			if (Object.keys(tokens).length > 0) {
				const expiration_time = Math.floor(
					tokens.expires -
						TIMER_BUFFER -
						Date.now() / 1000 +
						tokens.tokenReceivedTimeInSec
				);
				if (expiration_time <= 0) {
					refreshTokens();
				}
			}
		}, 1000);

		return () => {
			clearInterval(timer);
		};
	}, [tokens, refreshTokens]);

	const handleLogin = async (token) => {
		if (AppAPI.useTestServer) {
			return;
		}
		let tokenObj = {};
		try {
			const res = await AppAPI.post(
				"users/auth/google/",
				{
					access_token: token,
				},
				{
					"Content-Type": "application/json",
				},
				""
			);
			if (res) {
				tokenObj = {
					google: token,
					access: res.access,
					refresh: res.refresh,
					expires: res.expires,
					tokenReceivedTimeInSec: Math.floor(Date.now() / 1000),
				};
				// setTimeout(res.expires);
				setTokens(tokenObj);
			}
			const userProfile = await AppAPI.get("users/profile/", {
				"Content-Type": "application/json",
				Authorization: `Bearer ${res.access}`,
			});
			setUser(userProfile);
			const redirectTo = userProfile.is_new
				? "/register"
				: location.state?.from?.pathname || "/home";

			navigate(redirectTo, { replace: true });
		} catch (error) {
			console.error("Error during login");
		}
	};

	return (
		<Routes>
			{/* Public Routes */}
			<Route
				path="/"
				element={tokens.google ? <Navigate to="/home" /> : <Landing />}
			/>
			<Route
				path="login"
				element={
					tokens.google ? (
						<Navigate to="/home" />
					) : (
						<Login token={tokens.google} handleLogin={handleLogin} />
					)
				}
			/>

			{/* Protected Routes */}
			<>
				<Route
					path="home"
					element={
						<ProtectedRoute token={tokens.google}>
							<Home
								user={user}
								token={tokens.access}
								recommendation={recommendation}
								setRecommendation={setRecommendation}
								setWorkout={setWorkout}
								setWorkoutState={setWorkoutState}
							/>
						</ProtectedRoute>
					}
				/>
				<Route
					path="workout"
					element={
						<ProtectedRoute token={tokens.google}>
							<Workout
								workoutState={workoutState}
								setWorkoutState={setWorkoutState}
								workoutExists={workoutExists}
								setWorkoutExists={setWorkoutExists}
								workout={workout}
								setWorkout={setWorkout}
							/>
						</ProtectedRoute>
					}
				/>
				<Route
					path="history"
					element={
						<ProtectedRoute token={tokens.google}>
							<History />
						</ProtectedRoute>
					}
				/>
				<Route
					path="historyDay"
					element={
						<ProtectedRoute token={tokens.google}>
							<HistoryDay />
						</ProtectedRoute>
					}
				/>
				<Route
					path="profile"
					element={
						<ProtectedRoute token={tokens.google}>
							<Profile user={user} setUser={setUser} />
						</ProtectedRoute>
					}
				/>
				<Route
					path="register"
					element={
						<ProtectedRoute token={tokens.google}>
							<Register user={user} setUser={setUser} />
						</ProtectedRoute>
					}
				/>
			</>

			<Route path="*" element={<PageNotFound token={tokens.google} />} />
		</Routes>
	);
}

export default App;
