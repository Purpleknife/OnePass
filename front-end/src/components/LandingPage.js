import React, { useState } from 'react';

import Button from 'react-bootstrap/Button';

import Register from './Register';
import Login from './Login';
import GeneratePass from './GeneratePass';

import './LandingPage.scss';

const LandingPage = (props) => {
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleRegisterClose = () => setShowRegister(false);
  const handleRegisterShow = () => setShowRegister(true);

  const handleLoginClose = () => setShowLogin(false);
  const handleLoginShow = () => setShowLogin(true);

  return (
    <div className='test'>
      <GeneratePass />
      <br />
      <Button className='login' onClick={handleLoginShow}>
        Login
      </Button>
      <Login user={props.user} setUser={props.setUser} handleClose={handleLoginClose} show={showLogin}/>
      &nbsp;
      <Button className='register' onClick={handleRegisterShow}>
        Register
      </Button>
      <Register user={props.user} setUser={props.setUser} handleClose={handleRegisterClose} show={showRegister}/>
    </div>
  );
}
 
export default LandingPage;