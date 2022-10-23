import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';

import axios from 'axios';
import bcrypt from 'bcryptjs';

import { useCookies } from 'react-cookie';


import './Register.scss';

const Register = (props) => {
  const [cookies, setCookie] = useCookies(['user']);
  const [showError, setShowError] = useState('');

  const usernameInput = useRef();
  const firstNameInput = useRef();
  const lastNameInput = useRef();
  const emailInput = useRef();
  const passwordInput = useRef();
  const passwordConfirmationInput = useRef();

  const navigate = useNavigate();
  const salt = bcrypt.genSaltSync(10);

  const handleSubmit = async(event) => {
    event.preventDefault();

    const password = passwordInput.current.value;
    const saltedPassword = bcrypt.hashSync(password, salt);

    const passwordConfirmation = passwordConfirmationInput.current.value;
    const saltedPasswordConfirmation = bcrypt.hashSync(passwordConfirmation, salt);

    axios.get('/users')
      .then(res => {
    
        const allUsers = res.data;
        const fetchUser = allUsers.find((user) => user.email === emailInput.current.value);
        if (fetchUser) {
          setShowError('This email adress is already registered.');
        } else {
          axios.post('/users', {
            username: usernameInput.current.value,
            first_name: firstNameInput.current.value,
            last_name: lastNameInput.current.value,
            email: emailInput.current.value,
            password: saltedPassword, //=> BCRYPT
            password_confirmation: saltedPasswordConfirmation
          })
            .then(res => {
              props.setUser(res.data.userData);
              setCookie('username', res.data.userData.username, {path: '/'});
              setCookie('user_id', res.data.userData.id, {path: '/'});
              setCookie('user_session', res.data.token, {path: '/'});
              setCookie('loggedIn', 'yes', {path: '/'});
              setShowError('');
              const user_id = res.data.userData.id;
              navigate(`/dashboard/${user_id}`);
            })
            .catch((error) => {
              console.log(error.message);
            })
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }


  return (
    <>

      <Modal show={props.show} onHide={props.handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>

        {showError && <Alert id='alert' key='danger' variant='danger'>
        {showError}
        </Alert>}

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="username"
                name='username'
                autoFocus
                ref={usernameInput}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>First name:</Form.Label>
              <Form.Control
                type="first_name"
                name='first_name'
                ref={firstNameInput}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                type="last_name"
                name='last_name'
                ref={lastNameInput}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
              <Form.Label>Email address:</Form.Label>
              <Form.Control
                type="email"
                name='email'
                placeholder="name@example.com"
                ref={emailInput}
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlPassword1"
            >
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                name='password'
                ref={passwordInput}
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlPassword2"
            >
              <Form.Label>Password confirmation:</Form.Label>
              <Form.Control
                type="password"
                name='password'
                ref={passwordConfirmationInput}
              />
            </Form.Group>

          </Form>
        </Modal.Body>
        <Modal.Footer>

          <Button id='register' onClick={handleSubmit}>
            Register
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
 
export default Register;