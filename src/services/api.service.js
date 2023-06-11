import axios, { AxiosError } from 'axios';

import { isValidJson } from "../utils";

export default axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    "Accept": "application/json",
  }
});

function handleAPIError(err) {
  const error = {
    code: 500,
    message: "Something went wrong. Please try again Later!"
  };

  if (err instanceof AxiosError) {
    if (err.response) {
      if (isValidJson(err.response.data)) {
        const response = err.response.data;

        if ([400, 422].includes(response.code)) {
          return response;
        }
      }

      return error;
    }

    return error;
  }

  return error;
}

export {
  handleAPIError
};