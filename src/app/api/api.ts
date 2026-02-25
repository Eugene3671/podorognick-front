import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

if (!baseURL) {
  throw new Error('NEXT_PUBLIC_API_URL is not defined');
}

export const api = axios.create({
  baseURL: `${baseURL}/api`, 
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    console.error('API ERROR:', {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data,
    });

    return Promise.reject(error);
      }
);

export default api;