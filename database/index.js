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

// This is a good test to see if we are successfully connected to our database
const getAllPlants = function(callback) {
  connection.query('SELECT * FROM plants', (err, plants) => {
    if (err) {
      callback(err);
    } else {
      callback(null, plants);
    }
  });
};






// ----------------------- BELOW THIS LINE MAY BE USELESS -----------------------

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
