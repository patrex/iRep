
import express from 'express';
import users from './users';
import incidents from './incidents';
import bodyParser from 'body-parser';

const app = express();  //create Express application
const port = process.env.PORT || 3000;  //setup port

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}));

app.post('/api/v1/red-flags/', (req, res) => {
	let createdBy = req.body.userId;
	let date = new Date();
	let details = req.body.postData;

	const post = {
		postId: redFlagIncidents.length + 1,
		createdBy,
		createdOn: date,
		comment: details,
		type: "red-flag",
		"status": "draft",
		"location": "",
		images: [],
	}

	if(redFlagIncidents.push(post))
		res.status(201).send({
			"status": 201,
			postId,
			post,
		});
	else
		res.status(500).send({
			status: 500,
			"message": "Post could not be create at this time.",
		});

});
app.get('/api/v1/red-flags', (req, res) => {
	res.json({
		"status": 200,
		"data"  : redFlagIncidents,
	});
})
app.get('/api/v1/red-flags/:red-flag-id', (req, res) => {
	const redFlagId = parseInt(req.params.red-flag-id, 10);
	redFlagIncidents.map(redIncident) => {
		if(redIncident.id == redFlagId){
			res.send({
				"status": 200,
				redIncident,
			});
		}
	}

	res.send({
		"status": 404,
		message: "we could not find a red-flag incident with that id",
app.patch('/red-flags/redID/location', (req, res) => {
	const id = parseInt(req.params.redID, 10);

	redFlagIncidents.map(redEvent) => {
		if(redFlagIncidents.id == id){
			redEvent.location
		}
	});
app.delete('/api/v1/red-flags/:redFlagID', (req, res) => {
	const id = parseInt(req.params.redFlagID, 10);

	redFlagEvents.map((redEvent, position) => {
		if(redEvent.id == id){
			redFlagIncidents.splice(position, 1);
			res.send({
				status: 201,
				message: `red-flag incident with id: ${id} was successfully deleted`
			});
		}
	)}
		res.send({
			status: 404,
			message: "Sorry, it appears that there's no event with your id on the database",
		});
});

//start the app
app.listen(port, () => {
    console.log(`Server up on localhost:${port}!`); 
});
