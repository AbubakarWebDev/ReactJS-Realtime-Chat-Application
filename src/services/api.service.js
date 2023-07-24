import axios, { AxiosError } from 'axios';

import { isValidJson } from "../utils";

export default axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Accept": "application/json",
  }
});

function handleAPIError(err) {
  console.log(err, `${err.config.baseURL}${err.config.url}`);

  if (err instanceof AxiosError && err.response) {
    const response = err.response.data;

    if (isValidJson(response)) {
      if ([400, 422, 404].includes(response.code)) {
        return response;
      } 
      
      else if (response.code === 401) {
        localStorage.removeItem('token');
        return response;
      }
    }
  }

  return {
    code: 500,
    message: "Something went wrong. Please try again Later!"
  };
}

export {
  handleAPIError
};