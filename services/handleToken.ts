
import {jwtDecode} from 'jwt-decode'
import api from './axios'
import { useUserStore } from '../src/store/userStore';

const getDetails = async () => {
  // Call the getUserDetails function
  console.log("Starting get user")
  const setUser = useUserStore.getState().setUser

  try {
    const response = await api.get('/user/');
    setUser(response.data.user[0]);
    console.log('User details fetched successfully');
  } catch (error) {
    console.error('Error fetching user details:', error);
  }

  // Check if the user data has been updated
  const updatedUser = useUserStore.getState().user;
  console.log('Updated user:', updatedUser);
}

function isTokenExpired(token: string) {
  try {
    const decoded = jwtDecode(token) as any; // Decode the JWT payload
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    return decoded.exp < currentTime; // Check if the token has expired
  } catch (error) {
    console.error("Invalid token", error);
    return true; // Treat invalid tokens as expired
  }
}

export async function handleTokens () {
  console.log("Checking tokens now")
  const access_token = localStorage.getItem('access_token')
  const refresh_token = localStorage.getItem('refresh_token')
  // const viable = isTokenExpired(access_token)

  if (access_token && !isTokenExpired(access_token)) {
    // Access token is still valid
    getDetails();
    if (!window.location.pathname.startsWith('/app')) {
      console.log("Will now get user")
      
      window.location.href = '/app'; // Redirect to dashboard
    }
    return access_token;
  }

  if (refresh_token) {
    localStorage.removeItem('access_token');
    // Send a request to the backend to refresh the token
    try {
      const response = await api.post('/auth/refresh/', { refresh_token });
      // Save the new access token in local storage
      localStorage.setItem('access_token', response.data.access_token);
      localStorage.setItem('refresh_token', response.data.refresh_token);
      console.log("Will now get user")
      getDetails();

      return response.data.access_token;

    } catch (error) {
      console.error('Error:', error);
      // Handle error
      // window.location.href = '/auth?type=login'; // Redirect to login page
    }
  } else {
    window.location.href = '/auth?type=login'
  }
}
