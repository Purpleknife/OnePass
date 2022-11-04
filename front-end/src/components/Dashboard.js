import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

import axios from 'axios';
import { Navigate } from 'react-router-dom';
import GeneratePass from './GeneratePass';
import OneLogin from './OneLogin';
import NavBar from './NavBar';

import './Dashboard.scss';

const Dashboard = (props) => {
  const [passwords, setPasswords] = useState();
  const [passList, setPassList] = useState();
  const [cookies, setCookie] = useCookies(['user']);
  const user_id = cookies.user_id;
  const loggedIn = cookies.loggedIn;

  const fetchDashboard = async(e) => {
    await axios.get(`/dashboard/${user_id}`)
      .then(res => {
        setPasswords(res.data);
        
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  
  const generatePassList = async() => {
    const loginList = await passwords.map(pass => {
      return (
        <OneLogin
          key={pass.id}
          id={pass.id}
          title={pass.title}
          content={pass.content}
          email={pass.email}
          date={pass.date_created}
          fetch={fetchDashboard}
        />
      )
    });
    setPassList(loginList);
  }

  useEffect(() => {
    fetchDashboard();
  }, []);

  useEffect(() => {
    if (passwords) {
      generatePassList();
    }
  }, [passwords]);


  return (
    <div className='dashboard'>
      { !loggedIn 
      ? <Navigate to="/" />
      : 
      <div>

        <NavBar setUser={props.setUser} />
        <div className='generate_pass_dash'>
          <GeneratePass fetch={fetchDashboard}/>
        </div>
      <div className='container'>
        {passList}
      </div>
        
      </div>
      }
      
    </div>
  );
}
 
export default Dashboard;