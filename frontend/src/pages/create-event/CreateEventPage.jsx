import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import { createEvent } from '../../api/api';
import CreateEventHeader from '../../components/create-event/CreateEventHeader';
import CreateEventForm from '../../components/create-event/CreateEventForm';
import SharedHeader from '../../components/shared/SharedHeader';
import './CreateEventPage.css';

const CreateEventPage = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [capacity, setCapacity] = useState('');
    const [price, setPrice] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();
    const { user, isAuthenticated, logout } = useContext(AuthContext);

    // Redirect non-admin users
    useEffect(() => {
        if (!isAuthenticated || user?.role !== 'admin') {
            navigate('/events');
        }
    }, [isAuthenticated, user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const eventData = {
                title,
                description,
                startTime,
                endTime,
                capacity,
                price,
            };

            const response = await createEvent(eventData);

            if (response.status === 201) {
                navigate('/events');
            } else {
                setError('Failed to create event');
            }
        } catch (err) {
            setError(err.response?.data?.error || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    // Handle unauthorized access for non-admin users
    if (!isAuthenticated || user?.role !== 'admin') {
        return (
            <div className="create-event-page">
                <div className="create-event-not-authorized">
                    <h1 className="not-authorized-title">Unauthorized</h1>
                    <p className="not-authorized-description">
                        You do not have permission to access this page.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="create-event-page">
            <SharedHeader />
            <div className="create-event-header">
                <CreateEventHeader />
            </div>
            <div className="create-event-form-container">
                <CreateEventForm
                    onSubmit={handleSubmit}
                    title={title}
                    setTitle={setTitle}
                    description={description}
                    setDescription={setDescription}
                    startTime={startTime}
                    setStartTime={setStartTime}
                    endTime={endTime}
                    setEndTime={setEndTime}
                    capacity={capacity}
                    setCapacity={setCapacity}
                    price={price}
                    setPrice={setPrice}
                    error={error}
                    loading={loading}
                />
            </div>
        </div>
    );
};

export default CreateEventPage;

