import  { Client } from 'pg';


//TODO: always check if respective table exists
class Incidents{
  async returnAll(){
    const connectionString = "postgres://ireporter:hallmark@localhost:5432/ireporter";

    const client = new Client({
        connectionString
    });

    let sql = `SELECT * FROM interventions`;
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
    const connectionString = "postgres://ireporter:hallmark@localhost:5432/ireporter";

    const client = new Client({
        connectionString
    });

    let sql = `SELECT * FROM interventions WHERE id=$1`;
    let values = [`${id}`]
    let Result;

    try{
      client.connect();
      Result = await client.query(sql, values);
      client.end();
      return Result.rows;
    }catch(err){
        console.error(err.message);
    }
  }

  async create(int){
    const connectionString = "postgres://ireporter:hallmark@localhost:5432/ireporter";

    const client = new Client({
      connectionString
    });

    let sql = `INSERT INTO interventions(created_by, creadted_on, current_status, location, comment) VALUES($1, $2, $3, $4, $5)`
    const values = [
      `${int.createdBy}`,
      `now`,
      `${int.status}`,
      `${int.location}`,
      `${int.desc}`
    ];

    try{
      client.connect();
      let Result = await client.query(sql, values);
      return Result;
    }catch(err){
      console.error(err);
    }
  }

  async delete(id){
    const connectionString = "postgres://ireporter:hallmark@localhost:5432/ireporter";

    const client = new Client({
      connectionString
    });

    let sql = `DELETE FROM interventions WHERE id=$1`;

    try{
      client.connect();
      let Result = await client.query(sql, [id]);
      client.end();
      return Result;
    }catch(err){
      console.error(err.message);
    }
  }

  async changeStatus(int){
    const connectionString = "postgres://ireporter:hallmark@localhost:5432/ireporter";

    const client = new Client({
      connectionString
    });

    let Result;

    let sql = `UPDATE interventions SET status=$1 WHERE id=$2`;
    let values = [`${int.status}`, `${int.id}`]

    try{
      client.connect();

      Result = client.query(sql, values);
      client.end();
      return Result;
    }catch(err){
      console.error(err.message);
    }
  }

  async comment(int){
    const connectionString = "postgres://ireporter:hallmark@localhost:5432/ireporter";

    const client = new Client({
      connectionString
    });

    let Result;

    let sql = `UPDATE interventions SET comment=$1 WHERE id=$2`;
    let values = [`${int.comments}`, `${int.rID}`];

    try{
      client.connect();
      
      Result = await client.query(sql, values)
      client.end();
      return Result;
    }catch(err){
      console.error(err.message);
    }
  }

  async location(int){
    const connectionString = "postgres://ireporter:hallmark@localhost:5432/ireporter";

    const client = new Client({
      connectionString
    });

    let [a, b] = int.location.split(',');
    let Result;

    let sql = `UPDATE interventions SET location=point($1,$2) WHERE id=$3`;
    let values = [`${a}`,
                  `${b}`,
                  `${int.rID}`
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

export default new Incidents