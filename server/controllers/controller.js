import incidents from ('../models/incidents');
import users from ('../models/users');


class Controllers {
	createRedFlag (req, res) {
		let createdBy = req.params.userId;
		let date = new Date();
		let details = req.params.postData;
		let type = req.params.type;
	
		let id = incidents.length + 1;
	
		const post = {
			id,
			createdBy,
			createdOn: date,
			comment: details,
			type,
			"status": "draft",
			"location": "",
			images: [],
		}
	
		if(incidents.push(post)){
			res.json({
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
		let redFlagIncidents = incidents.filter( (incident) => incident.type === "red-flag" );
		
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
		const redFlagId = parseInt(req.params.redFlagID, 10);
		let flag = false;
		let data = null;
	
		incidents.map( (redIncident) => {
			if(redIncident.id == redFlagId){
				flag = true;
				data = redIncident;
			}		
		});

		if(flag){
			res.json({
				"status": 200,
				data,
			});}
		else{
			res.send({
				"status": 404,
				message: "we could not find a red-flag incident with that id",
			});
		}		
	}
	
	//delete a particular red-flag incidents !DONE
	deleteRedFlag (req, res) {
		const id = parseInt(req.params.redFlagID, 10);
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
				message: `red-flag incident with id [ ${id} ] was successfully deleted`
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
		const rID = parseInt(req.params.redFlagID, 10);
		const location = req.params.location;
		let flag = false;

		incidents.map((redEvent, position) => {
			if(redEvent.id == rID){
				if(redEvent.location = location);
					flag = true;
				//incidents.splice(position, 1);	//!
			}
		});

		if(flag){
			res.json({
				status: 201,
				message: `location for red-flag incident with id [ ${rID} ] was successfully updated.`
			});
		}
			
		else{
			res.json({
				status: 404,
				message: `Sorry, we could't set the location for ${location}`,
			});
		}		
	}
	
	//add a comment for a specific red-flag record
	updateComment (req, res) {
		const rID = parseInt(req.params.redFlagID, 10);
		const comments = req.params.comment;
		let flag = false;
	
		incidents.map((redEvent) => {
			if(redEvent.id == rID){
				if(redEvent.comment = comments)
					flag = true;
			}
		});

		if(flag){
			res.json({
				status: 200,
				message: `Comment for red-flag record [ ${rID} ] was successfully updated`, 
			});
		}
			
		else{
			res.json({
				status: 404,
				message: `Sorry, we could't set the comments for ${comments}`,
			});
		}
		
	}
}

const controllers = new Controllers();
export {controllers}