
import api from './axios'
import { useUserStore } from '../src/store/userStore';

const getDetails = async () => {
  // Call the getUserDetails function
  const setUser = useUserStore.getState().setUser

  try {
    const response = await api.get('/user/');
    setUser(response.data[0]);
  } catch (error) {
    console.error('Error fetching user details:', error);
  }

  // Check if the user data has been updated
  // const updatedUser = useUserStore.getState().user;
}


export const validateToken = async (token: any) => {
  var valid: boolean;

  try {
    await api.post('/auth/validate-token/', { token })
    valid = true
  } catch (error) {
    valid = false
    console.error("Error validating token:", error);
  }

  return {valid}
};


export async function handleTokens () {
  const access_token = localStorage.getItem('access_token') ?? ''
  const refresh_token = localStorage.getItem('refresh_token') ?? ''
  const {valid} = await validateToken(access_token)

  if (access_token && valid === true) {
    // Access token is still valid
    await getDetails();
    if (window.location.pathname !== '/app') {      
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
      getDetails();

      return response.data.access_token;

    } catch (error) {
      console.error('Error:', error);
    }
  } else {
    window.location.href = '/auth?type=login'
  }
}
