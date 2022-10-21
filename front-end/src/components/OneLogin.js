import React from 'react';

import { useCookies } from 'react-cookie';
import axios from 'axios';

import './OneLogin.scss';

const OneLogin = (props) => {
  const [cookies, setCookie] = useCookies(['user']);
  const user_id = cookies.user_id;

  const deletePass = async(e) => {
    await axios.delete(`/dashboard/${user_id}/${props.id}`)
      .then(res => {
        console.log('deleted', res.data);
        props.fetch();
      })
      .catch(error => console.log(error.message));
  };


  return (
    <div className='container'>
      <div className='one_card'>
        <i onClick={deletePass} className="fa-solid fa-trash"></i>
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