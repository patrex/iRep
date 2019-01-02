import { Client } from 'pg';

const connectionString = "postgres://ireporter:hallmark@localhost:5432/ireporter";

const client = new Client({
  connectionString
});

let  tables = 
`CREATE TABLE IF NOT EXISTS
    users(
      id SERIAL PRIMARY KEY,
      firstname VARCHAR(128) NOT NULL,
      lastname VARCHAR(128) NOT NULL,
      othernames VARCHAR(128) NOT NULL,
      email VARCHAR(128) NOT NULL UNIQUE,
      phone VARCHAR(128) NOT NULL UNIQUE,
      username VARCHAR(128) NOT NULL UNIQUE,
      password VARCHAR(256) NOT NULL,
      registered timestamptz NOT NULL,
      is_admin boolean
    );

CREATE TYPE status AS ENUM('rejected', 'under-investigation', 'resolved');
    
CREATE TABLE IF NOT EXISTS
  images(
    id SERIAL,
    owner INT NOT NULL,
    title varchar(128),
    uploaded_on timestamptz NOT NULL,
    foreign key (owner) references users(id),
    primary key(owner, title)
);

CREATE TABLE IF NOT EXISTS
  interventions(
    id SERIAL PRIMARY KEY,
    creadted_on timestamptz NOT NULL,
    created_by VARCHAR(128) NOT NULL,
    location point,
    current_status status,
    comment text,
    foreign key (created_by) references users(username)
  );

CREATE TABLE IF NOT EXISTS
  redflags(
    id SERIAL PRIMARY KEY,
    creadted_on timestamptz NOT NULL,
    created_by VARCHAR(128) NOT NULL,
    location point,
    current_status status,
    comment text,
    foreign key (created_by) references users(username)
  );`

try{
  client.connect();
  client.query(tables)
  .then(res => client.end(), rej => {
    console.log('Operation failed');
    console.log(rej);
    client.end()
  })
}catch(err){
  console.log(err.message);
}