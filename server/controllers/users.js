import user from '../models/user';

class User{
    createUser(request, response){
        const user = {
            firstname: request.body.firstname,
            lastname: request.body.lastname,
            othernames: request.body.others,
            phone: request.body.phone,
            username: request.body.username,
            isAdmin,
        }
    }
}