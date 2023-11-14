import React from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

function Register() {
  return (

    <div className="page-holder">

        <form className="menu">
            <div className="back-arrow-container">
                <Link to={"/"}><FontAwesomeIcon icon={faArrowLeft} className="back-arrow" /></Link>
            </div>

            <h1 className="menu-title">Register</h1>

            <div className="input-with-label">
                <label className='menu-label'>Nickname</label>
                <input className='menu-input' type="text" />
            </div>

            <div className="input-with-label">
                <label className='menu-label'>E-mail</label>
                <input className='menu-input' type="text" />
            </div>

            <div className="input-with-label">
                <label className='menu-label'>Password</label>
                <input className='menu-input' type="password" />
            </div>

            <div className="input-with-label">
                <label className='menu-label'>Repeat Password</label>
                <input className='menu-input' type="password" />
            </div>

            <button className='menu-button'>Register</button>
            <p className='already-account'>Already have an account? <Link to={"/login"} className='already-account-link'>Log in!</Link></p>
        </form>

    </div>
  );
}

export default Register;
