import React, { useState } from 'react';

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import { useCookies } from 'react-cookie';
import axios from 'axios';

import './OneLogin.scss';

const OneLogin = (props) => {
  const [cookies, setCookie] = useCookies(['user']);
  const user_id = cookies.user_id;

  const [emailShown, setEmailShown] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

  //To show and hide password:
  const toggleEmail = () => {
    setEmailShown(!emailShown);
  };


  //Copy password to clipboard:
  const copyEmail = () => {
    navigator.clipboard.writeText(props.email);
    setEmailCopied(!emailCopied);
  };


  const [passShown, setPassShown] = useState(false);
  const [passCopied, setPassCopied] = useState(false);

  //To show and hide password:
  const togglePass = () => {
    setPassShown(!passShown);
  };


  //Copy password to clipboard:
  const copyPass = () => {
    navigator.clipboard.writeText(props.content);
    setPassCopied(!passCopied);
  };

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
        <span className='date'><i className="fa-solid fa-calendar-days"></i>&nbsp;{props.date.slice(0, 10)}</span>
        <br />
        <span className='email'>
          <strong><i className="fa-sharp fa-solid fa-envelope"></i></strong>&nbsp;&nbsp;
          <input 
          defaultValue={props.email}
          type={emailShown ? 'text' : 'password'}
          disabled
        />
        {emailShown ? <i id='hide' onClick={toggleEmail} className="fa-solid fa-eye-slash"></i> : <i id='show' onClick={toggleEmail} className="fa-solid fa-eye"></i>}

        &nbsp;
        <OverlayTrigger
          key='right'
          placement='right'
          overlay={
            <Tooltip id='tooltip-right'>
              {emailCopied ? 'Copied!' : 'Copy to clipboard.'}
            </Tooltip>
          }
        >
          <i onClick={copyEmail} className="fa-solid fa-copy"></i>
        </OverlayTrigger>
        </span>

        <span className='pass'>
        <strong><i class="fa-solid fa-lock"></i></strong>&nbsp;&nbsp;
          <input 
          defaultValue={props.content}
          type={passShown ? 'text' : 'password'}
          disabled
        />
        {passShown ? <i id='hide' onClick={togglePass} className="fa-solid fa-eye-slash"></i> : <i id='show' onClick={togglePass} className="fa-solid fa-eye"></i>}

        &nbsp;
        <OverlayTrigger
          key='right'
          placement='right'
          overlay={
            <Tooltip id='tooltip-right'>
              {passCopied ? 'Copied!' : 'Copy to clipboard.'}
            </Tooltip>
          }
        >
          <i onClick={copyPass} className="fa-solid fa-copy"></i>
        </OverlayTrigger>
          </span>
        <br />
      </div>
    </div>
  );
}
 
export default OneLogin;