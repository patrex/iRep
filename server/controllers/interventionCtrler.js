import  incidents from "../models/incidents";
//import user from '../models/manageUsers';

class InterventionCtrlr{
    getOne(request, response){
        const id = request.params.id * 1;
		let flag = false;
		let data = null;
		let index = undefined;
	
		let interventionList = incidents.filter((incident) => incident.type === 'intervention');
		if((index = interventionList.findIndex((match) => match.id == id)) >= 0){	//find a match
			data = interventionList[index];
			flag = true;
		}

		if(flag){
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

    getAll(request, response){
        let interventions = incidents.filter( (incident) => incident.type == "intervention" );
		
		if(interventions.length > 0){
			response.status(200).json({
				"status": 200,
				"data"  : interventions,
			});
		} else {
			response.status(404).json({
				"status": 404,
				"message": "No intervention incidents found",
			});
		}
    }

    create(request, response){
		let id = incidents.length + 1;
		let date = new Date();
		let flag = false;
	
		const post = {
			id,
			createdBy: "",
			createdOn: date,
			type: "intervention",
			status: "draft",
			location: "",
			images: [],
		}
	
		if(incidents.push(post)){
			flag = true;
		}

		if(flag){
			response.status(200).json({
				"status": 201,
				post,
				message: "Intervention record created"
			});
		}
			
		else{
			res.json({
				status: 500,
				"message": "Intervention record could not be created at this time.",
			});
		}

    }

    updateLoc(request, response){
		let flag = false;
		let rID = request.params.id * 1;
		let index = undefined;
		//let location = undefined;

		let interventionList = incidents.filter((incident) => incident.type === 'intervention');
		if((index = interventionList.findIndex((match) => match.id == rID)) >= 0){	//find a match
			if(interventionList[index].location = request.body.location);
				flag = true;
		}

		if(flag){
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

    updateComment(request, response){
		const rID = request.params.id * 1;
		const comments = request.body.comment;
		let flag = false;
		let index = undefined;

		let interventionList = incidents.filter((incident) => incident.type === 'intervention');
		if((index = interventionList.findIndex((match) => match.id == rID)) >= 0){	//find a match
			if(interventionList[index].comment = comments);
				flag = true;
		}

		if(flag){
			response.json({
				status: 200,
				message: `Comment for red-flag record [${rID}] updated`
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
    updateStatus(request, response){

	}
	
	delete(request, response){
		const id = request.params.id * 1;
		let flag = false;
	
		incidents.map((intervention, position) => {
			if(intervention.id == id){
				if(incidents.splice(position, 1))	//!
					flag = true;	
			}
		});

		if(flag){
			response.status(200).json({
				status: 200,
				message: `Intervention incident with id [${id}] deleted`
			});
		}
			
		else{
			response.status(404).json({
				status: 404,
				message: "No intervemtion record with that id",
			});
		}
	}
}

module.exports =  new InterventionCtrlr();