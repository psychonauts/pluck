//ORM: Sequelize
//Database: Postgres
const mysql = require('mysql');
const SENSITIVEDATA = require('./sensitive-data.js'); // this file is git ignored. Remake locally for testing

// const connection = new Sequelize('plucker', SENSITIVEDATA.username, SENSITIVEDATA.password, {
//   dialect: 'mysql',
//   // host: SENSITIVEDATA.url,
//   // port: SENSITIVEDATA.port,
// }); // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ POSSIBLY USELESS ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

const connection = mysql.createConnection(SENSITIVEDATA);

// DB HELPERS WORK AS INTENDED
// all functions are named to explicitly state usage



// This is a good test to see if we are successfully connected to our database
module.exports.getAllPlants = function(callback) {
  connection.query('SELECT * FROM plants', (err, plants) => {
    if (err) {
      callback(err);
    } else {
      callback(null, plants);
    }
  });
};

module.exports.getPlantsByGivenZipcode = function(zipcode, callback) {
  connection.query('SELECT * FROM plants WHERE zipcode = ?', [zipcode], (err, plants) => {
    if (err) {
      callback(err);
    } else {
      callback(null, plants);
    }
  });
};

module.exports.getPlantsByGivenUserId = function(userId, callback) {
  connection.query('SELECT * FROM plants WHERE id_user = ?', [userId], (err, plants) => {
    if (err) {
      callback(err);
    } else {
      callback(null, plants);
    }
  });
};

module.exports.addFavorite = function(userId, plantId, callback) {
  connection.query('INSERT INTO favorites(id_user, id_plant) VALUES(?, ?)', [userId, plantId], (err, favorite) => {
    if (err) {
      callback(err);
    } else {
      callback(null, favorite);
    }
  });
};

module.exports.addUser = function(username, hpass, salt, callback) {
  connection.query('INSERT INTO users(username, hpass, salt) VALUES(?, ?, ?)', [username, hpass, salt], (err, user) => {
    if (err) {
      callback(err);
    } else {
      callback(null, user);
    }
  });
};

module.exports.getSaltByGivenUsername = function(username, callback) {
  connection.query('SELECT salt FROM users WHERE username = ?', [username], (err, salt) => {
    if (err) {
      callback(err);
    } else {
      callback(null, salt);
    }
  });
};

module.exports.addPlant = function(userId, title, desc, address, zipcode, imageUrl, callback) {
  connection.query('INSERT INTO plants(id_user, title, description, address, zipcode, image_url, status) VALUES(?, ?, ?, ?, ?, ?, "show")', [userId, title, desc, address, zipcode, imageUrl], (err, plant) => {
    if (err) {
      callback(err);
    } else {
      callback(null, plant);
    }
  });
};

module.exports.getUserIdByGivenUsername = function(username, callback) {
  connection.query('SELECT id FROM users WHERE username = ?', [username], (err, userId) => {
    if (err) {
      callback(err);
    } else {
      callback(null, userId);
    }
  });
};

module.exports.getUserByUsername = function(username, callback) {
  connection.query('SELECT * FROM users WHERE username = ?', [username], (err, user) => {
    if (err) {
      callback(err);
    } else {
      callback(null, user);
    }
  });
};



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





// ----------------------- BELOW THIS LINE LIKELY USELESS -----------------------

//MODELS
// module.exports.Users = connection.define('users', {
//   //id_User: Sequelize.INTEGER, //Sequelize auto generates an ID property so we shouldnt need these
//   Username: {
//     type: Sequelize.STRING,
//     unique: true,
//     allowNull: false, //this field must be filled in
//   },
//   Hash: Sequelize.STRING, //should this be a string?
//   Salt: Sequelize.STRING, //should this be a string?
// })

// module.exports.Plants = connection.define('plants', {
//   //id_Plant: Sequelize.INTEGER,
//   id_User: Sequelize.INTEGER,
//   Description: Sequelize.TEXT,
//   Address: {
//     type: Sequelize.STRING,
//     allowNull: false, //this field must be filled in
//   }
// })

// module.exports.Favorites = connection.define('favorites', {
//   //id_Favorites: Sequelize.INTEGER,
//   id_User: Sequelize.INTEGER,
//   id_Plant: Sequelize.INTEGER,
// })

// module.exports.PlantType = connection.define('plantType', {
//   //id_PlantType: Sequelize.INTERGER,
//   id_Type: Sequelize.INTEGER,
//   id_Plant: Sequelize.INTEGER,
// })

// module.exports.Type = connection.define('type', {
//   //id_Type: Sequelize.INTEGER,
//   Name: Sequelize.STRING,
// })

// connection.sync(() => {
//   Users.create(
//     {
//       //set up where schema will be pulling from
//     }
//   )
// });

//FOR RETRIEVING INFO
//tableName.findById(id number here)
