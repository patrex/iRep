import { Client } from 'pg';

async function initDB(){
    const connectionString = "postgres://ireporter:hallmark@localhost:5432/ireporter";
    const client = new Client({
      connectionString
    });

    let flag = false;

    let  tables = 
    `CREATE TABLE IF NOT EXISTS
        users(
          id SERIAL PRIMARY KEY,
          firstname VARCHAR(128) NOT NULL,
          lastname VARCHAR(128) NOT NULL,
          othernames VARCHAR(128) NOT NULL,
          email VARCHAR(128) NOT NULL,
          phone VARCHAR(128) NOT NULL,
          username VARCHAR(128) NOT NULL,
          registered date,
          isAdmin boolean
        );
    
    CREATE TYPE status AS ENUM('rejected', 'under-investigation', 'resolved');
        
    CREATE TABLE IF NOT EXISTS
      images(
        owner INT NOT NULL,
        title varchar(128),
        dateAdded date NOT NULL,
        foreign key (owner) references users(id),
        primary key(owner, title)
    );
    
    CREATE TABLE IF NOT EXISTS
      interventions(
        id SERIAL PRIMARY KEY,
        creadted_on timestamptz NOT NULL,
        created_by INT NOT NULL,
        location point,
        current_status status,
        comment text
      );

    CREATE TABLE IF NOT EXISTS
      redflags(
        id SERIAL PRIMARY KEY,
        creadted_on timestamptz NOT NULL,
        created_by INT NOT NULL,
        location point,
        current_status status,
        comment text
      );`
    
    try{
      client.connect();
      client.query(tables)
      .then( res => {return flag})
      .then(res => client.end());
    }catch(err){
      console.log(err.message);
    }
}

async function dropSingle(name){
  const connectionString = "postgres://ireporter:hallmark@localhost:5432/ireporter";
    const client = new Client({
      connectionString
    });

    let flag = false;

    let sql = `DROP TABLE $1`;
    
    try{
      client.connect();
      if(client.query(sql, name)){
        flag = true;
      }
      client.end();
      return flag;
    }catch(err){
      console.log(err.message);
    }
}

async function dropDB(){
  const connectionString = "postgres://ireporter:hallmark@localhost:5432/ireporter";
  
  const client = new Client({
    connectionString
  });

  let flag = false;
  let sql = `DROPDB ireporter`

  try{
    client.connect();
    if(client.query(sql)) flag = true;
    client.end();
    return flag;
  }catch(err){
    console.log(err.message);
  }
}


