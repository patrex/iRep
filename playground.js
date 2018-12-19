import jwt from 'jsonwebtoken';
import bc from 'bcryptjs';

const person = {
    name: 'Joel',
    height: '5ft',
    origin: 'Nigeria'
}

const token = jwt.sign(person, 'secret', {expiresIn:'1h', issuer: 'James C.'});
console.log(token);
console.log(jwt.verify(token, 'secret',{issuer:"Thatcher"}, (err, success) => {
    if(err) console.log(err.message);
    else{
        console.log(jwt.decode(token));
    }
}));
//console.log('+' + bc.hashSync('hallpace') + '+');