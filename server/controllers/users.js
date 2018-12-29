import users from '../models/manageUsers';
import bc from 'bcryptjs';
import jwt from 'jsonwebtoken';
import qs from 'querystring';

class User{
    async createUser(request, response){
        const pwd = request.body.psw;
        var firstname1 = request.body.fname;
        let passwordHash = undefined;

        let hash0 = new Promise((resolve) => {
            resolve(bc.hash(pwd, 10))
        })

        passwordHash = await hash0;

        const user = {
            firstname: request.body.fname,
            lastname: request.body.lname,
            othernames: request.body.oname,
            email: request.body.email,
            phone: request.body.phone,
            pwd: passwordHash,
            isAdmin: false,
            usrname: firstname1.toLowerCase() + (new Date().getTime() % 1000).toString()
        }

        if(users.addUser(user)){
            const string = qs.stringify({
                status: 0,
                msg: 'Account creation successful'
            });
            response.redirect('/?' + string);
        }else{
            const string = qs.stringify({
                status: 1,
                msg: 'Your account could not be created'
            });
            response.redirect('/?' + string);
        }
    }

    async logUserIn(request, response){
        const usr = request.body.username;
        const pwd = request.body.pwd;

        let Result;
        let token;

        const data = {
            usr,
            pwd
        }

        Result = await users.fetchData(data);

        try{
            let verify = await bc.compare(pwd, Result.rows[0].password);
            if(verify === true){
                const user = {
                    usr: Result.rows[0].username,
                    isAdmin: Result.rows[0].isadmin
                }
                token = await jwt.sign(data.usr, 'secret');
                request.session.user = JSON.stringify(user);
                response.redirect('/profile');
            }  
        }catch(err){
            const string = qs.stringify({
                status: 1,
                msg: 'Authentication failed'
            })
            response.redirect('/?' + string);
        }      
    }
}

export default new User;