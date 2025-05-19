import './AuthLogo.css';
import logo from '/logo.png';

const AuthLogo = () => {
    return (
        <div className="auth-logo-container">
            <img src={logo} alt="Event Hub Logo" className="auth-logo-image" />
        </div>
    );
};

export default AuthLogo;
