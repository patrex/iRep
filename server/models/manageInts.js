import  { Pool } from 'pg';


//TODO: always check if respective table exists
class Incidents{
  async returnAll(){
    const connectionString = "postgres://ireporter:hallmark@localhost:5432/ireporter";

    const pool = new Pool({
        connectionString
    });

    let sql = `SELECT * FROM interventions`;
    let Result;

    try{
        pool.connect();
        Result = pool.query(sql);
        pool.end().theb(res => {return Result});
    }catch(err){
        console.error(err.message);
    }
  }
  async create(int){
    const connectionString = "postgres://ireporter:hallmark@localhost:5432/ireporter";

    const pool = new Pool({
      connectionString
    });

    let flag = false;

    let sql = `INSERT INTO interventions VALUES($1, $2, $3, $4)`
    const values = [
      `${int.createdBy}`,
      `now`,
      `${int.status}`,
      `${int.location}`
    ];

    try{
      pool.connect();

      if(pool.query(sql, values)) flag = true;
      pool.end().then(res => {return flag});
    }catch(err){
      console.error(err.message);
    }
  }

  async delete(int){
    const connectionString = "postgres://ireporter:hallmark@localhost:5432/ireporter";
    let flag = false;

    const pool = new Pool({
      connectionString
    });

    let sql = `DELETE FROM interventions WHERE id=$1`;

    try{
      pool.connect();
      if(pool.query(sql, int.id)) flag = true;
      pool.end().then(res => {return flag});
    }catch(err){
      console.error(err.message);
    }
  }

  async changeStatus(int){
    const connectionString = "postgres://ireporter:hallmark@localhost:5432/ireporter";

    const pool = new Pool({
      connectionString
    });

    let flag = false;
    let isAdmin = false;

    let sql = `UPDATE interventions SET status=$1 WHERE id=$2`;
    let values = [`${int.status}`, `${int.id}`]

    try{
      pool.connect();

      if(pool.query(sql, values)) flag = true;
      pool.end().then(res => {return flag});
    }catch(err){
      console.error(err.message);
    }
  }

  async comment(int){
    const connectionString = "postgres://ireporter:hallmark@localhost:5432/ireporter";

    const pool = new Pool({
      connectionString
    });

    let flag = false;

    let sql = `UPDATE interventions SET comment=$1 WHERE id=$2`;
    let values = [`${int.comment}`, `${int.id}`]

    try{
      pool.connect();
      
      if(pool.query(sql, values)) flag = true;
      pool.end().then(res => {return flag});
    }catch(err){
      console.error(err.message);
    }
  }

  async location(int){
    const connectionString = "postgres://ireporter:hallmark@localhost:5432/ireporter";

    const pool = new Pool({
      connectionString
    });

    let flag = false;

    let sql = `UPDATE interventions SET location=$1 WHERE id=$2`;
    let values = [`${int.location}`, `${int.id}`]

    try{
      pool.connect();
      
      if(pool.query(sql, values)) flag = true;
      pool.end().then(res => {return flag});
    }catch(err){
      console.error(err.message);
    }
  }
}

export default new Incidents