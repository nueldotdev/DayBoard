import axios from 'axios';



// Reverse geocode to get city and country name using OpenCage
export const getCityName = async (lat: number, lon: number): Promise<string> => {
  const API_KEY = import.meta.env.VITE_OPENCAGE_API_KEY; // Replace with your OpenCage API key
  const url = `https://api.opencagedata.com/geocode/v1/json`;

  try {
    const response = await axios.get(url, {
      params: {
        key: API_KEY,
        q: `${lat},${lon}`,
        language: 'en', // Preferred language
      },
    });

    const results = response.data.results;
    if (results.length > 0) {
      // Extract city and country names
      const city = results[0].components.city || results[0].components.town || results[0].components.village;
      const country = results[0].components.country;

      return `${city}, ${country}`;
    }

    throw new Error('Unable to fetch city name');
  } catch (error: any) {
    throw new Error(`OpenCage API error: ${error.message}`);
  }
};