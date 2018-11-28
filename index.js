
import express from 'express';
import users from './users';
import incidents from './incidents';
import bodyParser from 'body-parser';

const app = express();  //create Express application
const port = process.env.PORT || 3000;  //setup port

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}));

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
	});
});

//start the app
app.listen(port, () => {
    console.log(`Server up on localhost:${port}!`); 
});
