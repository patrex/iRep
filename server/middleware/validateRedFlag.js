import validate from 'validator';

    //validate getting a single red-flag id
    function validateGetARed(request, response, next){
        if(!request.params.redFlagID){
            return response.json({
                status: 404,
                message: 'You are required to enter an integer here'
            });
            
        } else next();
    }

    //validate location edit
    function validateEditLocation(request, response, next){
        if(!request.params.redFlagID){
            return response.json({
                status: 404,
                message: 'You need to provide red-flag id'
            });
        } 
        else next();
    }
    // validate comment edit
    function validateEditComment(request, response, next){
        if(!request.body.redFlagID){
            return response.json({
                status: 404,
                message: 'You need to provide red-flag id'
            })
        }
        else if(!request.body.comment){
            return response.json({
                status: 404,
                message: 'You need to provide a comment'
            });
        }
        else next();
    }

    //validateDelete
    function validateDelete(request, response, next){
        if(!request.params.redFlagID){
            return response.json({
                status: 404,
                message: 'You need to provide red-flag id to delete'
            })
            
        } else next();
    }

export {validateDelete, validateEditComment, validateEditLocation, validateGetARed}
