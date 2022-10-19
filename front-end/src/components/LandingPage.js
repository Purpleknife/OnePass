import React, { useState } from 'react';

import Button from 'react-bootstrap/Button';

import Register from './Register';
import './LandingPage.scss';

const LandingPage = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className='test'>
      Hi from Landing Page!
      <br />
      <Button className='register' onClick={handleShow}>
        Register
      </Button>
      <Register user={props.user} setUser={props.setUser} handleClose={handleClose} show={show}/>
    </div>
  );
}
 
export default LandingPage;