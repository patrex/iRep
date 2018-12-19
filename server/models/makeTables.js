const { Client } = require('pg');
const connectionString = "postgres://ireporter:hallmark@localhost:5432/ireporter";

const client = new Client({
  connectionString
});

if(client.connect()) 
  console.log("Connection successful");
else console.log("Couldn't connect");

var tables = 
 `CREATE TABLE IF NOT EXISTS
      users(
        id SERIAL PRIMARY KEY,
        firstname VARCHAR(128) NOT NULL,
        lastname VARCHAR(128) NOT NULL,
        othernames VARCHAR(128) NOT NULL,
        email VARCHAR(128) NOT NULL,
        phoneNumber VARCHAR(128) NOT NULL,
        username VARCHAR(128) NOT NULL,
        registered date,
        isAdmin boolean
        );
  
   CREATE TYPE status AS ENUM('rejected', 'under-investigation', 'resolved');
   CREATE TYPE type AS ENUM('red-flag', 'incident');
  CREATE TABLE IF NOT EXISTS
      incidents(
        id SERIAL PRIMARY KEY,
        createdOn date NOT NULL,
        createdBy INT NOT NULL,
        incidentType type NOT NULL,
        location VARCHAR(10) NOT NULL,
        currentStatus status NOT NULL,
        comments text
      );
      
  CREATE TABLE IF NOT EXISTS
    images(
      owner INT NOT NULL,
      title varchar(128),
      dateAdded date NOT NULL,
      foreign key (owner) references users(id),
      primary key(owner, title)
    )`
      
client.query(tables)
  .then(success => console.log('Table(s) created'))
  .then(result => client.end())
  .catch(err => {
    console.log(err); 
    client.end()
  });

module.exports = {
  tables,
  client
};


