import React from 'react';

import './OneLogin.scss';

const OneLogin = (props) => {
  return (
    <div className='container'>
      <div className='one_card'>
        <span className='title'>{props.title}</span>
        <span className='date'>{props.date}</span>
        <span className='url'>{props.url}</span>
        <span className='pass'>{props.content}</span>
        <br />
      </div>
    </div>
  );
}
 
export default OneLogin;