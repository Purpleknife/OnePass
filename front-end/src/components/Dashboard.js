import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

import axios from 'axios';
import { useNavigate, Navigate } from 'react-router-dom';
import GeneratePass from './GeneratePass';

const Dashboard = (props) => {
  const [passwords, setPasswords] = useState();
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const username = cookies.username;
  const user_id = cookies.user_id;
  const loggedIn = cookies.loggedIn;
  console.log('loggedIn', loggedIn);

  const navigate = useNavigate();

  const fetchDashboard = async(e) => {
    await axios.get(`/dashboard/${user_id}`)
      .then(res => {
        console.log('Get Dashboard data', res.data);
        //setPasswords(res.data);
      })
      .catch(error => {
        console.log(error.message);
      });
  };

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
  }

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <div>
      { !loggedIn 
      ? <Navigate to="/" />
      : <div> 
        Hi from Dashboard!
        Hi, {username}!
        <br />
        <button type='submit' onClick={logout}>Logout</button>
      </div>
      }

      <GeneratePass />

    </div>
  );
}
 
export default Dashboard;