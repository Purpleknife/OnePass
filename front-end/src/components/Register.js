import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import axios from 'axios';
import bcrypt from 'bcryptjs';



const Register = (props) => {
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

    await axios.post('/users', {
      first_name: firstNameInput.current.value,
      last_name: lastNameInput.current.value,
      email: emailInput.current.value,
      password: saltedPassword, //=> BCRYPT
      password_confirmation: saltedPasswordConfirmation
    })
      .then(res => {
        console.log('register res.data[0]', res.data);
        props.setUser(res.data);
        navigate('/dashboard');
      })
      .catch((error) => {
        console.log(error.message);
      })
  }

  console.log('user register', props.user);

  return (
    <>

      <Modal show={props.show} onHide={props.handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>First name:</Form.Label>
              <Form.Control
                type="first_name"
                name='first_name'
                autoFocus
                ref={firstNameInput}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                type="last_name"
                name='last_name'
                ref={lastNameInput}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
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

          <Button variant="dark" onClick={handleSubmit}>
            Register
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
 
export default Register;