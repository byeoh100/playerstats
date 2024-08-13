import React, { useState } from 'react';
import './AuthPopup.css';

function AuthPopup({ onClose }) {
    const [isLogin, setIsLogin] = useState(true);

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    return (
        <div className="auth-popup">
            <div className="auth-popup-content">
                <button className="close-btn" onClick={onClose}>X</button>
                {isLogin ? (
                    <div className="login-form">
                        <h2>Log in to your account</h2>
                        <input type="email" placeholder="Email address" />
                        <input type="password" placeholder="Password" />
                        <div className="remember-me">
                            <input type="checkbox" id="rememberMe" />
                            <label htmlFor="rememberMe">Remember me</label>
                        </div>
                        <button className="forgot-password">Forgot password?</button>
                        <button className="auth-btn">Log in</button>
                        <p>Don’t have an account? <span onClick={toggleForm} className="toggle-link">Sign up for free</span></p>
                    </div>
                ) : (
                    <div className="signup-form">
                        <h2>Create an account</h2>
                        <input type="email" placeholder="Email address" />
                        <input type="password" placeholder="Password" />
                        <input type="password" placeholder="Confirm password" />
                        <div className="newsletter">
                            <input type="checkbox" id="newsletter" />
                            <label htmlFor="newsletter">Keep up to date with notifications on tracked teams</label>
                        </div>
                        <button className="auth-btn">Sign up for free</button>
                        <p>Already have an account? <span onClick={toggleForm} className="toggle-link">Log in</span></p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AuthPopup;