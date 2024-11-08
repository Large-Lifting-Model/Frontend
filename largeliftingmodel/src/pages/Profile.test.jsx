import { describe, it, expect } from "vitest";
// import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import Profile from "./Profile";
import AppAPI from "../components/AppAPI";
import AppTest from "../components/AppTest";

describe("ProfilePage - LoginInfo", () => {
	it("Edit and Save", async () => {
		await AppTest.delay();

		await AppTest.render(<Profile />);

		const testFirstName = AppAPI.vitestUser.first_name;
		const testLastName = AppAPI.vitestUser.last_name;

		await AppTest.delay();

		const firstName1Label = screen.getByTestId("profileUserFirstNameForm");
		const lastName1Label = screen.getByTestId("profileUserLastNameForm");

		const firstName1 = firstName1Label.textContent.trim();
		const lastName1 = lastName1Label.textContent.trim();

		const editButton1 = screen.getByTestId("profileUserEditButton");

		await AppTest.changeState(() => {
			fireEvent.click(editButton1);
		});

		const saveLoginInfoButton1 = screen.getByTestId("profileUserSaveButton");
		const firstNameForm1 = screen.getByTestId("profileUserFirstNameForm");
		const lastNameForm1 = screen.getByTestId("profileUserLastNameForm");

		await AppTest.changeState(() => {
			fireEvent.change(firstNameForm1, { target: { value: testFirstName } });
			fireEvent.change(lastNameForm1, { target: { value: testLastName } });
			fireEvent.click(saveLoginInfoButton1);
		});

		const firstName2 = screen
			.getByTestId("profileUserFirstNameForm")
			.textContent.trim();
		const lastName2 = screen
			.getByTestId("profileUserLastNameForm")
			.textContent.trim();
		expect(firstName2).toBe(testFirstName);
		expect(lastName2).toBe(testLastName);
		const editButton2 = screen.getByTestId("profileUserEditButton");

		await AppTest.changeState(() => {
			fireEvent.click(editButton2);
		});

		const saveLoginInfoButton2 = screen.getByTestId("profileUserSaveButton");
		const firstNameForm2 = screen.getByTestId("profileUserFirstNameForm");
		const lastNameForm2 = screen.getByTestId("profileUserLastNameForm");

		await AppTest.changeState(() => {
			fireEvent.change(firstNameForm2, { target: { value: firstName1 } });
			fireEvent.change(lastNameForm2, { target: { value: lastName1 } });
			fireEvent.click(saveLoginInfoButton2);
		});

		const firstName3 = screen
			.getByTestId("profileUserFirstNameForm")
			.textContent.trim();
		const lastName3 = screen
			.getByTestId("profileUserLastNameForm")
			.textContent.trim();
		expect(firstName3).toBe(firstName1);
		expect(lastName3).toBe(lastName1);
	}, 30000); // Set timeout for test
}, 20000); // set timeout for test suite
