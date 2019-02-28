require('dotenv').config();
const mysql = require('mysql');


const SENSITIVEDATA = {
  host: process.env.RDS_HOSTNAME,
  // user: 'root',
  user: process.env.RDS_USERNAME,
  // password: '',
  password: process.env.RDS_PASSWORD,
  database: 'pluck',
  port: process.env.RDS_PORT,
}; // the SENSITIVEDATA is git ignored. Remake locally for testing
// replaced file with env variables
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ POSSIBLY USELESS ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


const connection = mysql.createConnection(SENSITIVEDATA);

// DB HELPERS //
// all functions are named to explicitly state usage


// This is a good test to see if we are successfully connected to our database
// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv Get Functions Start vvvvvvvvvvvvvvvvvv
module.exports.getAllPlants = (callback) => {
  connection.query('SELECT * FROM plants', (err, plants) => {
    if (err) {
      console.log(err);
      callback(err);
    } else {
      callback(null, plants);
    }
  });
};

module.exports.getPlantsByGivenZipcode = (zipcode, callback) => {
  connection.query('SELECT * FROM plants WHERE zipcode = ?', [zipcode], (err, plants) => {
    if (err) {
      callback(err);
    } else {
      callback(null, plants);
    }
  });
};

module.exports.getPlantsByGivenUserId = (userId, callback) => {
  connection.query('SELECT * FROM plants WHERE id_user = ?', [userId], (err, plants) => {
    if (err) {
      callback(err);
    } else {
      callback(null, plants);
    }
  });
};


module.exports.getPlantsByTags = (tagId, callback) => {
  connection.query('SELECT * FROM plants WHERE (SELECT id_plant FROM plant_tag WHERE id_tag = ?)', [tagId], (err, plants) =>{
    if (err) {
      callback(err);
    } else {
      callback(null, plants);
    }
  });
};

module.exports.getTagsByPlantId = (plantId, callback) => {
  connection.query('SELECT * FROM tags WHERE (SELECT id_tag FROM plant_tag WHERE id_plant = ?)', [plantId], (err, tags) => {
    if (err) {
      callback(err);
    } else {
      callback(null, tags);
    }
  });
};

module.exports.getUserIdByGivenUsername = (username, callback) => {
  connection.query('SELECT id FROM users WHERE username = ?', [username], (err, userId) => {
    if (err) {
      callback(err);
    } else {
      callback(null, userId);
    }
  });
};

module.exports.getUserByGivenUsername = (username, callback) => {
  connection.query('SELECT * FROM users WHERE username = ?', [username], (err, user) => {
    if (err) {
      callback(err);
    } else {
      callback(null, user);
    }
  });
};

module.exports.getFavoritesByUsername = (username, callback) => {
  connection.query('SELECT * FROM plants WHERE (SELECT id_user FROM favorites WHERE (SELECT id FROM users WHERE username = ?))', [username], (error, favorites) => {
    if (error) {
      callback(error);
    } else {
      callback(null, favorites);
    }
  });
};

// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Get Functions END ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv Add Functions Start vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
module.exports.addUser = (username, hpass, callback) => {
  connection.query('INSERT INTO users(username, hpass) VALUES(?, ?)', [username, hpass], (err, user) => {
    if (err) {
      callback(err);
    } else {
      callback(null, user);
    }
  });
};

module.exports.addPlant = (userId, title, desc, address, zipcode, imageUrl, tags, callback) => {
  connection.query('INSERT INTO plants(title, description, address, zipcode, image_url, id_user) VALUES(?, ?, ?, ?, ?, ?)', [title, desc, address, zipcode, imageUrl, userId], (err, plant) => {
    if (err) {
      callback(err);
    } else {
      tags.forEach((tag) => {
        connection.query('INSERT INTO plant_tag(id_tag, id_plant) VALUES((SELECT id FROM tags WHERE tag = ?), ?)', [tag, plant.id], (secondQueryError) => {
          if (secondQueryError) {
            callback(err);
          }
        });
      });
      callback(null, plant);
    }
  });
};

module.exports.addFavorite = (userId, plantId, callback) => {
  connection.query('INSERT INTO favorites(id_user, id_plant) VALUES(?, ?)', [userId, plantId], (err, favorite) => {
    if (err) {
      callback(err);
    } else {
      callback(null, favorite);
    }
  });
};

module.exports.addTags = (tags, callback) => {
  tags.forEach((tag) => {
    connection.query('INSERT INTO tags(tag) VALUES(?)', [tag], (err, returnedTag) => {
      if (err) {
        callback(err);
      } else {
        callback(null, returnedTag);
      }
    });
  });
};

// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Add Functions END ^^^^^^^^^^^^^^^^^^^^^^^^^^^
// TODO: login----getUser


// -------------------------------- TABLE LIST --------------------------------
//
// -- users
// -- | id(integer) | username(255 max) | hpass(255 max) | salt(255 max) |
//
//
// -- plants
// -- | id(integer) | id_user(integer) | title(255 max) | description(500 max) | address(255 max) | zipcode(integer) | image_url(255 max) | status('hide', 'show') |
//
//
// -- favorites
// -- | id(integer) | id_user(integer) | id_plant(integer) |
//
//
// -- categories
// -- | id(integer) | category(255 max) |
//
//
// -- plants_categories
// -- | id(integer) | id_plant(integer) | id_category(integer) |
//
// -------------------------------- END OF LIST --------------------------------