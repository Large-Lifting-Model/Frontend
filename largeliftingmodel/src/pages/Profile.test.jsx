import { describe, it, expect, vi, beforeEach } from 'vitest'
import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Profile from './Profile';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history'
import AppAPI from '../AppAPI';


const history = createMemoryHistory({ initialEntries: ["/"] });

describe('ProfilePage - LoginInfo', () => {

  it('Edit and Save', async () => {

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const { getByTestId } = render(<Router location={history.location} navigator={history} >
      <Profile /></Router>);

    const testFirstName = AppAPI.vitestUser.first_name
    const testLastName = AppAPI.vitestUser.last_name
    const testEmail = AppAPI.vitestUser.email

    const loadingIndicator = getByTestId('profileLoadingIndicator')

    await delay(1000)
    await waitFor(() => expect(loadingIndicator.textContent.trim()).not.toBe("Loading..."), { timeout: 3000 })
    
    const firstName1Label = getByTestId('profileUserFirstNameForm')
    const lastName1Label = getByTestId('profileUserLastNameForm')
    const email1Label = getByTestId('profileUserEmailForm')

    const firstName1 = firstName1Label.textContent.trim()
    const lastName1 = lastName1Label.textContent.trim()
    const email1 = email1Label.textContent.trim()

  
    const editButton1 =     getByTestId('profileUserEditButton')
    fireEvent.click(editButton1);
    await delay(1000)
    await waitFor(() => expect(loadingIndicator.textContent.trim()).not.toBe("Loading..."), { timeout: 3000 })

    
    const saveLoginInfoButton1 =    getByTestId('profileUserSaveButton')
    const firstNameForm1 =          getByTestId('profileUserFirstNameForm')
    const lastNameForm1 =           getByTestId('profileUserLastNameForm')
    const emailForm1 =              getByTestId('profileUserEmailForm')
    fireEvent.change(firstNameForm1, { target: { value: testFirstName } });
    fireEvent.change(lastNameForm1, { target: { value: testLastName } });
    fireEvent.change(emailForm1, { target: { value: testEmail } });
    fireEvent.click(saveLoginInfoButton1);

    await delay(1000)
    await waitFor(() => expect(loadingIndicator.textContent.trim()).not.toBe("Loading..."), { timeout: 3000 })

    const firstName2 =         getByTestId('profileUserFirstNameForm').textContent.trim()
    const lastName2 =          getByTestId('profileUserLastNameForm').textContent.trim()
    const email2 =             getByTestId('profileUserEmailForm').textContent.trim()
    expect(firstName2).toBe(testFirstName);
    expect(lastName2).toBe(testLastName);
    expect(email2).toBe(testEmail);
    const editButton2 =     getByTestId('profileUserEditButton')
    fireEvent.click(editButton2);

    await delay(1000)
    await waitFor(() => expect(loadingIndicator.textContent.trim()).not.toBe("Loading..."), { timeout: 3000 })
    
    const saveLoginInfoButton2 =    getByTestId('profileUserSaveButton')
    const firstNameForm2 =          getByTestId('profileUserFirstNameForm')
    const lastNameForm2 =           getByTestId('profileUserLastNameForm')
    const emailForm2 =              getByTestId('profileUserEmailForm')
    fireEvent.change(firstNameForm2, { target: { value: firstName1 } });
    fireEvent.change(lastNameForm2, { target: { value: lastName1 } });
    fireEvent.change(emailForm2, { target: { value: email1 } });
    fireEvent.click(saveLoginInfoButton2);

    await delay(1000)
    await waitFor(() => expect(loadingIndicator.textContent.trim()).not.toBe("Loading..."), { timeout: 3000 })
      
    const firstName3 =         getByTestId('profileUserFirstNameForm').textContent.trim()
    const lastName3 =          getByTestId('profileUserLastNameForm').textContent.trim()
    const email3 =             getByTestId('profileUserEmailForm').textContent.trim()
    expect(firstName3).toBe(firstName1);
    expect(lastName3).toBe(lastName1);
    expect(email3).toBe(email1);


  },
  30000 // Set timeout for test
  );

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
