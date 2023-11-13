import React from 'react';

function Login() {
  return (

    <div className="page-holder">

        <form className="menu">
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
            <p className='already-account'>Don't have an account? Register!</p>
        </form>

    </div>
  );
}

export default Login;
