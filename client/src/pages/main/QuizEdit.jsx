import React from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';

function QuizEdit() {
  return (

    <div className="page-holder">

        <div className="menu-other">

            <div className="back-arrow-container">
                <Link to={"/quizes"}><FontAwesomeIcon icon={faArrowLeft} className="back-arrow" /></Link>
            </div>

            <h1 className="menu-title">Quiz Editor</h1>
            <h3 className="quiz-title">Programming-quiz</h3>
            <h3 className="quiz-title">Quiz id: 1</h3>

            <div className='stat-border'>
                <span>Python question</span>
                <FontAwesomeIcon icon={faPenToSquare} className='edit-button' title="Edit the quiz"/>
                <FontAwesomeIcon icon={faTrashCan} className='edit-button' title="Remove the quiz"/>
            </div>

            <div className='stat-border'>
                <span>Javascript question</span>
                <FontAwesomeIcon icon={faPenToSquare} className='edit-button' title="Edit the quiz"/>
                <FontAwesomeIcon icon={faTrashCan} className='edit-button' title="Remove the quiz"/>
            </div>

            <div className='stat-border'>
                <span>Computer vision question</span>
                <FontAwesomeIcon icon={faPenToSquare} className='edit-button' title="Edit the quiz"/>
                <FontAwesomeIcon icon={faTrashCan} className='edit-button' title="Remove the quiz"/>
            </div>

        </div>

    </div>
  );
}

export default QuizEdit;
