import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import axios from "axios";

import config from '../../config/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';

function QuizEdit() {


    const location = useLocation();  
    const id = location.pathname.split("/")[2]; 
    const [questions, setQuestions] = useState ( [] );
    const [title, setTitle] = useState ( [] );

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await axios({
                    method: 'post',
                    url: `${config.apiUrl}/quiz/admin`,
                    withCredentials: true,
                    data: { id }
                });
            
            setQuestions(response.data.questions)
            setTitle(response.data.quizTitle.quiz_title)
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
                    <Link to={"/quizes"}><FontAwesomeIcon icon={faArrowLeft} className="back-arrow" /></Link>
                </div>

                <h1 className="menu-title">Quiz Editor</h1>
                <h3 className="quiz-title">{title}</h3>
                <h3 className="quiz-title">Quiz id: {id}</h3>


                {questions.map(question => (
                    <div key={question.question_id} className='stat-border'>
                        <span>{question.question_title}</span>
                        <Link to={`/quiz-edit/question/${question.question}`} style={{color: "white"}}><FontAwesomeIcon icon={faPenToSquare} className='edit-button' title="Edit the quiz"/></Link>
                        <FontAwesomeIcon icon={faTrashCan} className='edit-button' title="Remove the quiz"/>
                    </div>
                ))}

            </div>

        </div>
    );
}

export default QuizEdit;
