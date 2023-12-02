import React, {useState} from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

import config from '../../config/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

function Login() {

  const [user, setUser] = useState({
    nickname: "",
    password: ""
  })

  const handleChange = (e) => {
    setUser(prev => ({...prev, [e.target.name]: e.target.value})); 
    console.log(user)
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    const response = await axios({
      method: 'post',
      url: `${config.apiUrl}/auth/login`,
      data: user,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (response.data.message === "Valid") {
      console.log("logged");
      localStorage.setItem("token", response.data.token);
      console.log(localStorage.getItem("token"))
      console.log(jwtDecode(localStorage.getItem("token")))
    } else {
      console.log("not logged")
    }
  }

  return (

    <div className="page-holder">

        <form className="menu" onSubmit={handleSubmit}>

            <div className="back-arrow-container">
              <Link to={"/"}><FontAwesomeIcon icon={faArrowLeft} className="back-arrow" /></Link>
            </div>

            <h1 className="menu-title">Login</h1>

            <div className="input-with-label">
                <label className='menu-label'>Nickname</label>
                <input 
                  className='menu-input' 
                  type="text" 
                  name='nickname'
                  onChange={handleChange}/>
            </div>

            <div className="input-with-label">
                <label className='menu-label'>Password</label>
                <input 
                  className='menu-input' 
                  type="password" 
                  name='password'
                  onChange={handleChange}/>
            </div>

            <button className='menu-button'>Log in</button>
            <p className='already-account'>Don't have an account? <Link to={"/register"} className='already-account-link'>Register!</Link></p>
        </form>

    </div>
  );
}

export default Login;
