import React from 'react';
import { useCookies } from 'react-cookie';

const Dashboard = (props) => {
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const first_name = cookies.first_name;
  const last_name = cookies.last_name

  return (
    <div>
      Hi from Dashboard!
      Hi, {first_name + ' ' + last_name}!
    </div>
  );
}
 
export default Dashboard;