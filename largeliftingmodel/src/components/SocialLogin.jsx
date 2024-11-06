import User from "../components/User";
import { LoginSocialGoogle } from "reactjs-social-login";
import { GoogleLoginButton } from "react-social-login-buttons";

const SocialLogin = ({ token, handleLogin }) => {
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
							handleLogin(data.access_token);
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
