  
CREATE DATABASE pern-test;

CREATE TABLE users(
  user_id SERIAL,
  user_name VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL UNIQUE,
  user_password VARCHAR(255) NOT NULL,
  PRIMARY KEY(user_id)
);


INSERT INTO users (user_name, user_email, user_password) VALUES ('Henry', 'henryly213@gmail.com', 'kthl8822');