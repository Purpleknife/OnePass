// load .env data into process.env
require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const methodOverride = require('method-override');
const PORT = 8080;

// Express Configuration
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieSession({
  name: 'session',
  keys: ['key1']
}));
app.use(methodOverride('_method'));
app.use(express.static('public'));

// Routes


// Mount all ressource routes


app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Express is be listening on port ${PORT}!`);
});
