const { Client } = require('pg');
const connectionString = "postgres://ireporter:hallmark@localhost:5432/ireporter";

const client2 = new Client({
  connectionString
});

if(client2.connect()) 
  console.log("Connection successful");
else console.log("Couldn't connect");

const query = `
    DROP TABLE incidents
`

client2.query(query)
    .then( success => console.log('Table dropped'))
    .then(results => client2.end())
    .catch(err => {
        console.log(err);
        client2.end();
    });
