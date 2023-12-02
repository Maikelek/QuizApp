import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'

function Index() {

  const [is_logged, setLogged] = useState(false);
  
  useEffect( () => {
    const token = localStorage.getItem("token");
    setLogged(token ? true : false);
  }, [])

  return (

    <div className="page-holder">

        <div className="menu">
            <h1 className="menu-title">Game Menu</h1>
            <ul className="menu-list">
                <li><Link to={"/quizes"} className='menu-list-item'>Choose quiz</Link></li>
                {is_logged ? <li><Link to={"/statistics"} className='menu-list-item'>Statistics</Link></li> : null}
                <li><Link to={"/login"} className='menu-list-item'>{is_logged ? "Log out" : "Log in"}</Link></li>
            </ul>
        </div>

    </div>
  );
}

export default Index;
