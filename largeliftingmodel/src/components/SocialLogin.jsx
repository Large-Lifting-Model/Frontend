import User from "../components/User";
import { LoginSocialGoogle } from "reactjs-social-login";
import { GoogleLoginButton } from "react-social-login-buttons";
import { useLocation, useNavigate } from "react-router-dom";

const SocialLogin = ({ token, setToken }) => {
	const navigate = useNavigate();
	const location = useLocation();

	return (
		<>
			{token ? (
				<User />
			) : (
				<div>
					<LoginSocialGoogle
						isOnlyGetToken
						client_id={import.meta.env.VITE_REACT_APP_GG_APP_ID || ""}
						onResolve={({ data }) => {
							setToken(data.access_token);
							const redirectTo =
								location.state?.from?.pathnam || "/home";
							navigate(redirectTo, { replace: true });
						}}
						onReject={(err) => {
							console.log(err);
						}}>
						<GoogleLoginButton />
					</LoginSocialGoogle>
				</div>
			)}
		</>
	);
};

export default SocialLogin;
