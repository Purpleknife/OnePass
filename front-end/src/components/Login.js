import React, { useRef, useState } from 'react';

import { useCookies } from 'react-cookie';

import { useNavigate } from 'react-router';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';

import axios from 'axios';
import bcrypt from 'bcryptjs';

import './Login.scss';

const Login = (props) => {
  const [cookies, setCookie] = useCookies(['user']);
  const [showError, setShowError] = useState('');

  const emailInput = useRef();
  const passwordInput = useRef();

  const navigate = useNavigate();

  const handleSubmit = async(event) => {
    event.preventDefault();

    const email = emailInput.current.value;
    const password = passwordInput.current.value;

    axios.get('/users')
      .then(res => {
        const allUsers = res.data;

        const fetchUser = allUsers.find((user) => user.email === email);
          if (fetchUser) {
            if (bcrypt.compareSync(password, fetchUser.password)) {
              const user_id = fetchUser.id;

              axios.get(`/login/${user_id}`)
                .then((res) => {
                  console.log('login data', res.data);
                  props.setUser(res.data.userData);
                  setCookie('username', res.data.userData.username, {path: '/'});
                  setCookie('user_id', res.data.userData.id, {path: '/'});
                  setCookie('loggedIn', 'yes', {path: '/'});
                  setCookie('user_session', res.data.token, {path: '/'});
                  setShowError('');
                  navigate(`/dashboard/${user_id}`);
                })
                .catch(error => console.log(error.message));
            } else {
              setShowError('Wrong credentials.');
            }
          }
          if (!fetchUser) {
            setShowError('This email adress is not registered.');
          }
      })
      .catch(error => console.log(error.message));
  };
  
  
  return (
    <>

      <Modal show={props.show} onHide={props.handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        
        {showError && <Alert id='alert' key='danger' variant='danger'>
        {showError}
        </Alert>}

        <Modal.Body>
          <Form>

            <Form.Group className="mb-3" controlId="loginForm.ControlInput1">
              <Form.Label>Email address:</Form.Label>
              <Form.Control
                type="email"
                name='email'
                autoFocus
                placeholder="name@example.com"
                ref={emailInput}
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="loginForm.ControlPassword1"
            >
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                name='password'
                ref={passwordInput}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>

          <Button id='login' onClick={handleSubmit}>
            Login
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
 
export default Login;