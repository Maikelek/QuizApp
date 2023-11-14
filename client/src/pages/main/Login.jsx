import React from 'react';
import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

function Login() {
  return (

    <div className="page-holder">

        <form className="menu">

            <div className="back-arrow-container">
              <Link to={"/"}><FontAwesomeIcon icon={faArrowLeft} className="back-arrow" /></Link>
            </div>

            <h1 className="menu-title">Login</h1>

            <div className="input-with-label">
                <label className='menu-label'>Nickname</label>
                <input className='menu-input' type="text" />
            </div>

            <div className="input-with-label">
                <label className='menu-label'>Password</label>
                <input className='menu-input' type="password" />
            </div>

            <button className='menu-button'>Log in</button>
            <p className='already-account'>Don't have an account? <Link to={"/register"} className='already-account-link'>Register!</Link></p>
        </form>

    </div>
  );
}

export default Login;
