require('dotenv').config();

const express = require('express');
const router  = express.Router();
const jwt = require('jsonwebtoken');
const secret_token = process.env.SECRET_TOKEN;

module.exports = (db) => {

  // Route to register users:
  router.post('/users', (req, res) => {
    const username = req.body.username;
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const email = req.body.email;
    const password = req.body.password;
    const password_confirmation = req.body.password_confirmation;

    const queryParams = [username, first_name, last_name, email, password, password_confirmation];
    const queryString = `
    INSERT INTO users (username, first_name, last_name, email, password, password_confirmation)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
    `;

    db.query(queryString, queryParams)
      .then(data => {
        const token = jwt.sign({email: email}, secret_token, { expiresIn: '1800s' } );
        const userData = data.rows[0];

        //console.log('OBJECT SENT ===> ', {token, userData});
        res.json({token, userData});
      })
      .catch(error => {
        console.log(error.message);
      })
  });


  // Route to fetch ALL users:
  router.get('/users', (req, res) => {
    const queryString = `SELECT * FROM users;`;

    db.query(queryString)
      .then(data => {
        res.json(data.rows);
      })
      .catch(error => {
        console.log(error.message);
      });
  });


  // Route to login users:
  router.get('/login/:id', (req, res) => {
    const id = req.params.id;

    const queryParams = [id];
    const queryString = `SELECT * FROM users WHERE users.id = $1;`;

    db.query(queryString, queryParams)
      .then(data => {
        const token = jwt.sign({id: id}, secret_token, { expiresIn: '1800s' } );
        const userData = data.rows[0];

        res.json({token, userData});
      })
      .catch(error => {
        console.log(error.message);
      });
  });


  // Route to get the user's Dashboard:
  router.get('/dashboard/:user_id', (req, res) => {
    const user_id = req.params.user_id;

    const queryParams = [user_id];
    const queryString = `SELECT * FROM passwords WHERE user_id = $1;`

    db.query(queryString, queryParams)
      .then(data => {
        console.log('dashboard', data.rows);
        res.json(data.rows);
      })
      .catch(error => {
        console.log(error.message);
      });

  });


  // Route for logout:
  router.get('/logout', (req, res) => {
    req.session = null;
    return res.json('You\'re logged out!');
  });

  return router;
};