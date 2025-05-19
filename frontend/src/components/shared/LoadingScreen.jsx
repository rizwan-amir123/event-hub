import './LoadingScreen.css';
import logo from '/logo-color.svg';

const LoadingScreen = () => {
    return (
        <div className="loading-screen">
            <img src={logo} alt="Event Hub Logo" className="loading-logo" />
            <p>Loading...</p>
        </div>
    );
};

export default LoadingScreen;

