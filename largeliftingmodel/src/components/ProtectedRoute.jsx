import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ token, children }) {
	const location = useLocation();

	if (!token) {
		// Redirect to login page, preserving the path the user tried to access
		return <Navigate to="/login" state={{ from: location }} />;
	}

	return children;
}

export default ProtectedRoute;
