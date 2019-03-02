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

module.exports.getPlantFavoriteStatus = (plantId, userId, callback) => {
  connection.query(`SELECT f.id
  FROM users u
  INNER JOIN favorites f
  ON u.id = f.id_user
  INNER JOIN plants p
  ON f.id_plant = p.id
  WHERE p.id = ? AND u.id = ?`, [plantId, userId], (err, fave) => {
    if (err) {
      console.error(err);
      return callback(err);
    }
    return callback(null, fave);
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
  connection.query(`SELECT p.*, t.tag 
  FROM plants p 
  INNER JOIN plant_tag
  ON p.id=plant_tag.id_plant
  INNER JOIN tags t
  ON t.id=plant_tag.id_tag
  WHERE (t.id = ?)`, [tagId], (err, plants) => {
    if (err) {
      callback(err);
    } else {
      callback(null, plants);
    }
  });
};

module.exports.getTagsByPlantId = (plantId, callback) => {
  connection.query(`SELECT * FROM tags t
  INNER JOIN plant_tag
  ON t.id=plant_tag.id_tag
  INNER JOIN plants p
  ON p.id=plant_tag.id_plant
  WHERE p.id = ?`, [plantId], (err, tags) => {
    if (err) {
      callback(err);
    } else {
      callback(null, tags);
    }
  });
};

module.exports.getPlantsByIntersectionZipTag = (zipcode, tag, callback) => {
  connection.query(`SELECT p.*, t.tag 
  FROM plants p 
    INNER JOIN plant_tag 
    ON p.id=plant_tag.id_plant 
    INNER JOIN tags t
    ON t.id=plant_tag.id_tag
    WHERE p.zipcode = ? AND t.tag = ?`,
  [zipcode, tag],
  (err, plants) => {
    if (err) callback(err);
    else callback(null, plants);
  });
};

module.exports.getAllTags = (callback) => {
  connection.query('SELECT * FROM tags', (err, tags) => {
    if (err) {
      return callback(err);
    }
    return callback(null, tags);
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
      let numTags = tags.length;
      tags.forEach((tag) => {
        // checking to see if the tags already exists
        connection.query('SELECT id FROM tags where tag = ?', [tag], (secondQueryError, queryForTagId) => {
          // handle error
          if (secondQueryError) {
            callback(secondQueryError);
            // checks if we got tag ids back
          } else if (queryForTagId.length > 0) {
            // vvvvvvvvvvvvvvvvvvvvvvv inserting into join table start vvvvvvvvvvv
            connection.query('INSERT INTO plant_tag(id_tag, id_plant) VALUES((SELECT id FROM tags WHERE tag = ?), ?)', [tag, plant.insertId], (thirdQueryError) => {
              numTags -= 1;
              if (thirdQueryError) {
                callback(thirdQueryError);
              } else if (numTags === 0) {
                callback();
              }
            });
            // ^^^^^^^^^^^^^^^^^^^^^^^^inserting into join table end^^^^^^^^^^^^^
          } else {
            module.exports.addTags([tag], (addTagsError) => {
              if (addTagsError) {
                callback(addTagsError);
              } else {
                connection.query('INSERT INTO plant_tag(id_tag, id_plant) VALUES((SELECT id FROM tags WHERE tag = ?), ?)', [tag, plant.insertId], (fourthQueryError) => {
                  numTags -= 1;
                  if (fourthQueryError) {
                    callback(fourthQueryError);
                  } else if (numTags === 0) {
                    callback();
                  }
                });
              }
            });
          }
        });
      });
    }
  });
};

module.exports.toggleFavorite = (userId, plantId, callback) => {
  connection.query('SELECT * FROM favorites WHERE id_user = ? AND id_plant = ?', [userId, plantId], (firstQueryError, favorite) => {
    if (firstQueryError) {
      callback(firstQueryError);
    } else if (favorite.length > 0) { // checks if there is a favorite with userid and plantid
      // then we should remove them from the database
      connection.query('DELETE FROM favorites WHERE id_user = ? AND id_plant = ?', [userId, plantId], (deleteError, idk) => {
        if (deleteError) {
          callback(deleteError);
        }
        // i do not know what we are giving back to the callback
        callback(null, idk);
      });
    } else {
      // if we get nothing back from the database && there is no error add a favorite into the table
      connection.query('INSERT INTO favorites(id_user, id_plant) VALUES(?, ?)', [userId, plantId], (err, favoriteFromSelect) => {
        if (err) {
          callback(err);
        } else {
          callback(null, favoriteFromSelect);
        }
      });
    }
  });
};

module.exports.addTags = (tags, callback) => {
  let numTags = tags.length;
  tags.forEach((tag) => {
    connection.query('INSERT INTO tags(tag) VALUES(?)', [tag], (err, returnedTag) => {
      numTags -= 1;
      if (err) {
        callback(err);
      } else if (numTags === 0) {
        callback(null, returnedTag);
      }
    });
  });
};

// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Add Functions END ^^^^^^^^^^^^^^^^^^^^^^^^^^^

// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv Delete Functions start vvvvvvvvvvvvvvvvvvvvvv

module.exports.deletePlant = (plantId, callback) => {
  connection.query('DELETE FROM plants WHERE id = ?', [plantId], (err) => {
    if (err) {
      callback(err);
    }
  });
};

// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Delete Functions END ^^^^^^^^^^^^^^^^^^^^^^^^
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