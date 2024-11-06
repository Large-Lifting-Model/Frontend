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
import { useLocalStorageState } from "./hooks/useLocalStorageState";
import HistoryDay from "./pages/HistoryDay";
import ProtectedRoute from "./components/ProtectedRoute";
import AppAPI from "./components/AppAPI";

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

	const [user, setUser] = useLocalStorageState({}, "user");

	const navigate = useNavigate();
	const location = useLocation();

	const handleLogin = async (token) => {
		let tokenObj = {};
		try {
			const res = await AppAPI.post("LOGIN", {
				access_token: token,
			}, false);
			if (res) {
				console.info(JSON.stringify(token))
				console.info(JSON.stringify(res))
				tokenObj = {
					google: token,
					access: res.access,
					refresh: res.refresh,
				};
				setTokens(tokenObj);
			}
			//const userProfile = await AppAPI.get("PROFILE", res.access);
			const userProfile = await AppAPI.getWithToken("PROFILE", res.access);
			setUser(userProfile);
			const redirectTo = location.state?.from?.pathname || "/home";
			console.log(tokenObj);
			console.log(userProfile);
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
							<Home />
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
			</>

			<Route path="*" element={<PageNotFound token={tokens.google} />} />
		</Routes>
	);
}

export default App;
