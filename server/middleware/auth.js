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
        })
        response.redirect('/?' + string);
    }
    else next();
}

function sessionize(request, response, next){
    if(request.session && request.session.user){
        request.user = user;
        request.session.user = user;
        response.locals.user = user;
    }else{
        next();
    }
}

function isLoggedIn(request, response, next){
    if(!request.session.user){
        const string = qs.stringify({
            status: 1,
            msg: 'You are not logged in.'
        })
        response.redirect('/?' + string);
    }else{
        next();
    }
}

function verifyAdmin(request, response, next){
    if(!request.session.user){
        const string = qs.stringify({
            status: 1,
            msg: 'You are not logged in.'
        });
        response.redirect('/?' + string);
    } else if(request.session.user && request.session.user.isadmin == false){
        response.status(403).send('You don\'t have the authorization to access this route');
    } else next();
}

export {checkReg, checkLogin, verifyAdmin, isLoggedIn}