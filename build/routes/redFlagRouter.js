'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _redflagcontroller = require('../controllers/redflagcontroller');

var _redflagcontroller2 = _interopRequireDefault(_redflagcontroller);

var _validateRedFlag = require('../middleware/validateRedFlag');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router({ mergeParams: true });

router.get('/', function (request, response) {
	document.writeln("Hello, world");
});

//create a red flag record
router.post('/api/v1/red-flags', _redflagcontroller2.default.createRedFlag);

//return all red-flag incidents. DONE!
router.get('/api/v1/red-flags', _redflagcontroller2.default.getAllRedFlags);

///get a specific red-flag incident. DONE!
router.get('/api/v1/red-flags/:redFlagID', _validateRedFlag.validateGetARed, _redflagcontroller2.default.getARedFlag);

//delete a particular red-flag incidents !DONE
router.delete('/api/v1/red-flags/:redFlagID', _validateRedFlag.validateDelete, _redflagcontroller2.default.deleteRedFlag);

//add a location for a specific red-flag incident
router.patch('/api/v1/red-flags/:redFlagID/location', _validateRedFlag.validateEditLocation, _redflagcontroller2.default.updateLocation);

//add a comment for a specific red-flag record
router.patch('/api/v1/red-flags/:redFlagID/comment', _validateRedFlag.validateEditComment, _redflagcontroller2.default.updateComment);

exports.default = router;