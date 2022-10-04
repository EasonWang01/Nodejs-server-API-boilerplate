const express = require('express');
const app = express();
const jsonwebtoken = require('jsonwebtoken');
const bodyParser = require('body-parser')
const { port } = require('./config.js');
// const connection = require('./database/connect.js');
const { User } = require('./database/schemas/user');

const userRoute = require('./router/user');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Router
app.use('/user', userRoute);

const server = app.listen(port, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Listening on port ' + port);
  }
});

module.exports = {
  server
};