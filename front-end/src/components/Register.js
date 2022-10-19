import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import axios from 'axios';
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

const Register = (props) => {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordConfirmation, setPasswordConfirmation] = useState();

  const navigate = useNavigate();

  const handleSubmit = async(event) => {
    event.preventDefault();

    // await axios.post('/users', {
    //   first_name: firstName,
    //   last_name: lastName,
    //   email: email,
    //   password: bcrypt.hashSync(password, salt), //=> BCRYPT
    //   password_confirmation: bcrypt.hashSync(passwordConfirmation, salt)
    // })
    //   .then(res => {
    //     console.log('register res.data[0]', res.data[0]);
    //     //props.setUser(res.data[0]);
    //     //navigate('/dashboard');
    //   })
    //   .catch((error) => {
    //     console.log(error.message);
    //   })
  }

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
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                type="last_name"
                name='last_name'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address:</Form.Label>
              <Form.Control
                type="email"
                name='email'
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(bcrypt.hashSync(e.target.value, salt))}
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlPassword1"
            >
              <Form.Label>Password confirmation:</Form.Label>
              <Form.Control
                type="password"
                name='password'
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(bcrypt.hashSync(e.target.value, salt))}
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