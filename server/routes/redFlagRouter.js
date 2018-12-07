import express from 'express';
import redFlagController from '../controllers/redflagcontroller';

import {validateDelete, 
	validateEditComment, 
	validateEditLocation, 
	validateGetARed,  
	validateCreate} from '../middleware/validateRedFlag'

const router = express.Router();
//create a red flag record

router.post('/api/v1/red-flags', validateCreate, redFlagController.createRedFlag);

//router.get('/api/v1/users', controller.getAllUsers);

//return all red-flag incidents. DONE!
router.get('/api/v1/red-flags', redFlagController.getAllRedFlags);

///get a specific red-flag incident. DONE!
router.get('/api/v1/red-flags/:redFlagID', validateGetARed, redFlagController.getARedFlag);

//delete a particular red-flag incidents !DONE
router.delete('/api/v1/red-flags/:redFlagID', validateDelete, redFlagController.deleteRedFlag);

//add a location for a specific red-flag incident
router.patch('/api/v1/red-flags/:redFlagID/location', validateEditLocation, redFlagController.updateLocation);

//add a comment for a specific red-flag record
router.patch( '/api/v1/red-flags/:redFlagID/comment', validateEditComment, redFlagController.updateComment);

export default router;