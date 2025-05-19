import './AuthForm.css';

const AuthForm = ({
    isLogin,
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    tenantName,
    setTenantName,
    onSubmit,
    error,
    loading
}) => {
    return (
        <form className="auth-form" onSubmit={onSubmit}>
            {!isLogin && (
                <div className="auth-form-group">
                    <label htmlFor="name" className="auth-form-label">Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="auth-form-input"
                        placeholder="Your Name"
                    />
                </div>
            )}
            <div className="auth-form-group">
                <label htmlFor="email" className="auth-form-label">Email</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="auth-form-input"
                    placeholder="you@example.com"
                />
            </div>
            <div className="auth-form-group">
                <label htmlFor="password" className="auth-form-label">Password</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="auth-form-input"
                    placeholder="Password"
                />
            </div>
            {!isLogin && (
            		<div className="auth-form-group">
		              <label htmlFor="tenantName" className="auth-form-label">Tenant</label>
		              <input
		                      type="text"
		                      id="tenantName"
		                      value={tenantName}
		                      onChange={(e) => setTenantName(e.target.value)}
		                      className="auth-form-input"
		                      placeholder="Tenant Name"
		              />
            		</div>
            )}
            {error && <div className="auth-form-error">An error occured, try again.</div>}
            <button type="submit" className="auth-form-button" disabled={loading}>
                {loading ? (isLogin ? 'Logging in...' : 'Registering...') : (isLogin ? 'Login' : 'Register')}
            </button>
        </form>
    );
};

export default AuthForm;
