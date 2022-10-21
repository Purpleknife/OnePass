import React, { useState } from 'react';

import Button from 'react-bootstrap/Button';

import Register from './Register';
import Login from './Login';
import GeneratePass from './GeneratePass';
import NavBar from './NavBar';

import './LandingPage.scss';

const LandingPage = (props) => {
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleRegisterClose = () => setShowRegister(false);
  const handleRegisterShow = () => setShowRegister(true);

  const handleLoginClose = () => setShowLogin(false);
  const handleLoginShow = () => setShowLogin(true);

  return (
    <div className='landing-page'>
      <NavBar setUser={props.setUser} />
      <div className='generate-landing'>
        <GeneratePass />
      </div>
      <br />
      <div className='login_register'>
        <span>
          If you want to save your passwords <i className="fa-sharp fa-solid fa-arrow-down"></i>
        </span>
        <div className='btns'>
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
      </div>
    </div>
  );
}
 
export default LandingPage;