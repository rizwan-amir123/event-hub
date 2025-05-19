import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import AuthHeader from '../../components/auth/AuthHeader';
import AuthForm from '../../components/auth/AuthForm';
import AuthLogo from '../../components/auth/AuthLogo';
import AuthFooter from '../../components/auth/AuthFooter';
import './AuthPage.css';

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true); // State to toggle between Login and Register
    const { login, register, error, loading } = useContext(AuthContext); // Use context for auth
    const [name, setName] = useState('');
    const [tenantName, setTenantName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [localError, setLocalError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLocalError(null); // Clear previous errors

        try {
            if (isLogin) {
                // Use context login function
                await login(email, password);
            } else {
                // Use context register function
                await register(name, email, password, tenantName);
            }
        } catch (err) {
            // Handle error here if needed, but it's already handled in the context
            setLocalError(err.message);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <AuthLogo />
                <AuthHeader isLogin={isLogin} />
                <AuthForm
                    isLogin={isLogin}
                    name={name}
                    setName={setName}
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    tenantName={tenantName}
                    setTenantName={setTenantName}
                    onSubmit={handleSubmit}
                    error={localError || error} // Show local or context error
                    loading={loading}
                />
                <AuthFooter isLogin={isLogin} onToggle={() => setIsLogin(!isLogin)} />
            </div>
        </div>
    );
};

export default AuthPage;

