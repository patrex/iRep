
    //validate post create
    function validateCreate(request, response, next){
        if(!(request.params.comments)){
            response.json({
               status: 404,
               message: 'comments too short',
            })
            response.end();;
        }
    

        if(!(request.params.type)){
            response.json({
                status: 404,
                message: "You need to indicate a type='red-flag' "
            });
            response.end();;
        }
    }

    //validate getting a single red-flag id
    function validateGetARed(request, response, next){
        if(isNaN(request.params.redFlagID)){
            response.json({
                status: 404,
                message: 'You are required to enter an integer here'
            });
            response.end();
        }
    }

    //validate location edit
    function validateEditLocation(request, response, next){
        if(!redFlagID){
            response.json({
                status: 404,
                message: 'You need to provide red-flag id'
            });
            response.end();;

        }

        if(!location){
            response.json({
                status: 404,
                message: 'You need to provide a location(long, lat)'
            });
            response.end();;
        }
    }
    // validate comment edit
    function validateEditComment(request, response, next){
        if(!request.params.redFlagID){
            response.json({
                status: 404,
                message: 'You need to provide red-flag id'
            })
            response.end();;
        }

        if(!request.params.comment){
            response.json({
                status: 404,
                message: 'You need to provide a location(long, lat)'
            });
            response.end();
        }
    }

    //validateDelete
    function validateDelete(request, response, next){
        if(!request.params.redFlagID){
            response.json({
                status: 404,
                message: 'You need to provide red-flag id to delete'
            })
            response.end();
        }
    }

export {validateDelete, validateEditComment, validateEditLocation, validateGetARed, validateCreate}
