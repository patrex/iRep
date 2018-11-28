
import express from 'express';
import users from './users';
import incidents from './incidents';
import bodyParser from 'body-parser';

const app = express();  //create Express application
const port = process.env.PORT || 3000;  //setup port

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}));

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
