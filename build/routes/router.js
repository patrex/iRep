'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _redflagcontroller = require('../controllers/redflagcontroller');

var _redflagcontroller2 = _interopRequireDefault(_redflagcontroller);

var _interventionCtrler = require('../controllers/interventionCtrler');

var _interventionCtrler2 = _interopRequireDefault(_interventionCtrler);

var _users = require('../controllers/users');

var _users2 = _interopRequireDefault(_users);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _counts = require('../models/counts');

var _counts2 = _interopRequireDefault(_counts);

var _validateRedFlag = require('../middleware/validateRedFlag');

var _auth = require('../middleware/auth');

var _validateIntervention = require('../middleware/validateIntervention');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//create router


//general middleware
var router = _express2.default.Router({ mergeParams: true });

//red-flag validators


router.get('/', function (request, response) {
	response.sendFile(_path2.default.resolve(__dirname, '../../public/', 'index.html'));
});

router.get('/profile', _auth.isLoggedIn, function (request, response) {
	response.sendFile(_path2.default.resolve(__dirname, '../../public/', 'profile.html'));
});

router.get('/redflags', _auth.isLoggedIn, function (request, response) {
	response.sendFile(_path2.default.resolve(__dirname, '../../public/', 'redflags.html'));
});

router.get('/makered', _auth.isLoggedIn, function (request, response) {
	response.sendFile(_path2.default.resolve(__dirname, '../../public/', 'makered.html'));
});

router.get('/users', _auth.isLoggedIn, function (request, response) {
	response.sendFile(_path2.default.resolve(__dirname, '../../public/', 'users.html'));
});

router.get('/admin', _auth.isLoggedIn, _auth.verifyAdmin, function (request, response) {
	response.sendFile(_path2.default.resolve(__dirname, '../../public/', 'admin.html'));
});

router.get('/interventions', _auth.isLoggedIn, function (request, response) {
	response.sendFile(_path2.default.resolve(__dirname, '../../public/', 'interventions.html'));
});

router.get('/makeint', _auth.isLoggedIn, function (request, response) {
	response.sendFile(_path2.default.resolve(__dirname, '../../public/', 'makeint.html'));
});

//********************** Handle red flag routes*/

//create a red flag record
router.post('/api/v1/red-flags', _auth.isLoggedIn, _auth.verifyToken, _redflagcontroller2.default.createRedFlag);
router.get('/api/v1/red-flags', _auth.isLoggedIn, _auth.verifyToken, _redflagcontroller2.default.getAllRedFlags);
router.get('/api/v1/red-flags/:id', _auth.isLoggedIn, _validateRedFlag.validateOne, _auth.verifyToken, _redflagcontroller2.default.getARedFlag);
router.delete('/api/v1/red-flags/:id', _auth.isLoggedIn, _validateRedFlag.validateOne, _auth.verifyToken, _redflagcontroller2.default.deleteRedFlag);
router.patch('/api/v1/red-flags/:id/location', _auth.isLoggedIn, _auth.verifyToken, _validateRedFlag.validateLocation, _redflagcontroller2.default.updateLocation);
router.patch('/api/v1/red-flags/:id/comment', _auth.isLoggedIn, _auth.verifyToken, _validateRedFlag.validateComments, _redflagcontroller2.default.updateComment);
router.patch('/api/v1/red-flags/:id/status', _auth.isLoggedIn, _auth.verifyAdmin, _auth.verifyToken, _redflagcontroller2.default.updateStatus);

//*******************Handle intervention routes*********************** */

router.get('/api/v1/interventions/', _auth.isLoggedIn, _auth.verifyToken, _interventionCtrler2.default.getAll);
router.get('/api/v1/interventions/:id', _validateIntervention.single, _auth.isLoggedIn, _auth.verifyToken, _interventionCtrler2.default.getOne);
router.post('/api/v1/interventions', _validateIntervention.validateCreate, _auth.isLoggedIn, _auth.verifyToken, _interventionCtrler2.default.create);
router.patch('/api/v1/interventions/:id/status', _auth.verifyAdmin, _auth.verifyToken, _interventionCtrler2.default.updateStatus); //TODO: add logic
router.patch('/api/v1/interventions/:id/location', _auth.isLoggedIn, _validateIntervention.validateLoc, _auth.verifyToken, _interventionCtrler2.default.updateLoc);
router.patch('/api/v1/interventions/:id/comment', _auth.isLoggedIn, _validateIntervention.validateComment, _auth.verifyToken, _interventionCtrler2.default.updateComment);
router.delete('/api/v1/interventions/:id', _auth.isLoggedIn, _validateIntervention.single, _auth.verifyToken, _interventionCtrler2.default.delete);

// *************Handle  signin and sign up routes****************/
router.post('/api/v1/auth/signup', _auth.checkReg, _users2.default.createUser);
router.post('/api/v1/auth/login', _auth.checkLogin, _users2.default.logUserIn);
router.get('/api/v1/auth/logout', _auth.isLoggedIn, _auth.logout);
router.get('/api/v1/count', _counts2.default);

module.exports = router;