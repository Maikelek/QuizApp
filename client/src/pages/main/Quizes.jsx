import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import useAuth from '../hooks/useAuth';
import config from '../../config/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faPenToSquare, faPlayCircle } from '@fortawesome/free-solid-svg-icons';

function Quizes() {
  const { isAdmin } = useAuth();
  const [isAdding, setIsAdding] = useState(false);
  const [quizTitle, setQuizTitle] = useState('');
  const [quizTitleError, setQuizTitleError] = useState('');
  const [quizes, setQuizes] = useState([]);

  const handleAdding = () => {
    setIsAdding(!isAdding);
    setQuizTitleError(''); // Reset the error when toggling the add mode
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    setQuizTitle(value);
    // Validate the input and set the error message
    setQuizTitleError(value.trim() === '' ? 'Title cannot be empty' : '');
  };

  const handleAdd = async () => {
    try {
      // Check if the title is not empty before making the API call
      if (quizTitle.trim() === '') {
        setQuizTitleError('Title cannot be empty');
        return;
      }

      await axios.post(`${config.apiUrl}/quiz/admin/quiz`, { quiz_title: quizTitle }, { withCredentials: true });
      setQuizTitle('');
      setIsAdding(false);
      setQuizTitleError('');
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${config.apiUrl}/quiz`, { withCredentials: true });
        setQuizes(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="page-holder">
      <div className="menu-other">
        <div className="back-arrow-container">
          <Link to={"/"}><FontAwesomeIcon icon={faArrowLeft} className="back-arrow" /></Link>
        </div>
        <h1 className="menu-title">Quizes</h1>
        {isAdmin ? <button onClick={handleAdding} className='menu-button'>{!isAdding ? "Add quiz" : "Stop adding"}</button> : null }
        {isAdding ? 
          <div className="option">
            <label htmlFor="quiz" className="quiz-option-label">
              Title: <input 
                type="text" 
                id="quiz" 
                name='quiz'
                autoComplete='off'
                onChange={handleInputChange}
              />
            </label>
            <button onClick={handleAdd} className='menu-button'>Add</button> 
          </div>
        : null}
        {quizTitleError && <p className="error">{quizTitleError}</p>}
        {quizes.map(quiz => (
          <div key={quiz.quiz_id} className='stat-border'>
            <span>{quiz.quiz_title}</span>
            <div className='admin-buttons'>
              <Link to={`/quiz/${quiz.quiz_id}`} style={{color: "white"}}><FontAwesomeIcon icon={faPlayCircle} className='edit-button' title="Play the quiz"/></Link>
              {isAdmin ? 
                <Link to={`/quiz-edit/${quiz.quiz_id}`} style={{color: "white"}}>
                  <FontAwesomeIcon icon={faPenToSquare} className='edit-button' title="Edit the quiz"/>
                </Link>
              : 
              null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Quizes;
