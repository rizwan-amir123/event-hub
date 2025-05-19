import axios from 'axios';

// Get the API base URL from the environment variable
const baseURL = import.meta.env.VITE_REACT_APP_API_BASE_URL || 'http://localhost:3000'; // Default to localhost if not set

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
        const token = localStorage.getItem('token'); // Or wherever you store the token
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
        // Handle common error cases here
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('API Error:', error.response.status, error.response.data);
            // You could display a user-friendly error message here, e.g., using a toast notification
            // toast.error(`Error: ${error.response.status} - ${error.response.data.error || 'Something went wrong'}`);
        } else if (error.request) {
            // The request was made but no response was received
            console.error('API Error:', 'No response from server');
             //  toast.error('Error: No response from server. Please check your network connection.');
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('API Error:', error.message);
             // toast.error(`Error: ${error.message}`);
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

// Example of a payment request (you might have a separate module for this)
export const processPayment = (paymentDetails) => api.post('/payment', paymentDetails);

export default api;

