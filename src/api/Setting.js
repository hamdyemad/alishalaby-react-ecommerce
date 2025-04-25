import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;
const api_key = import.meta.env.VITE_API_KEY;


export async function getAllSettings() {
  try {
    let response = await axios
    .get(apiUrl + `api/settings`, {
      headers: {
        'api-key': api_key
      },
    })
    return response.data;
  } catch(err) {
    throw err;
  }
}