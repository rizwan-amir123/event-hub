import axios from 'axios';

// Get the API base URL from the environment variable
const baseURL = import.meta.env.VITE_REACT_APP_API_BASE_URL || 'http://localhost:3000'; 

// Create an Axios instance with a base URL
const api = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to include the JWT token in the headers
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); 
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor to handle errors globally
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            console.error('API Error:', error.response.status, error.response.data);
        } else if (error.request) {
            console.error('API Error:', 'No response from server');
        } else {
            console.error('API Error:', error.message);
        }
        return Promise.reject(error);
    }
);

// Define your API functions
export const login = (email, password) => api.post('/auth/login', { email, password });
export const register = (name, email, password, tenantName) => api.post('/auth/register', { name, email, password, tenantName });
export const getEvents = () => api.get('/events');
export const createEvent = (eventData) => api.post('/events', eventData); 
export const registerForEvent = (eventId) => api.post(`/register/${eventId}`); 

export default api;

