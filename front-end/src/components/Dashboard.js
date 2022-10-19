import React from 'react';

const Dashboard = (props) => {
  return (
    <div>
      Hi from Dashboard!
      Hi, {props.user}!
    </div>
  );
}
 
export default Dashboard;