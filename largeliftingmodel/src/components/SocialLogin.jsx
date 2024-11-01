import { useCallback, useState } from "react";
import User from "../components/User"; // component display user (see detail on /example directory)
import {
	LoginSocialGoogle,
	// LoginSocialAmazon,
	// LoginSocialFacebook,
	// LoginSocialGithub,
	// LoginSocialInstagram,
	// LoginSocialLinkedin,
	// LoginSocialMicrosoft,
	// LoginSocialPinterest,
	// LoginSocialTwitter,
	// LoginSocialApple,
	// LoginSocialTiktok,
} from "reactjs-social-login";

// CUSTOMIZE ANY UI BUTTON
import {
	// FacebookLoginButton,
	GoogleLoginButton,
	// GithubLoginButton,
	// AmazonLoginButton,
	// InstagramLoginButton,
	// LinkedInLoginButton,
	// MicrosoftLoginButton,
	// TwitterLoginButton,
	// AppleLoginButton,
} from "react-social-login-buttons";
import { useNavigate } from "react-router-dom";

// import { ReactComponent as PinterestLogo } from "./assets/pinterest.svg";
// import { ReactComponent as TiktokLogo } from "./assets/tiktok.svg";

// REDIRECT URL must be same with URL where the (reactjs-social-login) components is locate
// MAKE SURE the (reactjs-social-login) components aren't unmounted or destroyed before the ask permission dialog closes
// const REDIRECT_URI = window.location.href;

const SocialLogin = () => {
	const [provider, setProvider] = useState("");
	const [profile, setProfile] = useState(null);

	const onLoginStart = useCallback(() => {
		alert("login start");
	}, []);

	const onLogoutSuccess = useCallback(() => {
		setProfile(null);
		setProvider("");
		alert("logout success");
	}, []);

	const navigate = useNavigate();
	return (
		<>
			{provider && profile ? (
				<User
					provider={provider}
					profile={profile}
					onLogout={onLogoutSuccess}
				/>
			) : (
				<div className={`App ${provider && profile ? "hide" : ""}`}>
					{/* <h1 className="title">ReactJS Social Login</h1> */}
					{/* <LoginSocialFacebook
						isOnlyGetToken
						appId={env.REACT_APP_FB_APP_ID || ""}
						onLoginStart={onLoginStart}
						onResolve={({ provider, data }) => {
							setProvider(provider);
							setProfile(data);
						}}
						onReject={(err) => {
							console.log(err);
						}}>
						<FacebookLoginButton />
					</LoginSocialFacebook> */}

					<LoginSocialGoogle
						isOnlyGetToken
						client_id={import.meta.env.VITE_REACT_APP_GG_APP_ID || ""}
						onLoginStart={onLoginStart}
						onResolve={({ provider, data }) => {
							navigate("/home");
							setProvider(provider);
							setProfile(data);
							console.log(provider);
							console.log(data);
						}}
						onReject={(err) => {
							console.log(err);
						}}>
						<GoogleLoginButton />
					</LoginSocialGoogle>

					{/* <LoginSocialApple
						client_id={process.env.REACT_APP_APPLE_ID || ""}
						scope={"name email"}
						redirect_uri={REDIRECT_URI}
						onLoginStart={onLoginStart}
						onResolve={({ provider, data }) => {
							setProvider(provider);
							setProfile(data);
						}}
						onReject={(err) => {
							console.log(err);
						}}>
						<AppleLoginButton />
					</LoginSocialApple>

					<LoginSocialAmazon
						isOnlyGetToken
						client_id={process.env.REACT_APP_AMAZON_APP_ID || ""}
						redirect_uri={REDIRECT_URI}
						onResolve={({ provider, data }) => {
							setProvider(provider);
							setProfile(data);
						}}
						onReject={(err) => {
							console.log(err);
						}}
						onLoginStart={onLoginStart}>
						<AmazonLoginButton />
					</LoginSocialAmazon>

					<LoginSocialInstagram
						isOnlyGetToken
						client_id={process.env.REACT_APP_INSTAGRAM_APP_ID || ""}
						client_secret={
							process.env.REACT_APP_INSTAGRAM_APP_SECRET || ""
						}
						redirect_uri={REDIRECT_URI}
						onLoginStart={onLoginStart}
						onResolve={({ provider, data }) => {
							setProvider(provider);
							setProfile(data);
						}}
						onReject={(err) => {
							console.log(err);
						}}>
						<InstagramLoginButton />
					</LoginSocialInstagram>

					<LoginSocialMicrosoft
						isOnlyGetToken
						client_id={process.env.REACT_APP_MICROSOFT_APP_ID || ""}
						redirect_uri={REDIRECT_URI}
						onLoginStart={onLoginStart}
						onResolve={({ provider, data }) => {
							setProvider(provider);
							setProfile(data);
						}}
						onReject={(err) => {
							console.log(err);
						}}>
						<MicrosoftLoginButton />
					</LoginSocialMicrosoft>

					<LoginSocialLinkedin
						isOnlyGetToken
						client_id={process.env.REACT_APP_LINKEDIN_APP_ID || ""}
						client_secret={
							process.env.REACT_APP_LINKEDIN_APP_SECRET || ""
						}
						redirect_uri={REDIRECT_URI}
						onLoginStart={onLoginStart}
						onResolve={({ provider, data }) => {
							setProvider(provider);
							setProfile(data);
						}}
						onReject={(err) => {
							console.log(err);
						}}>
						<LinkedInLoginButton />
					</LoginSocialLinkedin>

					<LoginSocialGithub
						isOnlyGetToken
						client_id={process.env.REACT_APP_GITHUB_APP_ID || ""}
						client_secret={process.env.REACT_APP_GITHUB_APP_SECRET || ""}
						redirect_uri={REDIRECT_URI}
						onLoginStart={onLoginStart}
						onResolve={({ provider, data }) => {
							setProvider(provider);
							setProfile(data);
						}}
						onReject={(err) => {
							console.log(err);
						}}>
						<GithubLoginButton />
					</LoginSocialGithub>

					<LoginSocialPinterest
						isOnlyGetToken
						client_id={process.env.REACT_APP_PINTEREST_APP_ID || ""}
						client_secret={
							process.env.REACT_APP_PINTEREST_APP_SECRET || ""
						}
						redirect_uri={REDIRECT_URI}
						onLoginStart={onLoginStart}
						onResolve={({ provider, data }) => {
							setProvider(provider);
							setProfile(data);
						}}
						onReject={(err) => {
							console.log(err);
						}}
						className="pinterest-btn">
						<div className="content">
							<div className="icon">
								<PinterestLogo />
							</div>
							<span className="txt">Login With Pinterest</span>
						</div>
					</LoginSocialPinterest>

					<LoginSocialTwitter
						isOnlyGetToken
						client_id={process.env.REACT_APP_TWITTER_V2_APP_KEY || ""}
						redirect_uri={REDIRECT_URI}
						onLoginStart={onLoginStart}
						onResolve={({ provider, data }) => {
							setProvider(provider);
							setProfile(data);
						}}
						onReject={(err) => {
							console.log(err);
						}}>
						<TwitterLoginButton />
					</LoginSocialTwitter>

					<LoginSocialTiktok
						client_key={process.env.REACT_APP_TIKTOK_CLIENT_KEY}
						redirect_uri={REDIRECT_URI}
						onLoginStart={onLoginStart}
						onResolve={({ provider, data }) => {
							setProvider(provider);
							setProfile(data);
						}}
						onReject={(err) => {
							console.log(err);
						}}
						className="pinterest-btn">
						<div className="content">
							<div className="icon">
								<TiktokLogo />
							</div>
							<span className="txt">Login With Tiktok</span>
						</div>
					</LoginSocialTiktok> */}
				</div>
			)}
		</>
	);
};

export default SocialLogin;
