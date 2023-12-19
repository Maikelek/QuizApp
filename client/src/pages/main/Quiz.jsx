import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from "axios";

import useAuth from '../hooks/useAuth';
import config from '../../config/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

function Quiz() {

  const { isLogged } = useAuth();

  const location = useLocation();  
  const id = location.pathname.split("/")[2]; 

  const [quizData, setQuizData] = useState({ quizTitle: "", questions: [] });
  const [title, setTitle] = useState("");
  const [userAnswer, setUserAnswer] = useState(0);

  const [counter, setCounter] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [finish, setFinish] = useState(0);
  const question_num = quizData.questions.length;

  const handleOptionChange = (e) => {
    const answer = e.target.value;
    setUserAnswer(answer);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (userAnswer === quizData.questions[counter].options.option_correct) {
      setCorrect(correct + 1);
    }
    if (counter+1 !== question_num) {
      setCounter(counter + 1);
    } else {
      setFinish(1);
    }

  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axios({
          method: 'post',
          url: `${config.apiUrl}/quiz`,
          withCredentials: true,
          data: { id }
        });

        setQuizData(response.data);
        setTitle(response.data.quizTitle);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="page-holder">
      {finish === 0 ? 
      // QUIZ
        <div className="menu">
          <div className="back-arrow-container">
            <Link to={"/quizes"}><FontAwesomeIcon icon={faArrowLeft} className="back-arrow" /></Link>
          </div>

          <h1 className="menu-title">Quiz</h1>
          <h3 className="quiz-title">{title}</h3>
          <h3 className="quiz-title">Question n: {counter + 1} / {question_num}</h3>
          <h3 className="quiz-title">Correct: {correct} / {question_num}</h3>

          <div className='quiz-border'>
            {quizData.questions.length > 0 &&
              <span>Question: {quizData.questions[counter].question_text}</span>
            }
          </div>

          <form className='quiz-form' onSubmit={handleSubmit}>
            {quizData.questions.length > 0 &&
              <div className="option">
                <input type="radio" id="optionA" name="quizOption" value="A" onChange={handleOptionChange} />
                <label htmlFor="optionA" className="quiz-option-label">A: {quizData.questions[counter].options.option_a} </label>
              </div>
            }

            {quizData.questions.length > 0 &&
              <div className="option">
                <input type="radio" id="optionB" name="quizOption" value="B" onChange={handleOptionChange} />
                <label htmlFor="optionB" className="quiz-option-label">B: {quizData.questions[counter].options.option_b}</label>
              </div>
            }

            {quizData.questions.length > 0 &&
              <div className="option">
                <input type="radio" id="optionC" name="quizOption" value="C" onChange={handleOptionChange}/>
                <label htmlFor="optionC" className="quiz-option-label">C: {quizData.questions[counter].options.option_c}</label>
              </div>
            }

            <button className='menu-button'>{counter+1 === question_num ? "Finish" : "Next"}</button>
          </form>

        </div>
      :
      // END OF QUIZ
        <div className="menu">
          <div className="back-arrow-container">
            <Link to={"/quizes"}><FontAwesomeIcon icon={faArrowLeft} className="back-arrow" /></Link>
          </div>

          <h1 className="menu-title">END OF THE QUIZ</h1>
          <h3 className="quiz-title">{title}</h3>
          <h3 className="quiz-title">Question n: {counter + 1} / {question_num}</h3>
          <h3 className="quiz-title">Correct: {correct} / {question_num}</h3>

          <div className='quiz-border'>
            {quizData.questions.length > 0 &&
              <span>Thanks for playing 😎</span>
            }
          </div>

          <form className='quiz-form' onSubmit={handleSubmit}>
            <Link to={"/"}><button className='menu-button'>BACK TO MENU</button></Link>
            {isLogged ? <button className='menu-button'>SAVE SCORE</button> : null}
          </form>

        </div>
      }

    </div>
  );
}

export default Quiz;
