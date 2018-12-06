var express = require('express');
var controller = require('../controllers/controller');

const router = express.Router();

//create a red flag record
router.post('/api/v1/red-flags', controller.createRedFlag);

//router.get('/api/v1/users', controller.getAllUsers);

//return all red-flag incidents. DONE!
router.get('/api/v1/red-flags', controller.getAllRedFlags);

///get a specific red-flag incident. DONE!
router.get('/api/v1/red-flags/:redFlagID',  controller.getARedFlag);

//delete a particular red-flag incidents !DONE
router.delete('/api/v1/red-flags/:redFlagID', controller.deleteRedFlag);

//add a location for a specific red-flag incident
router.patch('/api/v1/red-flags/:redFlagID/:location', controller.updateLocation);

//add a comment for a specific red-flag record
router.patch( '/api/v1/red-flags/:redFlagID/:comment', controller.updateComment);

export {router}