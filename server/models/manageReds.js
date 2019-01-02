import  { Client } from 'pg';


//TODO: always check if respective table exists
class RedFlags{
    async returnAll(username){
        const connectionString = "postgres://ireporter:hallmark@localhost:5432/ireporter";

        const client = new Client({
            connectionString
        });

        let sql = `SELECT * FROM redflags`;
      let Result;

      try{
        client.connect();
        Result = await client.query(sql)
        client.end();
        return Result.rows;
      }catch(err){
        console.error(err.message);
      }

        
    }

    async getOne(id){
      let sql = `SELECT * FROM redflags WHERE id=$1`;
        let Result;

        try{
            client.connect();
            Result = client.query(sql, [`${id}`]);
            client.end();
            return Result.rows;
        }catch(err){
            console.error(err.message);
        }
    }

    async create(red){
      const connectionString = "postgres://ireporter:hallmark@localhost:5432/ireporter";

      const client = new Client({
        connectionString
      });

      let Result;

      let sql = `INSERT INTO redflags(creadted_on, created_by, location, current_status, comment) VALUES($1, $2, $3, $4, $5)`;
      const values = [
        'now',
        `${red.createdBy}`,
        `${red.location}`,
        `${red.status}`,
        `${red.comment}`
      ];

      try{
        client.connect();

        Result = await client.query(sql, values);
        client.end();
        return Result;
      }catch(err){
        console.error(err.message);
        client.end();
      }
    }

    async delete(id){
      const connectionString = "postgres://ireporter:hallmark@localhost:5432/ireporter";

      const client = new Client({
        connectionString
      });

      let sql = `DELETE FROM redflags WHERE id=$1`;

      try{
        client.connect();
        let Result = await client.query(sql, [id]);
        client.end();
        return Result;
      }catch(err){
        console.error(err.message);
      }
    }

    async changeStatus(red){
      const connectionString = "postgres://ireporter:hallmark@localhost:5432/ireporter";

      const client = new Client({
        connectionString
      });

      let sql = `UPDATE redflags SET status=$1 WHERE id=$2`;
      let values = [`${red.status}`, `${red.id}`]

      try{
        client.connect();

        let Result = await client.query(sql, values);
        client.end();
        return Result;
      }catch(err){
        console.error(err.message);
      }
    }

    async comment(red){
      const connectionString = "postgres://ireporter:hallmark@localhost:5432/ireporter";

      const client = new Client({
        connectionString
      });

      let sql = `UPDATE redflags SET comment=$1 WHERE id=$2`;
      let values = [`${red.comment}`, `${red.id}`]

      try{
        client.connect();
        
        let Result = await client.query(sql, values);
        client.end();
        return Result;
      }catch(err){
        console.error(err.message);
      }
    }

    async location(red){
      const connectionString = "postgres://ireporter:hallmark@localhost:5432/ireporter";

      const client = new Client({
        connectionString
      });

      let [a, b] = int.location.split(',');
      let Result;

      let sql = `UPDATE redflags SET location=point($1,$2) WHERE id=$3`;
      let values = [`${a}`,
                    `${b}`,
                    `${red.rID}`
                  ]

      try{
        client.connect();
        
        Result = await client.query(sql, values);
        client.end()
        return Result;
      }catch(err){
        console.error(err.message);
      }
    }
}

export default new RedFlags;