import axios from 'axios';

const BASE_URL = 'https://pokeapi.co/api/v2';

const service = axios.create({
  baseURL: BASE_URL,
});

// request interceptor
service.interceptors.request.use(
  async (request) => {
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default service;
