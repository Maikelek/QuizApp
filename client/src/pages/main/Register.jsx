import React from 'react';

function Register() {
  return (

    <div className="page-holder">

        <form className="menu">
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
            <p className='already-account'>Already have an account? Log in!</p>
        </form>

    </div>
  );
}

export default Register;
