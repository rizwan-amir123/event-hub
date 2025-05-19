import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext'; 
import './SharedHeader.css';
import logo from '/logo.png';

const SharedHeader = () => {
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);  

    const handleLogoClick = () => {
        navigate('/events');
    };

    const handleLogout = () => {
        logout();  
    };

    return (
        <header className="shared-header">
            <img
                src={logo}
                alt="Logo"
                className="shared-header-logo" 
                onClick={handleLogoClick}
            />
            <button 
                className="shared-header-logout"
                onClick={handleLogout}
            >
                Log Out
            </button>
        </header>
    );
};

export default SharedHeader;

