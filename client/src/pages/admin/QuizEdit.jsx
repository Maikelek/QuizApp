import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import axios from "axios";

import useAuth from '../hooks/useAuth';
import config from '../../config/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';

function QuizEdit() {
    const location = useLocation();
    const id = location.pathname.split("/")[2];
    const nav = useNavigate();
    const { isAdmin } = useAuth();
    useEffect(() => {
        if (!isAdmin) {
            nav('/');
        }
    }, [isAdmin, nav]);
    const [questions, setQuestions] = useState([]);
    const [title, setTitle] = useState([]);
    const [isAdding, setIsAdding] = useState(false);
    const [question_title, setQuestion_title] = useState('');
    const [error, setError] = useState('');

    const handleAdding = () => {
        setIsAdding(!isAdding);
        setError('');
    };

    const handleInputChange = (e) => {
        const { value } = e.target;
        setQuestion_title(value);
    };

    const handleAdd = async () => {
        if (question_title.trim() === '') {
            setError('Title cannot be empty');
            return;
        }

        try {
            await axios.post(`${config.apiUrl}/quiz/admin/addQuestion`, { question_title: question_title, quiz_id: id }, { withCredentials: true });
            setQuestion_title('');
            setIsAdding(false);
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    };

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
    }, [id]);

    const handleClickQuestion = async (question_id) => {
        try {
            await axios({
                method: 'delete',
                url: `${config.apiUrl}/quiz/admin/question`,
                withCredentials: true,
                data: { question_id }
            });
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }

    const handleClickQuiz = async () => {
        try {
            await axios({
                method: 'delete',
                url: `${config.apiUrl}/quiz/admin`,
                withCredentials: true,
                data: { id }
            });
            nav("/quizes");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="page-holder">
            <div className="menu-other">
                <div className="back-arrow-container">
                    <Link to={"/quizes"}><FontAwesomeIcon icon={faArrowLeft} className="back-arrow" /></Link>
                </div>
                <h1 className="menu-title">Quiz Editor</h1>
                <h3 className="quiz-title">{title}</h3>
                <h3 className="quiz-title">Quiz id: {id}</h3>
                <div>
                    <button onClick={handleAdding} className='menu-button'>{!isAdding ? "Add question" : "Stop adding"}</button>
                    <button className='menu-button' onClick={() => handleClickQuiz()}>Remove quiz</button>
                </div>
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
                {error && <p className="error">{error}</p>}
                {questions.map(question => (
                    <div key={question.question_id} className='stat-border'>
                        <span>{question.question_title}</span>
                        <div className='admin-buttons'>
                            <Link to={`/quiz-edit/question/${question.question_id}`} style={{ color: "white" }}><FontAwesomeIcon icon={faPenToSquare} className='edit-button' title="Edit the quiz" /></Link>
                            <FontAwesomeIcon icon={faTrashCan} className='edit-button' onClick={() => handleClickQuestion(question.question_id)} title="Remove the quiz" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default QuizEdit;
