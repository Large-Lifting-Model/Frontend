// import React from "react";

class AppAPI {
	static useTestServer = import.meta.env.VITE_USE_TEST_SERVER === "1";
	static testUserID = "12903781273";
	static testServer = "http://localhost:3885/";
	static prodServer = "http://34.65.243.247/api/";
	static server = AppAPI.useTestServer ? AppAPI.testServer : AppAPI.prodServer;

	static getAccessToken() {
		if (AppAPI.useTestServer) {return ""}
		return JSON.parse(localStorage.getItem("tokens")).access;
	}

	static getDefaultHeaders() {
		return {
		 "Content-Type": "application/json",
		 "Authorization": `Bearer ${AppAPI.getAccessToken()}`
		}
	}

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

	static emptyWorkout = {
		"id":0,
   		"user":"",
   		"created":"",
   		"length":0,
   		"difficulty": "",
   		"workout_type": "",
   		"target_area":"",
   		"equipment_access": "",
   		"included_exercises":"",
   		"excluded_exercises":"",
   		"other_workout_considerations":"",
   		"llm_suggested_changes":[
   		],
   		"llm_suggested_workout":[
   		],
   		"llm_final_workout":null,
   		"workout_rating":null,
		"workout_comments":null,
	}

	static vitestUser = {
		first_name: "vitest_fName",
		last_name: "vitest_lname",
		email: "vitest_e@mail",
	};

	static testProfile = {
		id: AppAPI.testUserID.toString(),
		...AppAPI.testUser,
		health_data: AppAPI.testHealth,
	};

	static emptyProfile = {
		id: "",
		...AppAPI.emptyUser,
		health_data: AppAPI.emptyHealth,
	};

	static url(route) {
		return (
			AppAPI.server +
			route
		);
	}

	static getOrCreateProfileIfTesting = async () => {
		try {
			const gotProfile = await AppAPI.get("users/profile/", AppAPI.getDefaultHeaders(), "profile/" + AppAPI.testUserID);
			return gotProfile;
		} catch (error) {
			// If it has been deleted, re-create it.
			if (AppAPI.useTestServer === true) {
				console.info("Creating Profile");
				await AppAPI.post("", AppAPI.testProfile, AppAPI.getDefaultHeaders(), "profile/" );
				return AppAPI.testProfile
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
		return errorString;
	}

	static get = async (route, headers, testRoute="") => {
		const theRoute = AppAPI.useTestServer ? testRoute : route
		const response = await fetch(AppAPI.url(theRoute), { headers: headers });
		if (!response.ok)
			throw new Error(AppAPI.#formattedError("GET", response));
		const data = await response.json();
		return data;
	}

	static put = async (route, data, headers, testRoute="") => {
		const theRoute = AppAPI.useTestServer ? testRoute : route
		const response = await fetch(AppAPI.url(theRoute), {
			method: "PUT",
			headers: headers,
			body: JSON.stringify(data),
		});
		if (!response.ok)
			throw new Error(AppAPI.#formattedError("PUT", response));
		const responseData = await response.json()
		return responseData;
	}

	static post = async (route, data, headers, testRoute="") => {
		const theRoute = AppAPI.useTestServer ? testRoute : route
		const response = await fetch(AppAPI.url(theRoute), {
			method: "POST",
			headers: headers,
			body: JSON.stringify(data),
		});
		if (!response.ok)
			throw new Error(AppAPI.#formattedError("POST", response));
		const jsonResponse = response.json();
		console.log(jsonResponse);
		return jsonResponse;
	};

	static delete = async (route, headers, testRoute="") => {
		const theRoute = AppAPI.useTestServer ? testRoute : route
		const response = await fetch(AppAPI.url(theRoute), {
			method: "DELETE",
			headers: headers,
		});
		if (!response.ok)
			throw new Error(AppAPI.#formattedError("DELETE", response));
	}

	static patch = async (route, data, headers, testRoute="") => {
		const theRoute = AppAPI.useTestServer ? testRoute : route
		const response = await fetch(AppAPI.url(theRoute), {
			method: "PATCH",
			headers: headers,
			body: JSON.stringify(data),
		});
		if (!response.ok)
			throw new Error(AppAPI.#formattedError("PATCH", response));
		const jsonResponse = response.json();
		console.log(jsonResponse);
		return jsonResponse;
	};

	static createWorkout = async (workoutData) => {
		console.info("CreatingWorkout" + JSON.stringify(workoutData))
		return await AppAPI.post('workout/', workoutData, AppAPI.getDefaultHeaders(), "")
	}

	static deleteWorkout = async(workoutID) => {
		return await AppAPI.delete('workout/' + workoutID, AppAPI.getDefaultHeaders(), "")
	}

	static refineWorkout = async (workoutData, refinement) => {
		const initialRefinements = workoutData.llm_suggested_changes
		console.info("InitialRefinements" + JSON.stringify(initialRefinements))
		initialRefinements.push(refinement)
		const refinedRefinements = { "llm_suggested_changes": initialRefinements }
		console.info("RefinedRefinements" + JSON.stringify(refinedRefinements))
		const returnedData = await AppAPI.patch('workout/' + workoutData.id + '/', refinedRefinements, AppAPI.getDefaultHeaders(), "")
		console.info("RefinementReturnedData" + JSON.stringify(returnedData))
		return returnedData
	}

	static rateWorkout = async (workoutData, workout_rating, workout_comments, actual_length) => {
		const patchData = { "workout_rating": workout_rating,
			"workout_comments": workout_comments,
			"actual_length": actual_length,
		 }
		 console.info("WorkoutRating" + JSON.stringify(patchData))
		 const returnedData = await AppAPI.patch('workout/' + workoutData.id + '/', patchData, AppAPI.getDefaultHeaders(), "")
		 console.info("RatingReturnedData" + JSON.stringify(returnedData))
		 return returnedData
		}

	static parseSuggestedWorkout(workout) {
		const unparsed = workout.llm_suggested_workout[0]
		//console.info("PARSINGSUGGESTEDWORKOUT" + JSON.stringify(unparsed))
		const parsed = AppAPI.extractJSON(unparsed)
		//console.info("PARSINGRESULT" + JSON.stringify(parsed))
		return parsed
	}

	static extractJSON(text) {
		const jsonRegex = /{(?:[^{}]|(?:{[^{}]*}))*}/g; // Matches JSON objects in text
		const matches = text.match(jsonRegex);           // Extracts all JSON objects
		
		// Parses each match into a JSON object
		return matches ? matches.map(json => JSON.parse(json)) : [];
	  }
	  

	constructor() {}
}
export default AppAPI;
