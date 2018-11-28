
import express from 'express';
import users from './users';
import incidents from './incidents';
import bodyParser from 'body-parser';

const app = express();  //create Express application
const port = process.env.PORT || 3000;  //setup port

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}));

app.get('/api/v1/red-flags', (req, res) => {
	res.json({
		"status": 200,
		"data"  : redFlagIncidents,
	});
})

//start the app
app.listen(port, () => {
    console.log(`Server up on localhost:${port}!`); 
});
