import express from 'express';
import redFlagController from '../controllers/redflagcontroller';

const router = express.Router();
console.dir(redFlagController);
//create a red flag record
router.post('/api/v1/red-flags', redFlagController.createRedFlag);

//router.get('/api/v1/users', controller.getAllUsers);

//return all red-flag incidents. DONE!
router.get('/api/v1/red-flags', redFlagController.getAllRedFlags);

///get a specific red-flag incident. DONE!
router.get('/api/v1/red-flags/:redFlagID',  redFlagController.getARedFlag);

//delete a particular red-flag incidents !DONE
router.delete('/api/v1/red-flags/:redFlagID', redFlagController.deleteRedFlag);

//add a location for a specific red-flag incident
router.patch('/api/v1/red-flags/:redFlagID/location', redFlagController.updateLocation);

//add a comment for a specific red-flag record
router.patch( '/api/v1/red-flags/:redFlagID/comment', redFlagController.updateComment);

export default router;