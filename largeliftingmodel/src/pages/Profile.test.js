import { describe, it, expect, vi, beforeEach } from 'vitest'
import global from 'vitest'

describe('sum function', () => {
  const sum = (a, b) => a + b

  it('should add two numbers', () => {
    expect(sum(1, 2)).toBe(3)
  })
})

// THIS IS AN EXAMPLE API CALL (TO A REAL API)
export async function fetchUserData(userId) {
  const response = await fetch(`https://api.example.com/users/${userId}`);
  if (!response.ok) throw new Error('Network response was not ok');
  return await response.json();
}

// HERE IS THE TEST FOR THAT API.
describe('fetchUserData', () => {
  beforeEach(() => {
    // Clear mock before each test
    vi.resetAllMocks();
  });

  it('should return user data for a valid userId', async () => {
    // Mock fetch implementation for a successful API call
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ id: 1, name: 'John Doe' }),
    });

    const data = await fetchUserData(1);
    expect(data).toEqual({ id: 1, name: 'John Doe' });
    expect(fetch).toHaveBeenCalledWith('https://api.example.com/users/1');
  });

  it('should throw an error for a failed API call', async () => {
    // Mock fetch to simulate a failed API response
    global.fetch = vi.fn().mockResolvedValue({ ok: false });

    await expect(fetchUserData(2)).rejects.toThrow('Network response was not ok');
    expect(fetch).toHaveBeenCalledWith('https://api.example.com/users/2');
  });
});
