require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static(`${__dirname}/../client/dist`));
app.use(bodyParser.json());


// function to catch get req from client login
app.get('/user/login', (req, res) => {
  console.log(req.body);
  // call helper function from database
  // .then() grab data returned from helper function
  //    res.send(data) back to the client with status
  // catch errors
});

// function to catch get req from client zipcode view
app.get('/user/zipcode', (req, res) => {
  console.log(req.body);

  // call helper function from database
  //     gets all plants in that zipcode
  //     calculates distance to those plants using map api
  // .then() grab data returned from helper function
  //    res.send data and status
  // catch errors
});

// function to catch post from client signup
app.post('/user/info', (req, res) => {
  console.log(req.body);
  // call helper function from db that saves info to db
});

// function to catch get from client plant list view
//   get req to api for directions to plant
//   should send location/address of plant

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
