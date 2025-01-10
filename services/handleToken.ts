
import {jwtDecode} from 'jwt-decode'
import api from './axios'



function isTokenExpired(token: string) {
  try {
    const decoded = jwtDecode(token) as any; // Decode the JWT payload
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    return decoded.exp < currentTime; // Check if the token has expired
  } catch (error) {
    localStorage.removeItem('access_token');
    console.error("Invalid token", error);
    return true; // Treat invalid tokens as expired
  }
}

export async function handleTokens () {
  const access_token = localStorage.getItem('access_token')
  const refresh_token = localStorage.getItem('refresh_token')

  if (access_token && !isTokenExpired(access_token)) {
    // Access token is still valid
    return access_token;
  }

  if (refresh_token) {
    // Send a request to the backend to refresh the token
    try {
      const response = await api.post('/auth/refresh/', { refresh_token });
      // Save the new access token in local storage
      localStorage.setItem('access_token', response.data.access_token);
      return response.data.access_token;

    } catch (error) {
      console.error('Error:', error);
      // Handle error
      window.location.href = '/auth?type=login'; // Redirect to login page
    }
  }

}

