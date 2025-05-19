import React, { createContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as loginApi, register as registerApi } from '../api/api'; // Use your API functions
import LoadingScreen from '../components/shared/LoadingScreen';

// Create the AuthContext
const AuthContext = createContext({
    user: null,
    login: async () => {},
    logout: () => {},
    register: async () => {},
    isAuthenticated: false,
    loading: true,
    error: null,
});

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Load user data from localStorage on initial load
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');
        if (storedUser && storedToken) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
                setIsAuthenticated(true);
            } catch (error) {
                console.error("Error parsing user from localStorage:", error);
                localStorage.removeItem('user');
                localStorage.removeItem('token');
            }
        }
        setLoading(false);
    }, []);

    // Login function
    const login = useCallback(async (email, password) => {
        setLoading(true);
        setError(null); // Clear previous errors
        try {
            const response = await loginApi(email, password);
            const { user, token } = response.data;
            
            // Store user and token in localStorage
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('token', token);
            localStorage.setItem('userRole', user.role);

            // Update state
            setUser(user);
            setIsAuthenticated(true);
            navigate('/events'); // Redirect to the events page after successful login
        } catch (error) {
            setError(error.response?.data?.error || 'Login failed');
            console.error("Login error:", error);
        } finally {
            setLoading(false);
        }
    }, [navigate]);

    // Register function
    const register = useCallback(async (name, email, password, tenantName) => {
        setLoading(true);
        setError(null); // Clear previous errors
        try {
            const response = await registerApi(name, email, password, tenantName);
            const { user, token } = response.data;
            
            // Store user and token in localStorage
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('token', token);
            localStorage.setItem('userRole', user.role);

            // Update state
            setUser(user);
            setIsAuthenticated(true);
            navigate('/events'); // Redirect to the events page after successful registration
        } catch (error) {
            setError(error.response?.data?.error || 'Registration failed');
            console.error("Registration error:", error);
        } finally {
            setLoading(false);
        }
    }, [navigate]);

    // Logout function
    const logout = useCallback(() => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('userRole');
        setUser(null);
        setIsAuthenticated(false);
        navigate('/login'); // Redirect to the login page after logout
    }, [navigate]);

    // Context value
    const contextValue = {
        user,
        login,
        logout,
        register,
        isAuthenticated,
        loading,
        error,
    };

    return (
        <AuthContext.Provider value={contextValue}>
				    {!loading ? children : (
				        <LoadingScreen />
				    )}
				</AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };

