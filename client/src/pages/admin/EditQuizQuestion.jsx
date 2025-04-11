import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import config from '../../config/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

function EditQuizQuestion() {
  const location = useLocation();
  const nav = useNavigate();

  const questionId = location.pathname.split("/")[3];
  const [isUpdate, setIsUpdate] = useState(false);
  const [quizData, setQuizData] = useState({ title: '', quizId: '' });
  const [formData, setFormData] = useState({
    question: '',
    optionA: '',
    optionB: '',
    optionC: '',
    correctAnswer: '',
    id: questionId || 0,
  });
  const [formErrors, setFormErrors] = useState({
    question: '',
    optionA: '',
    optionB: '',
    optionC: '',
    correctAnswer: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `${config.apiUrl}/quiz/admin/question`,
          { id: questionId },
          { withCredentials: true }
        );

        if (response.data.length > 0) {
          const questionData = response.data[0];
          setQuizData({
            title: questionData.quiz_title,
            quizId: questionData.quiz_id,
          });
          setFormData({
            question: questionData.question_text,
            optionA: questionData.option_a,
            optionB: questionData.option_b,
            optionC: questionData.option_c,
            correctAnswer: questionData.option_correct,
            id: questionData.question_id,
          });
          setIsUpdate(true);
        } else {
          setIsUpdate(false);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (questionId) {
      fetchData();
    }
  }, [questionId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const method = isUpdate ? 'put' : 'post';
        const url = `${config.apiUrl}/quiz/admin/optionEdit`;

        await axios({
          method,
          url,
          withCredentials: true,
          data: { formData },
        });
        nav(`/quiz-edit/${quizData.quizId}`)
      } catch (error) {
        console.error(error);
      }
    }
  };

  const validateForm = () => {
    let isValid = true;
    const errors = {
      question: '',
      optionA: '',
      optionB: '',
      optionC: '',
      correctAnswer: '',
    };

    if (formData.question.trim() === '') {
      errors.question = 'Question is required';
      isValid = false;
    }

    if (formData.optionA.trim() === '') {
      errors.optionA = 'Option A is required';
      isValid = false;
    }

    if (formData.optionB.trim() === '') {
      errors.optionB = 'Option B is required';
      isValid = false;
    }

    if (formData.optionC.trim() === '') {
      errors.optionC = 'Option C is required';
      isValid = false;
    }

    if (formData.correctAnswer.trim() === '') {
      errors.correctAnswer = 'Correct Answer is required';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  return (
    <div className="page-holder">
      <div className="menu-other">
        <div className="back-arrow-container">
          <Link to={`/quiz-edit/${quizData.quizId}`}>
            <FontAwesomeIcon icon={faArrowLeft} className="back-arrow" />
          </Link>
        </div>

        <h1 className="menu-title">Question editor</h1>
        <h3 className="quiz-title">{quizData.title}</h3>
        <h3 className="quiz-title">Question id: {formData.id}</h3>

        <form className='quiz-form' onSubmit={handleSubmit}>

          <div className='quiz-border'>
            <span>Question:</span>
            <input 
              type="text" 
              onChange={handleInputChange} 
              name='question'
              value={formData.question}
            />
            {formErrors.question && <span className="error">{formErrors.question}</span>}
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
              {formErrors.optionA && <span className="error">{formErrors.optionA}</span>}
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
              {formErrors.optionB && <span className="error">{formErrors.optionB}</span>}
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
              {formErrors.optionC && <span className="error">{formErrors.optionC}</span>}
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
            {formErrors.correctAnswer && <span className="error">{formErrors.correctAnswer}</span>}
          </div>

          <button className='menu-button' onClick={handleSubmit}>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default EditQuizQuestion;
