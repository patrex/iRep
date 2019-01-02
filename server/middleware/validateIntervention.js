import validate from 'validator';

//validate getting a single red-flag id
function single(request, response, next){
    if(!request.params.id){
        return response.status(404).json({
            status: 404,
            message: 'No intervention ID entered.'
        });
    } 
    else next();
}

function validateCreate(request, response, next){
    if(!request.body.desc){
        return response.status(400).json({
            status: 400,
            message: 'You cannot create an incident without a description'
        })
    } else next();
}

//validate location edit
function validateLoc(request, response, next){
    if(!request.params.id){
        return response.status(404).json({
            status: 404,
            message: 'You need to provide a intervention id'
        });
    } 
    else if(!validate.isLatLong(request.body.location)){
        return response.status(404).json({
            status: 404,
            message: `The cordinates you entered(${request.body.location}) are not not valid. Use (lat, long)`
        });
    }
    else next();
}
// validate comment edit
function validateComment(request, response, next){
    if(!request.params.id){
        return response.status(404).json({
            status: 404,
            message: 'You need to provide an intervention id'
        });
    }

    else if(!request.body.comment){
        return response.status(404).json({
            status: 404,
            message: 'You need to provide a comment'
        });
    }
    else next();
}

export { single, validateLoc, validateComment, validateCreate }
