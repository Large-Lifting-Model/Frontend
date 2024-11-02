import PageNav from "../components/PageNav";
import FormLogin from "../components/FormLogin";

function Login({ token, setToken }) {
	return (
		<div>
			<PageNav />
			<FormLogin token={token} setToken={setToken} />
		</div>
	);
}

export default Login;
