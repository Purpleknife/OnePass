import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';

import axios from 'axios';

const Dashboard = (props) => {
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const first_name = cookies.first_name;
  const last_name = cookies.last_name;
  const user_id = cookies.user_id;

  console.log('user from Dash', user_id);

  const fetchDashboard = async(e) => {
    await axios.get(`/dashboard/${user_id}`)
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
      Hi, {first_name + ' ' + last_name}!
    </div>
  );
}
 
export default Dashboard;