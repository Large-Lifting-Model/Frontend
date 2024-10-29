import { describe, it, expect, vi, beforeEach } from 'vitest'
import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Profile from './Profile';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history'

const history = createMemoryHistory({ initialEntries: ["/"] });

const dummyLoginInfo = {
	firstName: "fName",
	lastName: "lName",
	email: "e@mail"
};

const dummyHealthInfo = {
	dob: "Nov 11 2003",
	gender: "Male",
	height: 72,
	weight: 190,
	favoriteWorkoutType: "weights",
	workoutExperience: "medium",
	fitnessGoal: "hypertrophy",
	injuries: "bad knees",
	otherConsiderations: "no other considerations"
}

describe('ProfilePage - LoginInfo', () => {

  it('Edit and Save', async () => {
    const handleLoginInfoSubmit = vi.fn(); // Mock function to track submit calls
    const handleHealthInfoSubmit = vi.fn(); // Mock function to track submit calls

    const { getByTestId } = render(<Router location={history.location} navigator={history} >
      <Profile onLoginInfoSubmit={handleLoginInfoSubmit} onHealthInfoSubmit={handleHealthInfoSubmit}/></Router>);

    // Get the buttons
    const editLoginInfoButton =     getByTestId('editLoginInfo')
    fireEvent.click(editLoginInfoButton);
    
    const saveLoginInfoButton =    getByTestId('saveLoginInfo')
    const firstNameForm =          getByTestId('firstNameForm')
    const lastNameForm =           getByTestId('lastNameForm')
    const emailForm =              getByTestId('emailForm')

    fireEvent.change(firstNameForm, { target: { value: dummyLoginInfo.firstName } });
    fireEvent.change(lastNameForm, { target: { value: dummyLoginInfo.lastName } });
    fireEvent.change(emailForm, { target: { value: dummyLoginInfo.email } });
    fireEvent.click(saveLoginInfoButton);

    const firstNameLabel =          getByTestId('firstNameLabel')
    const lastNameLabel =           getByTestId('lastNameLabel')
    const emailLabel =              getByTestId('emailLabel')

    expect(firstNameLabel.textContent.trim()).toBe(dummyLoginInfo.firstName);
    expect(lastNameLabel.textContent.trim()).toBe(dummyLoginInfo.lastName);
    expect(emailLabel.textContent.trim()).toBe(dummyLoginInfo.email);
    expect(handleLoginInfoSubmit).toHaveBeenCalledOnce();
    expect(handleHealthInfoSubmit).not.toHaveBeenCalled();
  });

  it('Edit and Delete', async () => {
    const handleLoginInfoSubmit = vi.fn(); // Mock function to track submit calls
    const handleHealthInfoSubmit = vi.fn(); // Mock function to track submit calls

    const { getByTestId } = render(<Router location={history.location} navigator={history} >
      <Profile onLoginInfoSubmit={handleLoginInfoSubmit} onHealthInfoSubmit={handleHealthInfoSubmit}/></Router>);

    // Get the buttons
    const editLoginInfoButton =     getByTestId('editLoginInfo')
    fireEvent.click(editLoginInfoButton);
    
    //const saveLoginInfoButton =     getByTestId('saveLoginInfo')
    //const cancelLoginInfoButton =   getByTestId('cancelLoginInfo')
    const deleteProfileButton =     getByTestId('deleteProfile')
    const firstNameForm =          getByTestId('firstNameForm')
    const lastNameForm =           getByTestId('lastNameForm')
    const emailForm =              getByTestId('emailForm')

    fireEvent.change(firstNameForm, { target: { value: dummyLoginInfo.firstName } });
    fireEvent.change(lastNameForm, { target: { value: dummyLoginInfo.lastName } });
    fireEvent.change(emailForm, { target: { value: dummyLoginInfo.email } });
    fireEvent.click(deleteProfileButton);

    const firstNameLabel =          getByTestId('firstNameLabel')
    const lastNameLabel =           getByTestId('lastNameLabel')
    const emailLabel =              getByTestId('emailLabel')

    expect(firstNameLabel.textContent.trim()).toBe("");
    expect(lastNameLabel.textContent.trim()).toBe("");
    expect(emailLabel.textContent.trim()).toBe("");
    expect(handleLoginInfoSubmit).not.toHaveBeenCalled();
    expect(handleHealthInfoSubmit).not.toHaveBeenCalled();
    

  });

});


// // API TESTING BELOW
// // THIS IS AN EXAMPLE API CALL (TO A REAL API)
// export async function fetchLoginInfo(email) {
//   const response = await fetch(`https://api.example.com/users/${email}`);
//   if (!response.ok) throw new Error('Network response was not ok');
//   return await response.json();
// };

// // HERE IS THE TEST FOR THAT API.
// describe('fetchLoginInfo', () => {
//   beforeEach(() => {
//     // Clear mock before each test
//     vi.resetAllMocks();
//   });

//   it('should return sample login info', async () => {
//     // Mock fetch implementation for a successful API call
//     global.fetch = vi.fn().mockResolvedValue({
//       ok: true,
//       json: async () => (dummyLoginInfo),
//     });

//     const data = await fetchLoginInfo(dummyLoginInfo.email);
//     expect(data).toEqual(dummyLoginInfo);
//     expect(fetch).toHaveBeenCalledWith('https://api.example.com/users/e@mail');
//   });

//   it('should throw an error for a failed API call', async () => {
//     // Mock fetch to simulate a failed API response
//     global.fetch = vi.fn().mockResolvedValue({ ok: false });
//     await expect(fetchLoginInfo("thisEmailDoesNotExist")).rejects.toThrow('Network response was not ok');
//     expect(fetch).toHaveBeenCalledWith('https://api.example.com/users/thisEmailDoesNotExist');
//   });
// });
