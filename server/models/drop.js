import {Client} from 'pg';

const connectionString = "postgres://ireporter:hallmark@localhost:5432/ireporter";
  
const client = new Client({
    connectionString
});

let sql = `drop table images, interventions, redflags, users; drop type status`;

client.connect();
client.query(sql).then(res => client.end(), rej => {
    console.log('Operation failed');
    client.end();
});
