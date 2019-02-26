import reddb from '../models/manageReds';
import qs from 'querystring';

class RedFlagController {
	async createRedFlag (req, res) {
		let Result;
		let creator = JSON.parse(req.session.user);
	
		const post = {
			createdBy: creator.usr,
			status: "under-investigation",
			location: "0,0",
			comment: req.body.desc
		}

		Result = await reddb.create(post);

		if(Result.rowCount > 0){
			const string = qs.stringify({
				status: 0,
				msg: 'Redflag incident creation successful'
			});
			res.redirect('/redflags?' + string);
		}else{
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
	
	//return all red-flag incidents. DONE!
	async getAllRedFlags (req, res) {
		//use map to select only red-flag incidents
		//let redFlagIncidents = incidents.filter( (incident) => incident.type == "red-flag" );
		let Result = await reddb.returnAll();

		if(Result.length > 0){
			// const string = qs.stringify({
			// 	status: 0,
			// 	payload: Result
			// })
			//res.redirect('/redflags?' + string);
			res.json({
				"status": 200,
				Result,
			});
		} 
		else{
			const string = qs.stringify({
				status: 0,
				msg: 'There\'s no Redflag incident to view'
			})
			res.redirect('/redflags?' + string);
		}
	}
	
	//get a specific red-flag incident. DONE!
	async getARedFlag (req, res) {
		const id = parseInt(req.params.id, 10);
		let result = undefined;


		// let red_flags = incidents.filter((reds) => reds.type === 'red-flag');
		// if((index = red_flags.findIndex((reds) => reds.id == id)) >= 0){
		// 	data = red_flags[index];
		// 	flag = true;
		// }

		result = await reddb.getOne(id);

		if(result.rowCount > 0){
			res.json({
				"status": 200,
				data: result
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
	async deleteRedFlag (req, res) {
		const id = req.params.id * 1;
		let Result;
	
		// incidents.map((redEvent, position) => {
		// 	if(redEvent.id == id){
		// 		if(incidents.splice(position, 1))	//!
		// 			flag = true;	
		// 	}
		// });

		Result = await reddb.delete(id);

		if(Result.rowCount > 0){
			res.json({
				status: 201,
				message: `red-flag incident with id [${id}] has been deleted`
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
	async updateLocation (req, res) {
		let rID = req.params.id * 1;
		let location = req.body.location;
		let Result;

		const obj = {
			rID,
			location
		}

		Result = await reddb.location(obj);



		// for(let incident of incidents){
		// 	if(incident.id == rID){
		// 		incident.location = req.body.location;
		// 		flag = true;
		// 	}	
		// }

		if(Result.rowCount > 0){
			res.json({
				status: 200,
				message: `location for red-flag incident with id [${rID}] was successfully updated.`
			});
		}else{
			res.json({
				status: 404,
				message: `Could not set the location for ${rID}`,
			});
		}		
	}
	
	//add a comment for a specific red-flag record
	async updateComment (req, res) {
		const rID = req.params.id * 1;
		const comments = req.body.comment;
		let Result;

		// for(let incident of incidents){
		// 	if(incident.id == rID){
		// 		incident.comment = comments;
		// 		flag = true;
		// 	}	
		// }
		Result = await reddb.comment({rID, comments});

		if(Result.rowCount > 0){
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
	async updateStatus(req, res){
		const id = res.body.id;
		const newStatus = req.body.status;
		let Result;

		Result = await reddb.changeStatus({id, newStatus});

		if(Result.rowCount > 0){
			res.json({
				status: 200,
				message: `Status for redflag record [${rID}] updated`
			});
		}
			
		else{
			res.json({
				status: 404,
				message: `Could not set status for ${rID}`
			});
		}
	}
}

//const redFlagController = new RedFlagController();
module.exports = new RedFlagController();