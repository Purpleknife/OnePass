import React from 'react';

import { useCookies } from 'react-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const NavBar = (props) => {
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const username = cookies.username;
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
      <div className='logo'>OnePass</div>
      <div className='user_info'>
        <span>Welcome, {username}!</span>
        <span className='logout'><button type='submit' onClick={logout}>Logout</button></span>
      </div>
    </div>
  );
}
 
export default NavBar;