import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useUser } from '../../context/UserContext';
import config from '../../config/config';

function Statistics() {
    const [statistics, setStatistics] = useState([]);
    const { user } = useUser();
    const userId = user?.id;
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchUserQuizStatistics = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await axios.post(`${config.apiUrl}/quiz/user/statistics`, {
                    userId,
                });
                setStatistics(response.data.reverse());
            } catch (error) {
                setError(error.message || 'An error occurred while fetching statistics.');
            } finally {
                setLoading(false);
            }
        };

        if (userId !== null) {
            fetchUserQuizStatistics();
        }
    }, [userId]);

    function formatDate(inputDate) {
        const date = new Date(inputDate);
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = String(date.getFullYear()).slice(-2);

        return `${hours}:${minutes} ${day}/${month}/${year}`;
    }

    return (
        <div className="page-holder">
            <div className="menu-other">
                <div className="back-arrow-container">
                    <Link to={"/"}><FontAwesomeIcon icon={faArrowLeft} className="back-arrow" /></Link>
                </div>
                <h1 className="menu-title">Statistics</h1>
                {loading && <p className='stat-border'>Loading...</p>}
                {error && <p className='stat-border'>Error: {error}</p>}
                {!loading && !error && (
                    <div>
                        {statistics.length > 0 ? (
                            statistics.map((statistic, index) => (
                                <div key={index} className='stat-border'>
                                    <span>{statistic.quiz_title}</span>
                                    <span>{statistic.stat_correct_answers}/{statistic.stat_num_answers}</span>
                                    <span>{formatDate(statistic.stat_time)}</span>
                                </div>
                            ))
                        ) : (
                            <p className='stat-border'>No statistics available.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Statistics;
