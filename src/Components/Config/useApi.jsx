import axios from 'axios';
import config from './config';

const api = axios.create({
  baseURL: config.BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Token ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const useApi = () => {
  const request = async (method, url, data = null, customHeaders = {}) => {
    try {
      const response = await api[method](url, data, {
        headers: { ...customHeaders },
      });
      return response.data;
    } catch (error) {
      console.error(`Error during ${method.toUpperCase()} request to ${url}:`, error);
      throw error;
    }
  };

  return { request };
};

export default useApi;
