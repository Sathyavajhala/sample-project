import axios from "axios";
export const BaseURL = "https://sfdigital.azurewebsites.net/api";

const getHeaders = async (header) => {
  const headers = {
    "Content-Type": "application/json",
  };
  //   if (header) {
  //     const jwt = await jwtDecoder();
  //     headers.Authorization = `Bearer ${jwt}`;
  //   }
  return headers;
};
console.log("first commit");
const Get = async (url, isRequired) => {
  const headers = await getHeaders(isRequired);
  try {
    const response = await axios.get(`${BaseURL}${url}`, { headers });
    return response;
  } catch (error) {
    throw error;
  }
};

const Post = async (url, payload, isRequired) => {
  const headers = await getHeaders(isRequired);
  try {
    const response = await axios.post(`${BaseURL}${url}`, payload, { headers });
    return response;
  } catch (error) {
    throw error;
  }
};

const Put = async (url, payload, isRequired) => {
  const headers = await getHeaders(isRequired);
  try {
    const response = await axios.put(`${BaseURL}${url}`, payload, { headers });
    return { response: response.data, status: response.status };
  } catch (error) {
    throw error;
  }
};

const Delete = async (url, isRequired) => {
  const headers = await getHeaders(isRequired);
  try {
    const response = await axios.delete(`${BaseURL}${url}`, { headers });
    return response;
  } catch (error) {
    throw error;
  }
};

export { Post, Put, Get, Delete };
