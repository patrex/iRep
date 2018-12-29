import jwt from 'jsonwebtoken';

function verifyToken(token){
    let flag = false;

    if(jwt.verify(token, 'secret'))
        flag = true;
    
    return flag;
}

export {verifyToken};