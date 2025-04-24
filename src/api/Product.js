import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;
const api_key = import.meta.env.VITE_API_KEY;


export async function getAllProducts(per_page = 1, page = 1) {
  try {
    let response = await axios
    .get(apiUrl + `api/products?per_page=${per_page}&page=${page}`, {
      headers: {
        'api-key': api_key
      }
    })
    
    if(response.data.status) {
      let data = response.data.data;
      return data;
    }
  } catch(err) {
    throw err;
  }
}



export async function getProductById(id) {
  try {
    let response = await axios
    .get(apiUrl + `api/products/` + id, {
      headers: {
        'api-key': api_key
      }
    })
    
    if(response.data.status) {
      let data = response.data.data;
      return data;
    }
  } catch(err) {
    throw err;
  }
}
