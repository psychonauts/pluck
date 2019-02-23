require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const Db = require('../database/index.js');

const app = express();

app.use(express.static(`${__dirname}/../client/dist`));
app.use(bodyParser.json());


app.get('/health', (req, res) => {
  Db.getAllPlants((err, plants) => { // change function name to test each db helpers
    if (err) {
      console.log(err);
      res.send('weiner');
    } else {
      console.log(plants);
      res.send('notQuiteWeiner');
    }
  });
});

// function to catch get req from client login
app.get('/user/login', (req, res) => {
  console.log(req.body); // check that username/password is coming through
  res.send(req.query);
  // call helper function from database
  // .then() grab data returned from helper function
  //    res.send(data) back to the client with status
  // catch errors
});

// function to catch get req from client zipcode view
app.get('/user/zipcode', (req, res) => {
  console.log(req.query); // check that zipcode is coming through
  res.send(req.query);

  // call helper function from database
  // .then() grab data returned from helper function
  //    res.send data and status
  // catch errors
});

// function to catch post from client signup
app.post('/user/info', (req, res) => {
  console.log(req.query);
  res.send(req.query);
  // call helper function from db that saves info to db
});

// function to catch get from client plant list view
//   get req to api for directions to plant
//   should send location/address of plant

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
