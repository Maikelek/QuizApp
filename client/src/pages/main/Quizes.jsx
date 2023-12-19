import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

import useAuth from '../hooks/useAuth';
import config from '../../config/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faPenToSquare, faPlayCircle } from '@fortawesome/free-solid-svg-icons';

function Quizes() {

    const { isAdmin } = useAuth();

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

                {isAdmin ? <button className='menu-button'>Add quiz</button> : null }

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
