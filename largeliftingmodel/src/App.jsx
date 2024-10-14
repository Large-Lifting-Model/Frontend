import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HealthInfo from "./pages/HealthInfo";
import Profile from "./pages/Profile";
import Create from "./pages/Create";
import Workout from "./pages/Workout";
import Feedback from "./pages/Feedback";
import History from "./pages/History";
import PageNotFound from "./pages/PageNotFound";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Landing />} />
				<Route path="home" element={<Home />} />
				<Route path="login" element={<Login />} />
				<Route path="register" element={<Register />} />
				<Route path="healthInfo" element={<HealthInfo />} />
				<Route path="profile" element={<Profile />} />
				<Route path="create" element={<Create />} />
				<Route path="workout" element={<Workout />} />
				<Route path="feedback" element={<Feedback />} />
				<Route path="history" element={<History />} />
				<Route path="*" element={<PageNotFound />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
