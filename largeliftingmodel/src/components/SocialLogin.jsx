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
						// google: need to add email as scope, currently only profile included in scope
						isOnlyGetToken
						client_id={import.meta.env.VITE_REACT_APP_GG_APP_ID || ""}
						scope="https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid"
						onResolve={({ data }) => {
							setToken(data.access_token);
							console.log(data);
							const redirectTo =
								location.state?.from?.pathname || "/home";
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
