import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import useAuth from '../hooks/useAuth';
import config from '../../config/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

function Register() {
    const { login } = useAuth();
    const nav = useNavigate();
    const [user, setUser] = useState({
        nickname: '',
        email: '',
        password: '',
        password_repeat: '',
    });
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');
    const handleChange = (e) => {
        setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();

        const validationErrors = {};
        if (!user.nickname) {
            validationErrors.nickname = 'Nickname is required';
        }
        if (!user.email) {
            validationErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(user.email)) {
            validationErrors.email = 'Invalid email format';
        } else if (user.email.length > 50) {
            validationErrors.email = 'Email is too long';
        } else if (message) {
            validationErrors.email = 'Email is already taken'
        }
        if (!user.password) {
            validationErrors.password = 'Password is required';
        }
        if (user.password !== user.password_repeat) {
            validationErrors.password_repeat = 'Passwords do not match';
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const response = await axios({
                method: 'post',
                url: `${config.apiUrl}/auth/register`,
                data: user,
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.data.message === 'Valid') {
                login(response.data.token); 
                nav('/');
            } else {
                setMessage('Email is already taken');
            }
        } catch (err) {
            console.error(err);
            alert(err.message || 'An error occurred during registration.');
        }
    };

    return (
        <div className="page-holder">
            <form className="menu" onSubmit={handleClick}>
                <div className="back-arrow-container">
                    <Link to={'/'}>
                        <FontAwesomeIcon icon={faArrowLeft} className="back-arrow" />
                    </Link>
                </div>

                <h1 className="menu-title">Register</h1>

                <div className="input-with-label">
                    <input
                        className="menu-input"
                        type="text"
                        name="nickname"
                        placeholder="Nickname"
                        onChange={handleChange}
                        autoComplete="off"
                    />
                    {errors.nickname && <span className="error">{errors.nickname}</span>}
                </div>

                <div className="input-with-label">
                    <input
                        className="menu-input"
                        type="text"
                        name="email"
                        placeholder="E-mail"
                        onChange={handleChange}
                        autoComplete="off"
                    />
                    {errors.email && <span className="error">{errors.email}</span>}
                </div>

                <div className="input-with-label">
                    <input
                        className="menu-input"
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        autoComplete="off"
                    />
                    {errors.password && <span className="error">{errors.password}</span>}
                </div>

                <div className="input-with-label">
                    <input
                        className="menu-input"
                        type="password"
                        name="password_repeat"
                        placeholder="Repeat Password"
                        onChange={handleChange}
                        autoComplete="off"
                    />
                    {errors.password_repeat && (
                        <span className="error">{errors.password_repeat}</span>
                    )}
                </div>

                <button className="menu-button">Register</button>
                <p className="already-account">
                    Already have an account? <Link to={'/login'} className="already-account-link">Log in!</Link>
                </p>
            </form>
        </div>
    );
}

export default Register;
