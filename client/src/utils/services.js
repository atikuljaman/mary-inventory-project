import axios from "axios";
export const baseUrl = "http://localhost:5000/api";

export const postRequest = async (url, data) => {
  try {
    const response = await axios.post(url, data);

    // Checking the status code to determine if the request was successful
    if (response.status !== 200) {
      let message;

      if (response.data.message) {
        message = response.data.message;
      } else {
        message = response.data;
      }

      return {
        error: true,
        message,
      };
    }

    // Returning the response data if the request was successful
    return response.data;
  } catch (error) {
    // Handling any errors thrown by axios
    return {
      error: true,
      message: error.response ? error.response.data : error.message,
    };
  }
};

export const getRequest = async (url) => {
  const response = await axios.get(url);

  const data = response.data;

  if (response.status !== 200) {
    let message = "An error occurred. Please try again.";

    if (data.message) {
      message = data.message;
    }

    return {
      error: true,
      message,
    };
  }

  return data;
};
