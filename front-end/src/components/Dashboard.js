import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';

import axios from 'axios';

const Dashboard = (props) => {
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const username = cookies.username;

  console.log('user from Dash', props.user);

  //window.location.reload(false);

  const fetchDashboard = async(e) => {
    await axios.get(`/dashboard/${props.user.id}`)
      .then(res => {
        console.log('Get Dashboard data');
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <div>
      Hi from Dashboard!
      Hi, {username}!
    </div>
  );
}
 
export default Dashboard;