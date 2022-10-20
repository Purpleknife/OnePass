import React from 'react';

const Dashboard = (props) => {
  return (
    <div>
      Hi from Dashboard!
      Hi, {props.user.first_name}!
    </div>
  );
}
 
export default Dashboard;