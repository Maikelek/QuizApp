import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

function EditQuizQuestion() {
  const [question, setQuestion] = useState('');
  const [optionA, setOptionA] = useState('');
  const [optionB, setOptionB] = useState('');
  const [optionC, setOptionC] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');

  // Define event handler functions
  const handleQuestionChange = (event) => setQuestion(event.target.value);
  const handleOptionAChange = (event) => setOptionA(event.target.value);
  const handleOptionBChange = (event) => setOptionB(event.target.value);
  const handleOptionCChange = (event) => setOptionC(event.target.value);

  const handleCorrectAnswerChange = (event) => setCorrectAnswer(event.target.value);

  const handleSubmit = () => {
    // Your submission logic goes here
  };

  return (
    <div className="page-holder">
      <div className="menu">
        <div className="back-arrow-container">
          <Link to={"/quiz-edit"}>
            <FontAwesomeIcon icon={faArrowLeft} className="back-arrow" />
          </Link>
        </div>

        <h1 className="menu-title">Question editor</h1>
        <h3 className="quiz-title">Programming-quiz</h3>
        <h3 className="quiz-title">Question id: 1</h3>

        <form className='quiz-form'>

          <div className='quiz-border'>
            <span>Question:</span>
            <input type="text" value={question} onChange={handleQuestionChange} />
          </div>

          <div className="option">
            <label htmlFor="optionA" className="quiz-option-label">
              A: <input type="text" id="optionA" value={optionA} onChange={handleOptionAChange} />
            </label>
          </div>

          <div className="option">
            <label htmlFor="optionB" className="quiz-option-label">
              B: <input type="text" id="optionB" value={optionB} onChange={handleOptionBChange} />
            </label>
          </div>

          <div className="option">
            <label htmlFor="optionC" className="quiz-option-label">
              C: <input type="text" id="optionC" value={optionC} onChange={handleOptionCChange} />
            </label>
          </div>

          <div className="correct-answer">
            <span>Correct Answer:</span>
            <div>
                <label>
                A <input type="radio" name="correctAnswer" value="A" onChange={handleCorrectAnswerChange} />
                </label>
                <label>
                B <input type="radio" name="correctAnswer" value="B" onChange={handleCorrectAnswerChange} />
                </label>
                <label>
                C <input type="radio" name="correctAnswer" value="C" onChange={handleCorrectAnswerChange} />
                </label>
            </div>
          </div>

          <button className='menu-button' onClick={handleSubmit}>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default EditQuizQuestion;
