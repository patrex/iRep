import {Client} from 'pg';

class Users{
    async addUser(usr){
      let flag = false;
      const connectionString = "postgres://ireporter:hallmark@localhost:5432/ireporter";

      const client = new Client({
        connectionString
      });

      try{
        client.connect();
        let query = `INSERT INTO users(firstname, lastname, othernames, email, phonenumber, registered, isadmin, password, username) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)`
        const values = [ `${usr.firstname}`, `${usr.lastname}`, 
                        `${usr.othernames}`, `${usr.email}`, 
                        `${usr.phone}`, 'now',
                        `${usr.isAdmin}`, `${usr.pwd}`,
                        `${usr.usrname}`
                    ];
        if(client.query(query, values)) flag = true;
        return flag;
      }catch(err){
        console.error(err.message);
      }
    }

    async fetchData(login){
      let Result;
      const connectionString = "postgres://ireporter:hallmark@localhost:5432/ireporter";

      const client = new Client({
        connectionString
      });

      let sql = `SELECT * FROM users WHERE username=$1`
      const values = [`${login.usr}`];

      try{
        client.connect();
        Result = await client.query(sql, values);
        client.end();
        return Result;
      } catch(error){
        console.log(error.message);
      }
    }
}

export default new Users;