//ORM: Sequelize
//Database: Postgres
const Sequelize = require('sequelize');
const SENSITIVEDATA = require('./sensitive-data.js'); // this file is git ignored. Remake locally for testing

const connection = new Sequelize('pluckSchema', SENSITIVEDATA.username, SENSITIVEDATA.password, {
  dialect: 'postgres',
  host: SENSITIVEDATA.url,
});

//MODELS
const Users = connection.define('users', {
  //id_User: Sequelize.INTEGER, //Sequelize auto generates an ID property so we shouldnt need these
  Username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false, //this field must be filled in
  },
  Hash: Sequelize.STRING, //should this be a string?
  Salt: Sequelize.STRING, //should this be a string?
})

const Plants = connection.define('plants', {
  //id_Plant: Sequelize.INTEGER,
  id_User: Sequelize.INTEGER,
  Description: Sequelize.TEXT,
  Address: {
    type: Sequelize.STRING,
    allowNull: false, //this field must be filled in
  }
})

const Favorites = connection.define('favorites', {
  //id_Favorites: Sequelize.INTEGER,
  id_User: Sequelize.INTEGER,
  id_Plant: Sequelize.INTEGER,
})

const PlantType = connection.define('plantType', {
  //id_PlantType: Sequelize.INTERGER,
  id_Type: Sequelize.INTEGER,
  id_Plant: Sequelize.INTEGER,
})

const Type = connection.define('type', {
  //id_Type: Sequelize.INTEGER,
  Name: Sequelize.STRING,
})

// connection.sync(() => {
//   Users.create(
//     {
//       //set up where schema will be pulling from
//     }
//   )
// });

//FOR RETRIEVING INFO
//tableName.findById(id number here)
