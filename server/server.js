const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('../config/keys.js').mongoURI;

const app = express();

// Error message for bad db connection
if (!db) {
  throw new Error('You must provide a string to connect to MongoDB Atlas');
}

// Connecting mongoose to db
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch(err => console.log(err));

// Parsing requests into JSON
app.use(bodyParser.json());

// Setting up Heroku deploy 
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Setting up Apollo
let uri;

if (process.env.NODE_ENV === 'production') {
  uri = `/graphql`;
} else {
  uri = 'http://localhost:5000/graphql';
}

// const httpLink = createHttpLink({
//   uri,
//   headers: {
//     authorization: localStorage.getItem("auth-token")
//   }
// });

module.exports = app;