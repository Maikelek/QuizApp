import React from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

function Quizes() {
  return (

    <div className="page-holder">

        <div className="menu">

            <div className="back-arrow-container">
                <Link to={"/"}><FontAwesomeIcon icon={faArrowLeft} className="back-arrow" /></Link>
            </div>

            <h1 className="menu-title">Quiz</h1>
            <h3 className="quiz-title">Programming-quiz</h3>
            <h3 className="quiz-title">Question n: 1</h3>

            <div className='quiz-border'>
                <span>Question: What is the purpose of the "finally" block in a try-except-finally construct in Python?</span>
            </div>

            <form className='quiz-form'>
              <div className="option">
                <input type="radio" id="optionA" name="quizOption" value="A" />
                <label htmlFor="optionA" className="quiz-option-label">A: To handle and catch specific exceptions. </label>
              </div>

              <div className="option">
                <input type="radio" id="optionB" name="quizOption" value="B" />
                <label htmlFor="optionB" className="quiz-option-label">B: To define code that will always be executed, whether an exception is raised or not.</label>
              </div>

              <div className="option">
                <input type="radio" id="optionC" name="quizOption" value="C" />
                <label htmlFor="optionC" className="quiz-option-label">C: To terminate the program immediately if an exception occurs.</label>
              </div>
              
              <button className='menu-button'>Submit</button>
            </form>

        </div>

    </div>
  );
}

export default Quizes;
