const express = require('express');
<<<<<<< HEAD
const expressGraphQL = require('express-graphql');
=======
const expressGraphQL = require("express-graphql");
>>>>>>> master
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('../config/keys.js').mongoURI;
<<<<<<< HEAD
const schema = require('./schema/schema');
const cors = require('cors');
=======
const cors = require("cors");
>>>>>>> master

const app = express();

// Error message for bad db connection
if (!db) {
  throw new Error('You must provide a string to connect to MongoDB Atlas');
}

// load up the model connections
require("./models/index");
const schema = require('./schema/schema');

// Connecting mongoose to db
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch(err => console.log(err));

// Adding cors middleware to app to relax CORS error
app.use(cors());

// Configuring server with express-graphql using local schema file
app.use(
  '/graphql',
  expressGraphQL({
    schema,
    graphiql: true
  })
);

// Parsing requests into JSON
app.use(bodyParser.json());

// use cors protection
app.use(cors());

// Setting up Heroku deploy 
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

<<<<<<< HEAD
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
=======
// set up graphql
app.use(
  "/graphql",
  expressGraphQL(req => {
    return {
      schema,
      context: {
        token: req.headers.authorization
      },
      graphiql: true
    };
  })
);
>>>>>>> master

module.exports = app;