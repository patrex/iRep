import bc from 'bcryptjs';
import jwt from 'jsonwebtoken';
import qs from 'querystring';

function checkReg(request, response, next){
    if(!request.body.fname){
        return response.status(400).json({
            message: 'You must enter at least a firstname'
        });
    }else if(!request.body.psw){
        return response.status(400).json({
            message: 'No password set'
        });
    }else if(request.body.psw !== request.body.psw2){
        return response.status(400).json({
            message: "Passwords don't match. Re-enter password"
        });
    }
    else next();
}

function checkLogin(request, response, next){
    if(!request.body.username){
        const string = qs.stringify({
            status: 1,
            msg: 'Invalid username'
        })
        response.redirect('/?' + string);
    }else if(!request.body.pwd){
        const string = qs.stringify({
            status: 1,
            msg: 'Invalid password'
        });
        response.redirect(`/?${string}`);
    }
    else next();
}

function isLoggedIn(request, response, next){
    //console.log(request);
    if(!request.session.token){
        const string = qs.stringify({
            status: 1,
            msg: 'You are not logged in.'
        });
        response.redirect(`/?${string}`);
    }else next();
}

function verifyAdmin(request, response, next){
    const user = request.session.user;
    const userJSON = JSON.parse(user);
    const isAdmin = userJSON.isAdmin;

    if(!(isAdmin)){
        response.status(403).send('You don\'t have authorization to access this route');
    } 
    else next();
}

function verifyToken(request, response, next){
    let token = JSON.parse(request.session.token);
    jwt.verify(token, 'secret', (err, res) => {
        if(err){
            const string = qs.stringify({
                status: 1,
                msg: 'We could not verify you'
            });
            response.redirect(`/?${string}`);
        } else next();
    });
}

function logout(request, response, next){
    if(request.session.token){
        if(request.session.token){
            request.session.destroy();
            response.redirect('/');
        }
    }
    next();
}

export {checkReg, checkLogin, verifyAdmin, isLoggedIn, verifyToken, logout}