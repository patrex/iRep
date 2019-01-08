import express from 'express';
import redCtrlr from '../controllers/redflagcontroller';
import interCtrlr from '../controllers/interventionCtrler';
import usrs from '../controllers/users';
import path from 'path';
import counters from '../models/counts';

//red-flag validators
import {
	validateOne, 
	validateComments, 
	validateLocation,   
} from '../middleware/validateRedFlag';

//general middleware
import {
	checkReg, 
	checkLogin, 
	verifyAdmin, 
	isLoggedIn,
	verifyToken,
	logout
} from '../middleware/auth';

import {
	single, 
	validateLoc, 
	validateComment, 
	validateCreate
} from '../middleware/validateIntervention';

//create router
const router = express.Router({mergeParams: true});

router.get('/', (request, response) => {
    response.sendFile(path.resolve(__dirname, '../../public/', 'index.html'));
});

router.get('/profile', isLoggedIn, (request, response) => {
	response.sendFile(path.resolve(__dirname, '../../public/', 'profile.html'));
});

router.get('/redflags',isLoggedIn, (request, response) => {
	response.sendFile(path.resolve(__dirname, '../../public/', 'redflags.html'));
});

router.get('/makered', isLoggedIn, (request, response) => {
	response.sendFile(path.resolve(__dirname, '../../public/', 'makered.html'));
});

router.get('/users', isLoggedIn, (request, response) => {
	response.sendFile(path.resolve(__dirname, '../../public/', 'users.html'));
});

router.get('/admin', isLoggedIn, verifyAdmin, (request, response) => {
	response.sendFile(path.resolve(__dirname, '../../public/', 'admin.html'));
});

router.get('/interventions', isLoggedIn, (request, response) => {
	response.sendFile(path.resolve(__dirname, '../../public/', 'interventions.html'));
});

router.get('/makeint', isLoggedIn, (request, response) => {
	response.sendFile(path.resolve(__dirname, '../../public/', 'makeint.html'));
});


//********************** Handle red flag routes*/

//create a red flag record
router.post('/api/v1/red-flags', isLoggedIn,  verifyToken, redCtrlr.createRedFlag);
router.get('/api/v1/red-flags', isLoggedIn,  verifyToken, redCtrlr.getAllRedFlags);
router.get('/api/v1/red-flags/:id', isLoggedIn, validateOne, verifyToken,  redCtrlr.getARedFlag);
router.delete('/api/v1/red-flags/:id', isLoggedIn, validateOne, verifyToken,  redCtrlr.deleteRedFlag);
router.patch('/api/v1/red-flags/:id/location', isLoggedIn, verifyToken,  validateLocation, redCtrlr.updateLocation);
router.patch('/api/v1/red-flags/:id/comment', isLoggedIn, verifyToken,  validateComments, redCtrlr.updateComment);
router.patch('/api/v1/red-flags/:id/status', isLoggedIn, verifyAdmin, verifyToken, redCtrlr.updateStatus);

//*******************Handle intervention routes*********************** */

router.get('/api/v1/interventions/', isLoggedIn, verifyToken,  interCtrlr.getAll );
router.get('/api/v1/interventions/:id', single, isLoggedIn, verifyToken, interCtrlr.getOne);
router.post('/api/v1/interventions', validateCreate, isLoggedIn, verifyToken, interCtrlr.create);
router.patch('/api/v1/interventions/:id/status', verifyAdmin, verifyToken, interCtrlr.updateStatus );	//TODO: add logic
router.patch('/api/v1/interventions/:id/location', isLoggedIn, validateLoc, verifyToken, interCtrlr.updateLoc);
router.patch('/api/v1/interventions/:id/comment', isLoggedIn, validateComment,  verifyToken, interCtrlr.updateComment);
router.delete('/api/v1/interventions/:id', isLoggedIn, single, verifyToken, interCtrlr.delete);

// *************Handle  signin and sign up routes****************/
router.post('/api/v1/auth/signup', checkReg, usrs.createUser);
router.post('/api/v1/auth/login', checkLogin, usrs.logUserIn);
router.get('/api/v1/auth/logout', isLoggedIn, logout);
router.get('/api/v1/count', counters);

module.exports = router;