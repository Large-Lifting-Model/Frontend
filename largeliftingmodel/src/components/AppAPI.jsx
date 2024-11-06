// import React from "react";

const isDevelopmentMode = process.env.NODE_ENV === "development";

class AppAPI {
	static useTestServer = import.meta.env.VITE_USE_TEST_SERVER == "1";
	static testUserID = "12903781273";
	static testServer = "http://localhost:3885/";
	static prodServer = "http://34.65.243.247/api/";
	static server = AppAPI.useTestServer ? AppAPI.testServer : AppAPI.prodServer;

	static TestRoutes = {
		PROFILE: "profile/",
	};

	static ProdRoutes = {
		PROFILE: "users/profile/",
		LOGIN: "users/auth/google/",
		LOGOUT: "users/auth/logout/",
	};

	static getProfileID() {
		return AppAPI.useTestServer ? AppAPI.testUserID : "";
	}

	static getRoute(pageName) {
		return AppAPI.useTestServer
			? AppAPI.TestRoutes[pageName]
			: AppAPI.ProdRoutes[pageName];
	}

	static testUser = {
		first_name: "testUser_fName",
		last_name: "testUser_lname",
		email: "testUser_e@mail",
	};

	static emptyUser = {
		first_name: "",
		last_name: "",
		email: "",
	};

	static testHealth = {
		dob: "2002-11-20",
		gender: "Male",
		height: 172,
		weight: 90,
		favourite_workout_type: "weights",
		workout_experience: "medium",
		fitness_goal: "hypertrophy",
		injuries: "bad left knee",
		other_considerations: "none",
	};

	static emptyHealth = {
		dob: "",
		gender: "",
		height: 0,
		weight: 0,
		favourite_workout_type: "",
		workout_experience: "",
		fitness_goal: "",
		injuries: "",
		other_considerations: "",
	};

	static vitestUser = {
		first_name: "vitest_fName",
		last_name: "vitest_lname",
		email: "vitest_e@mail",
	};

	static testProfile = {
		id: AppAPI.testUserID.toString(),
		user: AppAPI.testUser,
		health_data: AppAPI.testHealth,
	};

	static emptyProfile = {
		id: "",
		user: AppAPI.emptyUser,
		health_data: AppAPI.emptyHealth,
	};

	static url(pageName, withID = true) {
		return (
			AppAPI.server +
			AppAPI.getRoute(pageName) +
			(withID ? AppAPI.getProfileID() : "")
		);
	}

	static getOrCreateProfileIfTesting = async () => {
		const tokens = JSON.parse(localStorage.getItem("tokens"));
		try {
			const gotProfile = await AppAPI.get("PROFILE", tokens.access);
			return gotProfile;
		} catch (error) {
			// If it has been deleted, re-create it.
			console.info("caught Error");
			if (AppAPI.useTestServer == true) {
				console.info("Creating Profile");
				return await AppAPI.post("PROFILE", AppAPI.testProfile);
			} else {
				throw new Error(error);
			}
		}
	};

	static #formattedError(operation, response) {
		const errorString =
			operation +
			" [" +
			response.status +
			" " +
			response.statusText +
			"]\n" +
			response.url;
		console.info("errorstring: " + errorString);
		return errorString;
	}

	static post = async (pageName, data) => {
		const response = await fetch(AppAPI.url(pageName, false), {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});
		if (!response.ok)
			throw new Error(AppAPI.#formattedError("POST", response));
		const jsonResponse = response.json();
		console.log(jsonResponse);
		return jsonResponse;
	};

	static get = async (pageName, token = "") => {
		const headers = token
			? {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
			  }
			: {};
		const response = await fetch(AppAPI.url(pageName), { headers: headers });
		if (!response.ok)
			throw new Error(AppAPI.#formattedError("GET", response));
		const data = await response.json();
		return data;
	};

	static put = async (pageName, data) => {
		const response = await fetch(AppAPI.url(pageName), {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});
		if (!response.ok)
			throw new Error(AppAPI.#formattedError("PUT", response));
		return data.json();
	};

	static delete = async (pageName) => {
		const response = await fetch(AppAPI.url(pageName), {
			method: "DELETE",
			headers: {},
		});
		if (!response.ok)
			throw new Error(AppAPI.#formattedError("DELETE", response));
	};

	constructor() {}
}
export default AppAPI;
