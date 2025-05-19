import './EventListHeader.css';
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import { Link } from 'react-router-dom';

const EventListHeader = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="event-list-header-content">
            <div className="event-list-header-row">
								<h1 className="event-list-title">Events</h1>
								{user?.role === 'admin' && (
				            <Link to="/create-event">
				                <button className="event-list-create-button">Create Event</button>
				            </Link>
				        )}
						</div>
						<p className="event-list-description">
								Explore a variety of exciting events.
						</p>
            
        </div>
    );
};

export default EventListHeader;

