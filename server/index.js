require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const request = require('request');
const dbHelpers = require('../database/index.js');
const { sendTags } = require('./helpers/algolia');
const upload = multer();


const app = express();


app.use(express.static(`${__dirname}/../client/dist`));
app.use(bodyParser.json());

app.get('/health', (req, res) => {
  dbHelpers.getAllPlants((err, plants) => { // change this function name to test other db helpers
    if (err) {
      console.log(err);
      res.status(500).send('COULD NOT RETRIEVE PLANTS');
    } else {
      res.status(200).send(plants);
    }
  });
});

// SERVER ROUTES
// They seem to be working as intended through postman requests. The post routes may need to change from req.body to req.query. Im not sure


app.get('/user/profile', (req, res) => {
  dbHelpers.getUserIdByGivenUsername(req.query.username, (err, userId) => {
    if (err) {
      console.log(err);
      res.status(500).send('COULD NOT RETRIEVE ID_USER');
    } else {
      dbHelpers.getPlantsByGivenUserId(userId, (err, plants) => {
        if (err) {
          console.log(err);
          res.status(500).send('COULD NOT RETRIEVE PLANTS');
        } else {
          res.status(200).send(plants);
        }
      });
    }
  });
});

app.post('/plant/profile', upload.single('image'), (req, res) => {  
  // grabs the file that has been appended the request by Multer
  const encodedBuf = req.file.buffer.toString('base64');
  
  // set up headers and body for post request to IMGUR API server
  const options = {
    method: 'POST',
    url: 'https://api.imgur.com/3/image',
    headers: {
      'cache-control': 'no-cache',
      Authorization: `Bearer ${process.env.IMGAPI}`,
      'content-type': 'multipart/form-data',
    },
    formData: { image: encodedBuf },
  };
  // send request to IMGUR api for posting and retrieval
  request(options, (error, response, body) => {
    if (error) return error(error);
    const { link } = JSON.parse(body).data;
    const { username, currency, description, zipcode, address, tags } = res.req.body;
    // this method is obv messy...functionality first
    // but maybe allowing the user to add a tag as a seperate feature
    // on their plant page would be easier as it would be a seperate call to add tags.
    const tagsArray = tags.split(',').map(tag => tag.trim());
    return dbHelpers.getUserByGivenUsername(username, (err, user) => {
      if (err || !user.length) {
        console.log(err);
        res.status(500).send('COULD NOT RETRIEVE USER FROM DATABASE');
      } else {
        dbHelpers.addPlant(user[0].id, currency, description, address, zipcode, link, tagsArray, (err, plant) => {
          if (err) {
            console.log(err);
            res.status(500).send('COULD NOT CREATE PLANT PROFILE');
          } else {
            sendTags((err) => {
              if (err) {
                console.error(err);
              }
              res.status(201).json(link);
            });
          }
        });
      }
    });
  });

  // req.query, req.body, req.params i dont know what to use. query works for now though // userId, address, zipcode
});

app.get('/health', (req, res) => {
  dbHelpers.getAllPlants((err, plants) => { // change function name to test each db helpers
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
  console.log(req.query);
  dbHelpers.getUserByGivenUsername(req.query.username, (err, user) => {
    if (err) {
      console.log(err);
      res.status(500).send('INCORRECT USERNAME/PASSWORD/MAYBE ITS OUR SERVER/DB FAULT');
    } else if (req.query.password === user[0].hpass) {
    // } else if (user.username === req.query.username) { // testing
      dbHelpers.getPlantsByGivenUserId(user[0].id, (err, plants) => {
        if (err) {
          console.log(err);
          res.status(500).send('COULD NOT RETRIEVE USER PLANTS');
        } else {
          res.status(200).send({ id: user[0].id, username: user[0].username, zipcode: user[0].zipcode, plants });
        }
      }); // return whole user obj and not just username
    } else {
      res.status(400).send('INCORRECT USERNAME/PASSWORD');
    }
  });
  // figure out what to pass down to helper function
  // call helper function from database
  // .then() grab data returned from helper function
  //    res.send(data) back to the client with status
  // catch errors
});

app.get('/plant/category', (req, res) => {
  dbHelpers.getPlantsByTags(req.query.category, (err, imageUrl) => {
    console.log(req.query.category);
    if (err) {
      console.log(err);
      res.status(500).send('COULD NOT RETRIEVE IMAGE');
    } else {
      res.status(200).send(imageUrl);
      // console.log();
    }
  });
});

// function to catch get req from client zipcode view
app.get('/user/zipcode', (req, res) => {
  console.log(req.query);
  dbHelpers.getPlantsByGivenZipcode(req.query.zipcode, (err, plants) => {
    if (err) {
      console.log(err);
      res.status(500).send('COULD NOT RETRIEVE NEARBY PLANTS');
    } else {
      res.status(200).send(plants);
    }
  });
  // call helper function from database
  // .then() grab data returned from helper function
  //    res.send data and status
  // catch errors
});

// function to catch post from client signup work
app.post('/user/info', (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  dbHelpers.addUser(username, password, (err, user) => {
    if (err) {
      console.log(err);
      res.status(500).send('COULD NOT CREATE PROFILE');
    } else {
      res.status(203).send('PROFILE CREATED');
    }
  });
  // call helper function from db that saves user instance to db
});

// function to catch get from client plant list view
//   get req to api for directions to plant
//   should send location/address of plant

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
