// import jwt from 'jsonwebtoken';
import bc from 'bcryptjs';
import counts from './server/utils/counts';

// const person = {
//     name: 'Joel',
//     height: '5ft',
//     origin: 'Nigeria'
// }

// const token = jwt.sign(person, 'secret', {expiresIn:'1h', issuer: 'James C.'});
// console.log(token);
// console.log(jwt.verify(token, 'secret',{issuer:"Thatcher"}, (err, success) => {
//     if(err) console.log(err.message);
//     else{
//         console.log(jwt.decode(token));
//     }
// }));
//console.log('+' + bc.hashSync('hallpace') + '+');

// const pwd;
// let hash1 = '';

// let hash0 = new Promise((resolve, reject) => {
//     resolve(bc.hash(pwd, 10))
// })

// hash0.then(result => {
//     hash1 = result;
//     console.log(hash);
// }).catch(err => console.log(err.message));


// const pwd = 'request.body.psw';
// let passwordHash;

// let hash0 = new Promise((resolve, reject) => {
//     let passwordHash = await resolve(bc.hash(pwd, 10))
// })

// let a = '1,2';
// let [b,c] = a.split(',');
// console.log(b, c);

console.log(counts);
//console.log(new Date('1999', '10').toDateString())