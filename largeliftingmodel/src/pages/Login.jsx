import PageNav from "../components/PageNav";
import FormLogin from "../components/FormLogin";

function Login({ token, handleLogin }) {
	return (
		<div>
			<PageNav />
			<FormLogin token={token} handleLogin={handleLogin} />
		</div>
	);
}

export default Login;
