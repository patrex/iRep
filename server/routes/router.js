import express from 'express';
import redCtrlr from '../controllers/redflagcontroller';
import interCtrlr from '../controllers/interventionCtrler';
import {checkReg, checkLogin, verifyAdmin, isLoggedIn} from '../middleware/auth';
import {single, validateLoc, validateComment, validateCreate} from '../middleware/validateIntervention';
import usrs from '../controllers/users';
import path from 'path';

//intervention validators

//red-flag validators
import {validateOne, 
		validateComments, 
		validateLocation,   
} from '../middleware/validateRedFlag';



const router = express.Router({mergeParams: true});

router.get('/', (request, response) => {
    response.sendFile(path.resolve( __dirname, '../../public/', 'index.html'));
});

router.get('/profile', isLoggedIn, (request, response) => {
	response.sendFile(path.resolve(__dirname, '../../public/', 'profile.html'));
});

router.get('/redflags',isLoggedIn, (request, response) => {
	response.sendFile(path.resolve(__dirname, '../../public/', 'incidents.html'));
});

router.get('/users', isLoggedIn, (request, response) => {
	response.sendFile(path.resolve(__dirname, '../../public/', 'users.html'));
});

router.get('/admin', isLoggedIn, (request, response) => {
	response.sendFile(path.resolve(__dirname, '../../public/', 'admin.html'));
});

router.get('/profile', isLoggedIn, (request, response) => {
	response.sendFile(path.resolve(__dirname, '../../public/', 'profile.html'));
});

router.get('/admin', isLoggedIn, (request, response) => {
	response.sendFile(path.resolve(__dirname, '../../public/', 'admin.html'));
});


//********************** Handle red flag routes*/

//create a red flag record
router.post('/api/v1/red-flags', redCtrlr.createRedFlag);

//return all red-flag incidents. DONE!
router.get('/api/v1/red-flags', redCtrlr.getAllRedFlags);

///get a specific red-flag incident. DONE!
router.get('/api/v1/red-flags/:id', validateOne, redCtrlr.getARedFlag);

//delete a particular red-flag incidents !DONE
router.delete('/api/v1/red-flags/:id', validateOne, redCtrlr.deleteRedFlag);

//add a location for a specific red-flag incident
router.patch('/api/v1/red-flags/:id/location', validateLocation, redCtrlr.updateLocation);

//add a comment for a specific red-flag record
router.patch('/api/v1/red-flags/:id/comment', validateComments, redCtrlr.updateComment);

router.patch('/api/v1/red-flags/:id/status', verifyAdmin, );

//*******************Handle intervention routes*********************** */

router.get('/api/v1/interventions/', interCtrlr.getAll );
router.get('/api/v1/interventions/:id', single, interCtrlr.getOne);
router.post('/api/v1/interventions', validateCreate, interCtrlr.create);
router.patch('/api/v1/interventions/:id/status', verifyAdmin );	//TODO: add logic
router.patch('/api/v1/interventions/:id/location', validateLoc, interCtrlr.updateLoc);
router.patch('/api/v1/interventions/:id/comment', validateComment, interCtrlr.updateComment);
router.delete('/api/v1/interventions/:id', single, interCtrlr.delete);

// *************Handle  signin and sign up rouetes****************/
router.post('/api/v1/auth/signup', checkReg, usrs.createUser);
router.post('/api/v1/auth/login', checkLogin, usrs.logUserIn);


module.exports = router;