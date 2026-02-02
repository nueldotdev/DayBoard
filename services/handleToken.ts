
import api from './axios'
import { useUserStore } from '../src/store/userStore';

export const getDetails = async () => {
  // Call the getUserDetails function
  const setUser = useUserStore.getState().setUser

  try {
    const response = await api.get('/user/');
    setUser(response.data[0]);
  } catch (error) {
    console.error('Error fetching user details:', error);
  }

}


export const logout = async () => {
  try {
    await api.post('/auth/logout/')
  } catch (e) {

  }
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

  if (valid === true) {
    // Access token is still valid
    await getDetails();
    return access_token;

  } else if (refresh_token) {
    localStorage.removeItem('access_token');
    // Send a request to the backend to refresh the token
    try {
      const response = await api.post('/auth/refresh/', { refresh_token });
      // Save the new access token in local storage
      localStorage.setItem('access_token', response.data.access_token);
      localStorage.setItem('refresh_token', response.data.refresh_token);
      await getDetails();

      return response.data.access_token;

    } catch (error) {
      console.error('Error:', error);
      localStorage.removeItem('refresh_token');
      window.location.href = '/auth?type=login'
    }
  } else {
    window.location.href = '/auth?type=login'
  }
}
