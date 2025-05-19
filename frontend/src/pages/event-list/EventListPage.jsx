import React, { useState, useEffect, useContext } from 'react';
import { getEvents } from '../../api/api';
import EventListHeader from '../../components/event-list/EventListHeader';
import EventCard from '../../components/event-list/EventCard';
import SharedHeader from '../../components/shared/SharedHeader';
import { AuthContext } from '../../context/authContext';
import './EventListPage.css';

const EventListPage = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    const { user } = useContext(AuthContext);
		
    const fetchEvents = async () => {
        try {
            const response = await getEvents();
            setEvents(response.data.events);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    useEffect(() => {  
        fetchEvents();
    }, []);

    const filteredEvents = events.filter(event => {
        const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = 
            filterStatus === 'all' || 
            (filterStatus === 'upcoming' && new Date(event.start_time) > new Date()) ||
            (filterStatus === 'past' && new Date(event.start_time) < new Date());
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="event-list-page">
            <SharedHeader />
            <div className="event-list-header">
                <EventListHeader />
            </div>
            <div className="event-controls">
                <input 
                    type="text" 
                    placeholder="Search events..." 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                    className="event-search-input"
                />
                <select 
                    value={filterStatus} 
                    onChange={(e) => setFilterStatus(e.target.value)} 
                    className="event-filter-select"
                >
                    <option value="all">All Events</option>
                    <option value="upcoming">Upcoming Events</option>
                    <option value="past">Past Events</option>
                </select>
            </div>
            <div className="event-list-container">
								{loading && <p className="event-load-error">Loading...</p>}
								{error && <p className="event-load-error">Error occurred, failed to fetch data.</p>}
								{!loading && !error && (filteredEvents.length === 0 ? (
										<p className="event-load-error">No events found.</p>
								) : (
										filteredEvents.map((event) => (
												<EventCard 
												    key={event.id} 
												    event={event} 
												    userId={user.id}
												/>
										))
								))}
						</div>
        </div>
    );
};

export default EventListPage;

