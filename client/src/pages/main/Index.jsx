import React from 'react';
import { Link } from 'react-router-dom'

function Index() {
  return (

    <div className="page-holder">

        <div className="menu">
            <h1 className="menu-title">Game Menu</h1>
            <ul className="menu-list">
                <li><Link to={"/quizes"} className='menu-list-item'>Choose quiz</Link></li>
                <li><Link to={"/statistics"} className='menu-list-item'>Statistics</Link></li>
                <li><Link to={"/login"} className='menu-list-item'>Log in</Link></li>
            </ul>
        </div>

    </div>
  );
}

export default Index;
