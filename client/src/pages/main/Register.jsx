import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import config from '../../config/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

function Register() {
    const nav = useNavigate();
    const [user, setUser] = useState({
        nickname: '',
        email: '',
        password: '',
        password_repeat: '',
    });
    const [errors, setErrors] = useState({});

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

            if (response.data) {
                console.log('a');
            } else {
                console.log('b');
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
                    <label className="menu-label">Nickname</label>
                    <input
                        className="menu-input"
                        type="text"
                        name="nickname"
                        onChange={handleChange}
                        autoComplete="off"
                    />
                    {errors.nickname && <span className="error">{errors.nickname}</span>}
                </div>

                <div className="input-with-label">
                    <label className="menu-label">E-mail</label>
                    <input
                        className="menu-input"
                        type="text"
                        name="email"
                        onChange={handleChange}
                        autoComplete="off"
                    />
                    {errors.email && <span className="error">{errors.email}</span>}
                </div>

                <div className="input-with-label">
                    <label className="menu-label">Password</label>
                    <input
                        className="menu-input"
                        type="password"
                        name="password"
                        onChange={handleChange}
                        autoComplete="off"
                    />
                    {errors.password && <span className="error">{errors.password}</span>}
                </div>

                <div className="input-with-label">
                    <label className="menu-label">Repeat Password</label>
                    <input
                        className="menu-input"
                        type="password"
                        name="password_repeat"
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
