import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { jwtDecode } from 'jwt-decode';

import config from '../../config/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faPenToSquare, faPlayCircle } from '@fortawesome/free-solid-svg-icons';

function Quizes() {

    const [is_logged, setLogged] = useState(false);
    const [is_admin, setAdmin] = useState(false);
  
    useEffect(() => {
        const token = localStorage.getItem('token');
        setLogged(token ? true : false);
      
        if (token && is_logged) {
          const decodedToken = jwtDecode(token);
          setAdmin(decodedToken.isAdmin === 1);
        }
      }, [is_logged]); 

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

                {is_admin ? <button className='menu-button'>Add quiz</button> : null }

                {quizes.map(quiz => (
                    <div key={quiz.quiz_id} className='stat-border'>
                        <span>{quiz.quiz_title}</span>
                        <div className='admin-buttons'>
                            <Link to={`/quiz/${quiz.quiz_id}`} style={{color: "white"}}><FontAwesomeIcon icon={faPlayCircle} className='edit-button' title="Play the quiz"/></Link>
                            {is_admin ? 
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
