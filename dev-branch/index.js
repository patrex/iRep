
var express = require('express');
var users = require('./users');
var incidents = require('./incidents');
var bodyParser = require('body-parser');

const app = express();  //create Express application
const port = process.env.PORT || 3000;  //setup port

app.use(express.static('./views'));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}));

//create a red-flag record		!Done(specialize success message for each type of incident)
app.get("/", (req, res) => {
	res.sendFile(__dirname + 'views/index.html')

});

app.post('/api/v1/red-flags', (req, res) => {
	let createdBy = req.body.userId;
	let date = new Date();
	let details = req.body.postData;
	let type = req.body.type;

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

	if(incidents.push(post))
		res.status(201).send({
			"status": 201,
			id,
			post,
			message: "Created red-flag record",
		});
	else
		res.status(500).send({
			status: 500,
			"message": "Post could not be created at this time.",
		});

});

//return all red-flag incidents. DONE!
app.get('/api/v1/red-flags', (req, res) => {
	//use map to select only red-flag incidents
	let redFlagIncidents = incidents.filter( (incident) => incident.type === "red-flag" );
	
	if(redFlagIncidents.length > 0){
		res.json({
			"status": 200,
			"data"  : redFlagIncidents,
		});
	} 

	res.status(404).json({
		"status": 404,
		"message": "No red-flag incidents found",
	});
})

//get a specific red-flag incident. DONE!
app.get('/api/v1/red-flags/:redFlagID', (req, res) => {
	const redFlagId = parseInt(req.params.redFlagID, 10);

	incidents.map( (redIncident) => {
		if(redIncident.id == redFlagId){
			res.send({
				"status": 200,
				redIncident,
			});
		}
	});

	res.send({
		"status": 404,
		message: "we could not find a red-flag incident with that id",
	});
});

//add a location for a specific red-flag incident
app.patch('/api/v1/red-flags/:redFlagID/:location', (req, res) => {
	const rID = parseInt(req.params.redFlagID, 10);
	const location = req.params.location;

	incidents.map((redEvent, position) => {
		if(redEvent.id == rID){
			redEvent.location = location;
			//incidents.splice(position, 1);	//!
			res.send({
				status: 201,
				message: `location for red-flag incident with id [ ${rID} ] was successfully updated.`
			});
		}
	});
});

//add a comment for a specific red-flag record
app.patch( '/api/v1/red-flags/:redFlagID/:comment', (req, res) => {
	const rID = parseInt(req.params.redFlagID, 10);
	const comments = req.params.comment;

	incidents.map((redEvent, position) => {
		if(redEvent.id == rID){
			redEvent.comment = comments;
			res.send({
				status: 201,
				message: `Comment for red-flag record [ ${rID} ] was successfully updated`, 
			});
		}
	});
});

//delete a particular red-flag incidents !DONE
app.delete('/api/v1/red-flags/:redFlagID', (req, res) => {
	const id = parseInt(req.params.redFlagID, 10);

	incidents.map((redEvent, position) => {
		if(redEvent.id == id){
			incidents.splice(position, 1);	//!
			res.send({
				status: 201,
				message: `red-flag incident with id [ ${id} ] was successfully deleted`
			});
		}
	});

	res.send({
		status: 404,
		message: "Sorry, it appears that there's no red-flag record with that id",
	});
});

//start the app
app.listen(port, () => {
    console.log(`Server up on localhost:${port}`); 
});
