import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

function Index() {
  const { isLogged, logout } = useAuth();

  const handleLogout = () => {
    logout();
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
          {isLogged && (
            <li>
              <Link to="/statistics" className="menu-list-item">
                Statistics
              </Link>
            </li>
          )}
          <li>
            <Link
              to={isLogged ? '/' : '/login'}
              onClick={isLogged ? handleLogout : null}
              className="menu-list-item"
            >
              {isLogged ? 'Log out' : 'Log in'}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Index;
