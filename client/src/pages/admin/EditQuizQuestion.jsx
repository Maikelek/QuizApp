import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from "axios"

import config from '../../config/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

function EditQuizQuestion() {
  const location = useLocation();  
  const id = location.pathname.split("/")[3]; 
  const [data, setData] = useState({
    title: '',
    quiz_id: ''
  });
  const [formData, setFormData] = useState({
    question: '',
    optionA: '',
    optionB: '',
    optionC: '',
    correctAnswer: '',
    id: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axios({
          method: 'post',
          url: `${config.apiUrl}/quiz/admin/question`,
          withCredentials: true,
          data: { id }
        });

        const questionData = response.data[0];
        setData ({
          title: questionData.quiz_title,
          quiz_id: questionData.quiz_id
        })
        setFormData({
          question: questionData.question_text,
          optionA: questionData.option_a,
          optionB: questionData.option_b,
          optionC: questionData.option_c,
          correctAnswer: questionData.option_correct,
          id: id
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)
    try {
      await axios({
        method: 'put',
        url: `${config.apiUrl}/quiz/admin/question`,
        withCredentials: true,
        data: { formData }
      });

    } catch (error) {
      console.log(error);
    }
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
        <h3 className="quiz-title">{data.title}</h3>
        <h3 className="quiz-title">Question id: {id}</h3>

        <form className='quiz-form' onSubmit={handleSubmit}>

          <div className='quiz-border'>
            <span>Question:</span>
            <input 
              type="text" 
              onChange={handleInputChange} 
              name='question'
              value={formData.question}
            />
          </div>

          <div className="option">
            <label htmlFor="optionA" className="quiz-option-label">
              A: <input 
                type="text" 
                id="optionA" 
                name='optionA'
                value={formData.optionA} 
                onChange={handleInputChange}
              />
            </label>
          </div>

          <div className="option">
            <label htmlFor="optionB" className="quiz-option-label">
              B: <input 
                type="text" 
                id="optionB" 
                name='optionB'
                value={formData.optionB} 
                onChange={handleInputChange}
              />
            </label>
          </div>

          <div className="option">
            <label htmlFor="optionC" className="quiz-option-label">
              C: <input 
                type="text" 
                id="optionC" 
                name='optionC'
                value={formData.optionC}
                onChange={handleInputChange}
              />
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
                  checked={formData.correctAnswer === "A"}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                B <input 
                  type="radio" 
                  name="correctAnswer" 
                  value="B" 
                  checked={formData.correctAnswer === "B"}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                C <input 
                  type="radio" 
                  name="correctAnswer" 
                  value="C" 
                  checked={formData.correctAnswer === "C"}
                  onChange={handleInputChange}
                />
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
