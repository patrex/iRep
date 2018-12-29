import  { Pool } from 'pg';


//TODO: always check if respective table exists
class RedFlags{
    async returnAll(){
        const connectionString = "postgres://ireporter:hallmark@localhost:5432/ireporter";

        const pool = new Pool({
            connectionString
        });

        let sql = `SELECT * FROM redflags`;
        let Result;

        try{
            pool.connect();
            Result = pool.query(sql);
            pool.end().theb(res => {return Result});
        }catch(err){
            console.error(err.message);
        }
    }

    async create(red){
      const connectionString = "postgres://ireporter:hallmark@localhost:5432/ireporter";

      const pool = new Pool({
        connectionString
      });

      let flag = false;

      let sql = `INSERT INTO redflags VALUES($1, $2, $3, $4)`
      const values = [
        `${red.createdBy}`,
        `now`,
        `${red.status}`,
        `${red.location}`
      ];

      try{
        pool.connect();

        if(pool.query(sql, values)) flag = true;
        pool.end().then(res => {return flag});
      }catch(err){
        console.error(err.message);
      }
    }

    async delete(red){
      const connectionString = "postgres://ireporter:hallmark@localhost:5432/ireporter";
      let flag = false;

      const pool = new Pool({
        connectionString
      });

      let sql = `DELETE FROM redflags WHERE id=$1`;

      try{
        pool.connect();
        if(pool.query(sql,red.id)) flag = true;
        pool.end().then(res => {return flag});
      }catch(err){
        console.error(err.message);
      }
    }

    async changeStatus(red){
      const connectionString = "postgres://ireporter:hallmark@localhost:5432/ireporter";

      const pool = new Pool({
        connectionString
      });

      let flag = false;

      let sql = `UPDATE redflags SET status=$1 WHERE id=$2`;
      let values = [`${red.status}`, `${red.id}`]

      try{
        pool.connect();

        if(pool.query(sql, values)) flag = true;
        pool.end().then(res => {return flag});
      }catch(err){
        console.error(err.message);
      }
    }

    async comment(red){
      const connectionString = "postgres://ireporter:hallmark@localhost:5432/ireporter";

      const pool = new Pool({
        connectionString
      });

      let flag = false;

      let sql = `UPDATE redflags SET comment=$1 WHERE id=$2`;
      let values = [`${red.comment}`, `${red.id}`]

      try{
        pool.connect();
        
        if(pool.query(sql, values)) flag = true;
        pool.end().then(res => {return flag});
      }catch(err){
        console.error(err.message);
      }
    }

    async location(red){
      const connectionString = "postgres://ireporter:hallmark@localhost:5432/ireporter";

      const pool = new Pool({
        connectionString
      });

      let flag = false;

      let sql = `UPDATE redflags SET location=$1 WHERE id=$2`;
      let values = [`${red.location}`, `${red.id}`]

      try{
        pool.connect();
        
        if(pool.query(sql, values)) flag = true;
        pool.end().then(res => {return flag});
      }catch(err){
        console.error(err.message);
      }
    }
}

export default new RedFlags;