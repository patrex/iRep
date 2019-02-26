import users from '../models/manageUsers';
import bc from 'bcryptjs';
import jwt from 'jsonwebtoken';
import qs from 'querystring';

let active = 0;

class User{
    
    async createUser(request, response){
        const pwd = request.body.psw;
        var firstname1 = request.body.fname;
        let passwordHash = undefined;
        let Result;

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

        Result = await users.addUser(user);

        if(Result.rowCount > 0){
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

        Result = await users.fetchData({usr, pwd});

        try{
            bc.compare(pwd, Result[0].password)
                .then((res) => {
                    if(res == true){
                        const user = {
                            usr: Result[0].username,
                            isAdmin: Result[0].is_admin,
                        }
                        let token = jwt.sign(user, 'secret');
                        request.session.token = token;
                        active += 1;    //count active users
                        //console.log('Active users: ' + active);

                        // const username = qs.stringify({
                        //     user: request.session.token.usr
                        // });

                        console.log(request.session.token)
                        
                        response.redirect('/profile?' + user.usr);
                    }else{
                        const string = qs.stringify({
                            status: 1,
                            msg: 'Authentication failed'
                        })
                        response.redirect('/?' + string);
                    }
                });
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