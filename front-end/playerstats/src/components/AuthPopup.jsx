import React, { useState, useEffect } from 'react';
import './AuthPopup.css';
import Form from "react-bootstrap/Form"
import { useOutletContext } from 'react-router-dom';
import { signIn, signUp } from '../utilities';
import axios from 'axios';

function AuthPopup({ onClose, setUser, user }) {
    const [isLogin, setIsLogin] = useState(true)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [fakeEmail, setFakeEmail] = useState(true)
    const [showFake, setShowFake] = useState(false)

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    const handleSignUp = async (e) => {
        e.preventDefault()
        let res = await axios.get(`/checkpass/${email}`, {
            headers: {
                "Authorization": `Bearer xaIFzCi3pw3OlHqGsUJiIYTqCdHtYnHx`
            }
        })
        setFakeEmail(res.data.disposable)
        if (fakeEmail == false) {
            setUser(await signUp(email, password))
            window.location.reload()
        }
        else {
            setShowFake(true)
            setTimeout(() => {
                setShowFake(false)
            }, 3000)
        }
    };

    const handleSignIn = async (e) => {
        e.preventDefault()
        setUser(await signIn(email, password))
        window.location.reload()
    };

    return (
        <div className="auth-popup">
            <div className="auth-popup-content">
                <button className="close-btn" onClick={onClose}>X</button>
                {isLogin ? (
                    <div className="login-form">
                        <h3>Log in to your account</h3>
                        <Form onSubmit={(e) => handleSignIn(e)}>
                            <Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
                                <Form.Control
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    type="email"
                                    placeholder="Email address"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Control
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    type="password"
                                    placeholder="Password"
                                />
                            </Form.Group>
                            <Form.Group className="remember-me" controlId="formBasicCheckbox">
                                <Form.Check
                                    type="checkbox"
                                    label="Remember me"
                                    className="mb-0"
                                />
                                <button className="forgot-password">Forgot password?</button>
                            </Form.Group>
                            <button className="auth-btn" type="submit">Log in</button>
                            <p>Don't have an account? <span onClick={toggleForm} className="toggle-link">Sign up for free</span></p>
                        </Form>
                    </div>
                ) : (
                    <div className="signup-form">
                        <h3>Create an account</h3>
                        <Form onSubmit={(e) => handleSignUp(e)}>
                            <Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
                                {showFake ? <Form.Label style={{color: 'red'}}>Please use a valid email</Form.Label> : undefined}
                                <Form.Control
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    type="email"
                                    placeholder="Email address"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Control
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    type="password"
                                    placeholder="Password"
                                />
                            </Form.Group>
                            {/* <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Control
                                    type="password"
                                    placeholder="Confirm Password"
                                />
                            </Form.Group> */}
                            <Form.Group className="newsletter" controlId="formBasicCheckbox">
                                <Form.Check
                                    type="checkbox"
                                    label="Stay up to date with email notifications"
                                    className="mb-0"
                                />
                            </Form.Group>
                            <button className="auth-btn" type="submit">Sign up for free</button>
                            <p>Already have an account? <span onClick={toggleForm} className="toggle-link">Log in</span></p>
                        </Form>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AuthPopup;