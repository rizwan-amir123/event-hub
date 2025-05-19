import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './pages/auth/AuthPage.jsx';
import ProtectedRoute from './components/protected-route/ProtectedRoute.jsx';
import EventListPage from './pages/event-list/EventListPage.jsx';
import CreateEventPage from './pages/create-event/CreateEventPage.jsx';
import SimulatedPaymentPage from './pages/simulated-payment/SimulatedPaymentPage.jsx';
import { AuthProvider, AuthContext } from './context/authContext';

const PublicRoute = ({ children }) => {
    const { isAuthenticated } = React.useContext(AuthContext);
    return isAuthenticated ? <Navigate to="/events" replace /> : children;
};

const App = () => {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route
                        path="/login"
                        element={
                            <PublicRoute>
                                <AuthPage />
                            </PublicRoute>
                        }
                    />
                    <Route
                        path="/"
                        element={
                            <PublicRoute>
                                <AuthPage />
                            </PublicRoute>
                        }
                    />
                    <Route
                        path="/register"
                        element={
                            <PublicRoute>
                                <AuthPage />
                            </PublicRoute>
                        }
                    />
                    <Route path="/events" element={<EventListPage />} />
                    <Route
                        path="/create-event"
                        element={
                            <ProtectedRoute requiredRole="admin">
                                <CreateEventPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/payment/:eventId" element={<SimulatedPaymentPage />} />
                    <Route path="*" element={<div>Page not found</div>} />
                </Routes>
            </AuthProvider>
       </Router>
    );
};

export default App;

