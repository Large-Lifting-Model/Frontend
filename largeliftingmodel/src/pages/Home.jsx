import AppNav from "../components/AppNav";

function Home({ token, setToken }) {
	return (
		<div>
			<AppNav token={token} setToken={setToken} />
			<div>Home</div>
		</div>
	);
}

export default Home;
