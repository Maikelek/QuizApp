import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

import config from '../../config/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faPenToSquare, faTrashCan, faPlayCircle } from '@fortawesome/free-solid-svg-icons';

function Quizes() {

    const [quizes, setQuizes] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios({
                method: 'get',
                url: `${config.apiUrl}/quiz`,
                withCredentials: true,
                });
            
            await setQuizes(response.data);

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

                <button className='menu-button'>Add quiz</button>

                {quizes.map(quiz => (
                    <div key={quiz.quiz_id} className='stat-border'>
                        <span>{quiz.quiz_title}</span>
                        <div className='admin-buttons'>
                            <Link to={`/quiz/${quiz.quiz_id}`} style={{color: "white"}}><FontAwesomeIcon icon={faPlayCircle} className='edit-button' title="Play the quiz"/></Link>
                            <Link to={`/quiz-edit/${quiz.quiz_id}`} style={{color: "white"}}><FontAwesomeIcon icon={faPenToSquare} className='edit-button' title="Edit the quiz"/></Link>
                            <FontAwesomeIcon icon={faTrashCan} className='edit-button' title="Remove the quiz"/>
                        </div>
                    </div>
                ))}

            </div>

        </div>
    );
}

export default Quizes;
