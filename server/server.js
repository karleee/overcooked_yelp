const express = require('express');
const expressGraphQL = require('express-graphql');
const { graphqlUploadExpress } = require("graphql-upload");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('../config/keys.js').mongoURI;
const cors = require('cors');

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

// Parsing requests into JSON
app.use(bodyParser.json());

// Setting up Heroku deploy 
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Setting up graphql
app.use(
  "/graphql",
  // use graphQLUploadExpress as the middleware for /graphql path
  graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }),
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

module.exports = app;