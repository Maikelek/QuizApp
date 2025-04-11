import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../../context/UserContext';
import config from '../../config/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

function Login() {
  const nav = useNavigate();
  const [error, setError] = useState('');
  const { user, setUser } = useUser();

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!user.nickname || !user.password) {
      setError('Please fill in all fields');
      return;
    }
  
    try {
      const response = await axios.post(`${config.apiUrl}/auth/login`, user, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      console.log(response.data);
      if (response.data.message === 'ok') {
        setUser(response.data.user);
        nav('/');
      } else {
        setError('Wrong username or password');
      }
    } catch (error) {
      setError('An error occurred');
    }
  };

  return (
    <div className="page-holder">
      <form className="menu" onSubmit={handleSubmit}>
        <div className="back-arrow-container">
          <Link to={'/'}>
            <FontAwesomeIcon icon={faArrowLeft} className="back-arrow" />
          </Link>
        </div>

        <h1 className="menu-title">Login</h1>

        <div className="input-with-label">
          <input
            className="menu-input"
            type="text"
            name="nickname"
            placeholder="Nickname"
            onChange={handleChange}
          />
        </div>

        <div className="input-with-label">
          <input
            className="menu-input"
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />
        </div>

        {error && <p className="error-message error">{error}</p>}

        <button className="menu-button">Log in</button>
        <p className="already-account">
          Don't have an account?{' '}
          <Link to={'/register'} className="already-account-link">
            Register!
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
