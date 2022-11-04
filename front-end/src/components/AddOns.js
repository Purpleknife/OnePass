import React, { useRef } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';

import './AddOns.scss';


const AddOns = (props) => {
  const [cookies, setCookie] = useCookies(['user']);
  const user_id = cookies.user_id;

  const titleInput = useRef();
  const emailInput = useRef();

  const save = async() => {

    axios.post(`/dashboard/${user_id}`, {
      title: titleInput.current.value,
      email: emailInput.current.value,
      content: props.password
    })
      .then((res) => {
        console.log('Data saved!', res.data);
        props.fetch();
        titleInput.current.value = '';
        emailInput.current.value = '';
        props.setPassword('');
        props.setOptions(prev => ({
          ...prev,
          length: 0,
          lowercase: false,
          uppercase: false,
          numbers: false,
          symbols: false
        }));
      })
      .catch(error => {
        console.log(error.message);
      })

  }

  return (
    <div className='addons_container'>
      <div className='inputs'>
      <span id='title_input'><strong>Title:</strong> &nbsp;
      <input
        key='title'
        id='title'
        type='text'
        ref={titleInput}
        placeholder='Enter a title...'
      /></span>
      <br />
      <span id='email_input'><strong>Email:</strong> &nbsp;
      <input
        key='email'
        id='email'
        type='text'
        ref={emailInput}
        placeholder='Enter an email...'
      /></span>
      </div>

      <div className='save_btn'>
        <button onClick={save} >Save</button>
      </div>
    </div>
  );
}
 
export default AddOns;