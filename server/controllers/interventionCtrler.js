import  db from '../models/manageInts'
//import user from '../models/manageUsers';

class InterventionCtrlr{
    async getOne(request, response){
        const id = request.params.id * 1;
		let data = null;
	
		data = await db.getOne(id);

		if(data.length > 0){
			response.status(200).json({
				"status": 200,
				data
			});
		}
		else{
			response.status(404).send({
				"status": 404,
				message: "No intervention incident with that id",
			});
		}
    }

    async getAll(request, response){
        let interventions = await db.returnAll();
		
		if(interventions.length > 0){
			response.status(200).json({
				status: 200,
				data  : interventions,
			});
		} else {
			response.status(404).json({
				status: 404,
				message: "No intervention incidents found",
			});
		}
    }

    async create(request, response){
		let Result;

		Result = await db.create({
			createdBy: request.session.usr,
			status: 'under-investigation',
			location: '0,0',
			comment: request.body.desc
		});

		if(Result.rowCount > 0){
			res.status(200).json({
				status: 200,
				data: Result.rows
			});
		}
			
		else{
			const string = qs.stringify({
				status: 1,
				msg: 'Redflag creation failed'
			})
			res.redirect('/redflags?' + string);

			// res.json({
			// 	status: 500,
			// 	"message": "Post could not be created at this time.",
			// });
		}
    }

    async updateLoc(request, response){
		let rID = request.params.id * 1;
		let location = request.body.location;
		let result;

		const obj = {
			rID,
			location
		}

		result = await db.location(obj);

		// let interventionList = incidents.filter((incident) => incident.type === 'intervention');
		// if((index = interventionList.findIndex((match) => match.id == rID)) >= 0){	//find a match
		// 	if(interventionList[index].location = request.body.location);
		// 		flag = true;
		// }

		if(result.rowCount > 0){
			response.json({
				status: 200,
				message: `location for red-flag incident with id [${rID}] updated.`
			});
		} else {
			response.json({
				status: 404,
				message: `Could not set the location for ${rID}`,
			});
		}
    }

    async updateComment(request, response){
		const rID = request.params.id * 1;
		const comments = request.body.comment;
		let result;

		const obj = {
			rID,
			comments
		}

		result = await db.comment(obj);
		

		// let interventionList = incidents.filter((incident) => incident.type === 'intervention');
		// if((index = interventionList.findIndex((match) => match.id == rID)) >= 0){	//find a match
		// 	if(interventionList[index].comment = comments);
		// 		flag = true;
		// }

		if(result.rowCount > 0){
			response.json({
				status: 200,
				message: `Comment for intervention record [${rID}] updated`
			});
		}
			
		else{
			response.json({
				status: 404,
				message: `Could not set comments for ${rID}`
			});
		}

    }


    //accessible if admin
    async updateStatus(request, response){
		const id = request.body.id;
		const newStatus = request.body.status;
		let Result;

		Result = await db.changeStatus({id, newStatus});

		if(Result.rowCount > 0){
			response.json({
				status: 200,
				message: `Status for intervention record [${rID}] updated`
			});
		}else{
			response.json({
				status: 404,
				message: `Could not set status for ${rID}`
			});
		}
	}
	
	async delete(request, response){
		const id = request.params.id * 1;
		let result;

		result = await db.delete(id);
		
	
		// incidents.map((intervention, position) => {
		// 	if(intervention.id == id){
		// 		if(incidents.splice(position, 1))	//!
		// 			flag = true;	
		// 	}
		// });

		if(result.rowCount > 0){
			response.status(200).json({
				status: 200,
				message: `Intervention incident with id [${id}] deleted`
			});
		}else{
			response.status(404).json({
				status: 404,
				message: "No intervemtion record with that id",
			});
		}
	}
}

module.exports =  new InterventionCtrlr();