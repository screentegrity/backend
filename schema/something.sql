DROP DATABASE IF EXISTS something_db;
CREATE DATABASE something_db;
USE something_db;

CREATE TABLE something (
  id INT NOT NULL AUTO_INCREMENT,
  data1 VARCHAR(255) NOT NULL,
  data2 VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE candidates (
  id INT NOT NULL AUTO_INCREMENT,
  candidate_name VARCHAR(255) NOT NULL,
  picture_url VARCHAR(255) NOT NULL,
  time_posted TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  review_status ENUM('NEW', 'PENDING', 'COMPLETED') DEFAULT 'NEW',
  PRIMARY KEY (id)
)

DROP TABLE IF EXISTS questions;
CREATE TABLE questions (
  id INT NOT NULL AUTO_INCREMENT,
  question VARCHAR(255) NOT NULL,
  max_points INT NOT NULL,
  correct_answer ENUM('NA', 'A', 'B', 'C', 'D') DEFAULT 'NA',
  PRIMARY KEY (id)
);

DROP TABLE IF EXISTS choices;
CREATE TABLE choices (
  id INT NOT NULL AUTO_INCREMENT,
  choice VARCHAR(255) NOT NULL,
  question_id INT NOT NULL,
  PRIMARY KEY (id)
);

DROP TABLE IF EXISTS candidates_answers;
CREATE TABLE candidates_answers (
  id INT NOT NULL AUTO_INCREMENT,
  candidate_id INT NOT NULL,
  question_id INT NOT NULL,
  answer VARCHAR(255) NOT NULL,
  score INT DEFAULT 0,
  PRIMARY KEY (id)
);

INSERT INTO questions( id, question, max_points, correct_answer) VALUES
(1, 'How old are you?', '2', 'NA'),
(2, 'What is the capital of California?', '3', 'C');

INSERT INTO choices( id, choice, question_id) VALUES 
(1, "San Francisco", 2),
(2, "Los Angeles", 2),
(3, "Sacramento", 2),
(4, "Oakland", 2);

INSERT INTO candidates_answers ( candidate_id, question_id, answer ) VALUES 
(1, 1, "Something"),
(1, 2, "C");

SELECT ca.id id, candidate_id, question_id, 
ca.answer user_answer, question, max_points, correct_answer 
FROM candidates_answers ca 
LEFT JOIN questions q ON q.id=ca.question_id
WHERE ca.candidate_id=1