import React from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faPenToSquare, faTrashCan, faPlayCircle } from '@fortawesome/free-solid-svg-icons';

function Quizes() {
  return (

    <div className="page-holder">

        <div className="menu-other">

            <div className="back-arrow-container">
                <Link to={"/"}><FontAwesomeIcon icon={faArrowLeft} className="back-arrow" /></Link>
            </div>

            <h1 className="menu-title">Quizes</h1>

            <button className='menu-button'>Add quiz</button>

            <div className='stat-border'>
                <span>Biology-quiz</span>
                <FontAwesomeIcon icon={faPlayCircle} className='edit-button' title="Edit the quiz"/>
                <FontAwesomeIcon icon={faPenToSquare} className='edit-button' title="Edit the quiz"/>
                <FontAwesomeIcon icon={faTrashCan} className='edit-button' title="Remove the quiz"/>
            </div>

            <div className='stat-border'>
                <span>Networking-quiz</span>
                <FontAwesomeIcon icon={faPlayCircle} className='edit-button' title="Edit the quiz"/>
                <FontAwesomeIcon icon={faPenToSquare} className='edit-button' title="Edit the quiz"/>
                <FontAwesomeIcon icon={faTrashCan} className='edit-button' title="Remove the quiz"/>
            </div>

            <div className='stat-border'>
                <span>Programming-quiz</span>
                <FontAwesomeIcon icon={faPlayCircle} className='edit-button' title="Edit the quiz"/>
                <FontAwesomeIcon icon={faPenToSquare} className='edit-button' title="Edit the quiz"/>
                <FontAwesomeIcon icon={faTrashCan} className='edit-button' title="Remove the quiz"/>
            </div>

        </div>

    </div>
  );
}

export default Quizes;
