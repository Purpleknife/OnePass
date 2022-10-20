require('dotenv').config();

const express = require('express');
const router  = express.Router();
const jwt = require('jsonwebtoken');
const secret_token = process.env.SECRET_TOKEN;

module.exports = (db) => {

  // Route to register users:
  router.post('/users', (req, res) => {
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const email = req.body.email;
    const password = req.body.password;
    const password_confirmation = req.body.password_confirmation;

    const queryParams = [first_name, last_name, email, password, password_confirmation];
    const queryString = `
    INSERT INTO users (first_name, last_name, email, password, password_confirmation)
    VALUES ($1, $2, $3, $4, $5)
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
    const id = req.session.user_id || req.params.id;

    const queryParams = [id];
    const queryString = `SELECT * FROM users WHERE users.id = $1;`;

    db.query(queryString, queryParams)
      .then(data => {
        //req.session.user_id = data.rows[0].id;
        res.json(data.rows);
      })
      .catch(error => {
        console.log(error.message);
      });
  });


  return router;
};