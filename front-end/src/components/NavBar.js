import React from 'react';

import { useCookies } from 'react-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import './NavBar.scss';

const NavBar = (props) => {
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const username = cookies.username;
  const loggedIn = cookies.loggedIn;

  const navigate = useNavigate();

  const logout = () => {
    axios.get('/logout')
      .then(data => {
        props.setUser(null);
        removeCookie('username', {path: '/'});
        removeCookie('user_id', {path: '/'});
        removeCookie('loggedIn', {path: '/'});
        removeCookie('user_session', {path: '/'});
        navigate('/');
      })
  };

  return (
    <div className='navbar'>
      <div className='side'>
        {/* <img
            id="cover"
            src='images\lock.jpg'
            alt='side-nav'
        /> */}
        <div id='cover'></div>
        <div className='logo'>OnePass</div>
      </div>

      {loggedIn && <div className='user_info'>
        <span id='welcome'>Welcome, <strong>{username}</strong>!</span>&nbsp;&nbsp;&nbsp;&nbsp;
        <span id='logout'><button type='submit' onClick={logout}>Logout</button></span>
      </div>}
    </div>
  );
}
 
export default NavBar;