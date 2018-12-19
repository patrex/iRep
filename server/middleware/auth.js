function checkReg(request, response, next){
    if(!request.body.firstname){
        return response.status(400).json({
            message: 'You must enter at least a firstname'
        });
    }else if(!request.body.pwd){
        return response.status(400).json({
            message: 'No password set'
        });
    }else if(request.body.pwd !== request.body.pwdc){
        return response.status(400).json({
            message: "Passwords don't match. Re-enter password"
        });
    }
    else next();
}

function checkLogin(request, response){
    if(!request.body.username){
        return response.status(400).json({
            message: 'Username invalid'
        });
    }else if(!request.body.pwd){
        return response.status(400).json({
            message: 'Enter a password'
        });
    }
    else next();
}

function verifyToken(request, response, next){
    
}
export {checkReg, checkLogin, verifyToken}