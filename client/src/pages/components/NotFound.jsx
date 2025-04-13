import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

function Loading() {

    return (
        <div className="page-holder">

            <div className='menu'>
                <div className="back-arrow-container">
                    <Link to={'/'}>
                        <FontAwesomeIcon icon={faArrowLeft} className="back-arrow" />
                    </Link>
                </div>

                <h1 className='menu-title'>This site does not exist.</h1>
            </div>

        </div>
    );
}

export default Loading;