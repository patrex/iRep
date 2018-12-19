import incidents from '../models/incidents.js';

class RedFlagController {
	createRedFlag (req, res) {
		let id = incidents.length + 1;
		let date = new Date();
		let flag = false;
	
		const post = {
			id,
			createdBy: "",
			createdOn: date,
			type: "red-flag",
			status: "draft",
			location: "",
			images: [],
		}
	
		if(incidents.push(post)){
			flag = true;
		}

		if(flag){
			res.status(200).json({
				"status": 201,
				id,
				post,
				message: "Created red-flag record",
			});
		}
			
		else{
			res.json({
				status: 500,
				"message": "Post could not be created at this time.",
			});
		}
	}
	
	//return all red-flag incidents. DONE!
	getAllRedFlags (req, res) {
		//use map to select only red-flag incidents
		let redFlagIncidents = incidents.filter( (incident) => incident.type == "red-flag" );
		
		if(redFlagIncidents.length > 0){
			res.json({
				"status": 200,
				"data"  : redFlagIncidents,
			});
		} 
		else{
			res.json({
				"status": 404,
				"message": "No red-flag incidents found",
			});
		}
	}
	
	//get a specific red-flag incident. DONE!
	getARedFlag (req, res) {
		const id = parseInt(req.params.id, 10);
		let flag = false;
		let data = null;
	
		incidents.map( (redIncident) => {
			if(redIncident.id == id){
				flag = true;
				data = redIncident;
			}		
		});

		if(flag){
			res.json({
				"status": 200,
				data,
			});
		}
		else{
			res.send({
				"status": 404,
				message: "we could not find a red-flag incident with that id",
			});
		}		
	}
	
	//delete a particular red-flag incidents !DONE
	deleteRedFlag (req, res) {
		const id = req.params.id * 1;
		let flag = false;
	
		incidents.map((redEvent, position) => {
			if(redEvent.id == id){
				if(incidents.splice(position, 1))	//!
					flag = true;	
			}
		});

		if(flag){
			res.json({
				status: 201,
				message: `red-flag incident with id [${id}] was successfully deleted`
			});
		}
			
		else{
			res.json({
				status: 404,
				message: "Sorry, it appears that there's no red-flag record with your id",
			});
		}
			
	}
	
	//add a location for a specific red-flag incident
	updateLocation (req, res) {
		let flag = false;
		let rID = req.params.id * 1;
		let location = undefined;

		for(let incident of incidents){
			if(incident.id == rID){
				incident.location = req.body.location;
				flag = true;
			}	
		}

		if(flag){
			res.json({
				status: 200,
				message: `location for red-flag incident with id [${rID}] was successfully updated.`
			});
		}
			
		else{
			res.json({
				status: 404,
				message: `Could not set the location for ${rID}`,
			});
		}		
	}
	
	//add a comment for a specific red-flag record
	updateComment (req, res) {
		const rID = req.params.id * 1;
		const comments = req.body.comment;
		let flag = false;

		for(let incident of incidents){
			if(incident.id == rID){
				incident.comment = comments;
				flag = true;
			}	
		}

		if(flag){
			res.json({
				status: 200,
				message: `Comment for red-flag record [${rID}] was successfully updated`
			});
		}
			
		else{
			res.json({
				status: 404,
				message: `Could not set comments for ${rID}`
			});
		}
		
	}

	//accessible if admin
	updateStatus(req, res){

	}
}

//const redFlagController = new RedFlagController();
module.exports = new RedFlagController();