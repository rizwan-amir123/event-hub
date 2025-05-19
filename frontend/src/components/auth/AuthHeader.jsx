import './AuthHeader.css';

const AuthHeader = ({ isLogin }) => {
    return (
        <h2 className="auth-header-title">
            {isLogin ? 'Login' : 'Register'}
        </h2>
    );
};

export default AuthHeader;
