DROP TABLE IF EXISTS passwords CASCADE;

CREATE TABLE passwords (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  content VARCHAR(255) NOT NULL,
  date_created DATE NOT NULL
);