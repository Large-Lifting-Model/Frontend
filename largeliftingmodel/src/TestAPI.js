class TestAPI {
  
  static testUserID = "12903781273"
  static testServer = 'http://localhost:3000/'

  static testUser = {
    first_name: "testUser_fName",
    last_name: "testUser_lname",
    email: "testUser_e@mail"
  };

  static emptyUser = {
    first_name: "",
    last_name: "",
    email: ""
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
    other_considerations: "none"
  }

  static emptyHealth = {
    dob: "",
    gender: "",
    height: 0,
    weight: 0,
    favourite_workout_type: "",
    workout_experience: "",
    fitness_goal: "",
    injuries: "",
    other_considerations: ""
  }

  static testProfile = {
    id: TestAPI.testUserID.toString(),
    "user": TestAPI.testUser,
    "health_data": TestAPI.testHealth
  }

  static emptyProfile = {
    id: "",
    "user": TestAPI.emptyUser,
    "health_data": TestAPI.emptyHealth
  }

  static getOrCreateProfile = async () => {
		try {
			return await TestAPI.get("profile/")
		} catch (error) { // If it has been deleted, re-create it.
			return await TestAPI.post("profile/", TestAPI.testProfile)
		}
	}

  static post = async (route, data) => {
    const postResponse = await fetch(TestAPI.testServer + route, {
      method: 'POST', // Specify PUT method
      headers: {
        'Content-Type': 'application/json', // Indicate JSON content
      },
      body: JSON.stringify(data)
    })
    if (!postResponse.ok) throw new Error( route + 'POST failed');
    return data
  }

  static get = async (route) => {
    const response = await fetch(TestAPI.testServer + route + TestAPI.testUserID.toString());
		if (!response.ok) throw new Error( route + ' GET failed');
		const data = await response.json();
     return data
  }

  static put = async (route, data) => {
    const response = await fetch(TestAPI.testServer + route + TestAPI.testUserID.toString(), {
      method: 'PUT', // Specify PUT method
      headers: {
        'Content-Type': 'application/json', // Indicate JSON content
      },
      body: JSON.stringify(data)
    })
    if (!response.ok) throw new Error( route + ' PUT failed');
    return data
  }

  static delete = async (route) => {
    const response = await fetch(TestAPI.testServer + route + TestAPI.testUserID.toString(), {
      method: 'DELETE', // Specify DELETE method
    })
    if (!response.ok) throw new Error( route + ' DELETE failed');
  }

  constructor() {
  }

}

export default TestAPI;