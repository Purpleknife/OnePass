import React from 'react';


const OneLogin = (props) => {
  return (
    <div className='one_card'>
      {props.title}
      {props.date}
      {props.url}
      {props.content}
    </div>
  );
}
 
export default OneLogin;