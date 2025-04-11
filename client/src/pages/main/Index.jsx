import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import config from '../../config/config';
import { useUser } from '../../context/UserContext';

function Index() {
  const { user, setUser } = useUser();

  const handleLogout  = async e => {   
    e.preventDefault();
    try {
      const response = await axios.delete(`${config.apiUrl}/auth/session`, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      console.log(response.data);
      if (response.data.logout === true) {
        setUser(null);
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return (
    <div className="page-holder">
      <div className="menu">
        <h1 className="menu-title">Game Menu</h1>
        <ul className="menu-list">
          <li>
            <Link to="/quizes" className="menu-list-item">
              Choose quiz
            </Link>
          </li>
          {user && (
            <li>
              <Link to="/statistics" className="menu-list-item">
                Statistics
              </Link>
            </li>
          )}
          <li>
            <Link
              to={user ? '/' : '/login'}
              onClick={user ? handleLogout : null}
              className="menu-list-item"
            >
              {user ? 'Log out' : 'Log in'}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Index;
