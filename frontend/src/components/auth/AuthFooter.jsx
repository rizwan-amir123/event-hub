import './AuthFooter.css';

const AuthFooter = ({ isLogin, onToggle }) => {
    return (
        <div className="auth-footer">
            <button onClick={onToggle} className="auth-footer-button">
                {isLogin ? 'Create an account' : 'Already have an account?'}
            </button>
        </div>
    );
};

export default AuthFooter;
