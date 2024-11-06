import { Navigate, useLocation } from "react-router-dom";
import AppAPI from './AppAPI'

function ProtectedRoute({ token, children }) {
	const location = useLocation();

	if (!token && (!AppAPI.useTestServer)) {
		// Redirect to login page, preserving the path the user tried to access
		return <Navigate to="/login" state={{ from: location }} replace />;
	}

	return children;
}

export default ProtectedRoute;
