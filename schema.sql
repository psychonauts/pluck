CREATE DATABASE IF NOT EXISTS pluck;
USE pluck;

CREATE TABLE users(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255),
  hpass VARCHAR(255)
  );

CREATE TABLE plants(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  descrip VARCHAR(500),
  place VARCHAR(255),
  zipcode INTEGER(5),
  image_url VARCHAR(255),
  id_user INT,
  FOREIGN KEY (id_user) REFERENCES users(id)
);

CREATE TABLE favorites(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  id_user INT,
  id_plant INT,
  FOREIGN KEY (id_user) REFERENCES users(id),
  FOREIGN KEY (id_plant) REFERENCES plants(id)
);

CREATE TABLE tags(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  tag VARCHAR(50)
);

CREATE TABLE plant_tag(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  id_tag INT,
  id_plant INT,
  FOREIGN KEY (id_tag) REFERENCES tags(id),
  FOREIGN KEY (id_plant) REFERENCES plants(id)
);

INSERT INTO users VAlUES(NULL, 'Michael', 'regdfiogdfoinbfoinb');
