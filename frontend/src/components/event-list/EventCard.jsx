import './EventCard.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const EventCard = ({ event, userId }) => {
    const [showDescription, setShowDescription] = useState(false);

    const toggleDescription = () => setShowDescription(!showDescription);

    return (
        <div className="event-card">
            <h2 className="event-card-title">{event.title.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        		.join(' ')}</h2>
        		<div className="event-card-header">
								<p className="event-card-date">
										{event.start_time.split('T')[0]} @ {new Date(event.start_time).toLocaleTimeString('en-GB', {
												hour: '2-digit',
												minute: '2-digit',
												hour12: false
										})}
								</p>
								{event.registrations.includes(userId) && (
										<span className="registered-badge">Registered</span>
								)}
						</div>

            <p className="event-card-capacity">{event.capacity - event.registrations.length} seats left!</p>
            <p className="event-card-price">{event.price}$</p>

            {showDescription && (
                <>
                    <p className="event-card-description">{event.description.charAt(0).toUpperCase() + event.description.slice(1)}</p>
                    <p className="event-card-date">
                        Ends at {event.end_time.split('T')[0]} @ {new Date(event.end_time).toLocaleTimeString('en-GB', {
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: false
                        })}
                    </p>
                </>
            )}
            
            <button 
                className="event-card-view-button" 
                onClick={toggleDescription}
            >
                {showDescription ? 'Hide Details' : 'View Details'}
            </button>
            
            {event.capacity - event.registrations.length > 0 && 
						 !event.registrations.includes(userId) ? (
								<Link to={`/payment/${event.id}`}>
										<button className="event-card-view-button">
												Register
										</button>
								</Link>
						) : null}           
        </div>
    );
};

export default EventCard;

