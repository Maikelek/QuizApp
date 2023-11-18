import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from "axios"

import config from '../../config/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

function EditQuizQuestion() {

  const location = useLocation();  
  const id = location.pathname.split("/")[3]; 
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        try {
            let response = await axios({
                method: 'post',
                url: `${config.apiUrl}/quiz/admin/question`,
                withCredentials: true,
                data: { id }
            });

        await setData(response.data[0]); 
        
        } catch (error) {
            console.log(error);
        }
    };

    fetchData();
}, [id]);

  const [question, setQuestion] = useState('');
  const [optionA, setOptionA] = useState('');
  const [optionB, setOptionB] = useState('');
  const [optionC, setOptionC] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');

  const handleQuestionChange = (event) => setQuestion(event.target.value);
  const handleOptionAChange = (event) => setOptionA(event.target.value);
  const handleOptionBChange = (event) => setOptionB(event.target.value);
  const handleOptionCChange = (event) => setOptionC(event.target.value);

  const handleCorrectAnswerChange = (event) => setCorrectAnswer(event.target.value);

  const handleSubmit = () => {

  };

  return (
    <div className="page-holder">
      <div className="menu">
        <div className="back-arrow-container">
          <Link to={`/quiz-edit/${data.quiz_id}`}>
            <FontAwesomeIcon icon={faArrowLeft} className="back-arrow" />
          </Link>
        </div>

        <h1 className="menu-title">Question editor</h1>
        <h3 className="quiz-title">{data.quiz_title}</h3>
        <h3 className="quiz-title">Question id: {data.question_id}</h3>

        <form className='quiz-form'>

          <div className='quiz-border'>
            <span>Question:</span>
            <input 
              type="text" 
              onChange={handleQuestionChange} 
              name='question'
              value={data.question_text}
              />
          </div>

          <div className="option">
            <label htmlFor="optionA" className="quiz-option-label">
              A: <input 
                    type="text" 
                    id="optionA" 
                    value={data.option_a} 
                    onChange={handleOptionAChange} />
            </label>
          </div>

          <div className="option">
            <label htmlFor="optionB" className="quiz-option-label">
              B: <input 
                    type="text" 
                    id="optionB" 
                    value={data.option_b} 
                    onChange={handleOptionBChange} />
            </label>
          </div>

          <div className="option">
            <label htmlFor="optionC" className="quiz-option-label">
              C: <input 
                    type="text" 
                    id="optionC" 
                    value={data.option_c}
                    onChange={handleOptionCChange} />
            </label>
          </div>

          <div className="correct-answer">
            <span>Correct Answer:</span>
            <div>
                <label>
                A <input 
                    type="radio" 
                    name="correctAnswer" 
                    value="A" 
                    checked={data.option_correct === "A" ? true : false}
                    onChange={handleCorrectAnswerChange} />
                </label>
                <label>
                B <input 
                    type="radio" 
                    name="correctAnswer" 
                    value="B" 
                    checked={data.option_correct === "B" ? true : false}
                    onChange={handleCorrectAnswerChange} />
                </label>
                <label>
                C <input 
                    type="radio" 
                    name="correctAnswer" 
                    value="C" 
                    checked={data.option_correct === "C" ? true : false}
                    onChange={handleCorrectAnswerChange} />
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
