class RedFlagValidator{
    //validate post create
    validateCreate(request, response, next){
        if(!(request.params.comments)){
            response.json({
               status: 404,
               message: 'comments too short',
            })
            next();
        }

        if(!(request.params.type)){
            response.json({
                status: 404,
                message: "You need to indicate a type='red-flag' "
            });
            next();
        }
    }

    //validate getting a single red-flag id
    validateGetARed(request, response, next){
        if(NaN(request.params.redFlagID)){
            response.json({
                status: 404,
                message: 'You are required to enter an integer here'
            });
            next();
        }
    }

    //validate location edit
    validateEditLocation(request, response, next){
        if(!redFlagID){
            response.json({
                status: 404,
                message: 'You need to provide red-flag id'
            });
            next();

        }

        if(!location){
            response.json({
                status: 404,
                message: 'You need to provide a location(long, lat)'
            });
            next();
        }
    }
    // validate comment edit
    validateEditComment(request, response, next){
        if(!request.params.redFlagID){
            response.json({
                status: 404,
                message: 'You need to provide red-flag id'
            })
            next();
        }

        if(!request.params.comment){
            response.json({
                status: 404,
                message: 'You need to provide a location(long, lat)'
            });
            next();
        }
    }

    //validateDelete
    validateDelete(request, response, next){
        if(!request.params.redFlagID){
            response.json({
                status: 404,
                message: 'You need to provide red-flag id to delete'
            })
            next();
        }
    }
}

export default RedFlagValidator;