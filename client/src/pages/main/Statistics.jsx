import React from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

function Statistics() {
  return (

    <div className="page-holder">

        <div className="menu-other">

            <div className="back-arrow-container">
                <Link to={"/"}><FontAwesomeIcon icon={faArrowLeft} className="back-arrow" /></Link>
            </div>

            <h1 className="menu-title">Statistics</h1>
            <div className='stat-border'>
                <span>Biology-quiz</span>
                <span>70p</span>
                <span>10.4.1988</span>
            </div>

            <div className='stat-border'>
                <span>Networking-quiz</span>
                <span>30p</span>
                <span>11.7.2027</span>
            </div>

            <div className='stat-border'>
                <span>Programming-quiz</span>
                <span>11p</span>
                <span>11.4.2001</span>
            </div>

        </div>

    </div>
  );
}

export default Statistics;
