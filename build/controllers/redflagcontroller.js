'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _manageReds = require('../models/manageReds');

var _manageReds2 = _interopRequireDefault(_manageReds);

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RedFlagController = function () {
	function RedFlagController() {
		_classCallCheck(this, RedFlagController);
	}

	_createClass(RedFlagController, [{
		key: 'createRedFlag',
		value: async function createRedFlag(req, res) {
			var Result = void 0;
			var creator = JSON.parse(req.session.user);

			var post = {
				createdBy: creator.usr,
				status: "under-investigation",
				location: "0,0",
				comment: req.body.desc
			};

			Result = await _manageReds2.default.create(post);

			if (Result.rowCount > 0) {
				var string = _querystring2.default.stringify({
					status: 0,
					msg: 'Redflag incident creation successful'
				});
				res.redirect('/redflags?' + string);
			} else {
				var _string = _querystring2.default.stringify({
					status: 1,
					msg: 'Redflag creation failed'
				});
				res.redirect('/redflags?' + _string);

				// res.json({
				// 	status: 500,
				// 	"message": "Post could not be created at this time.",
				// });
			}
		}

		//return all red-flag incidents. DONE!

	}, {
		key: 'getAllRedFlags',
		value: async function getAllRedFlags(req, res) {
			//use map to select only red-flag incidents
			//let redFlagIncidents = incidents.filter( (incident) => incident.type == "red-flag" );
			var Result = await _manageReds2.default.returnAll();

			if (Result.length > 0) {
				// const string = qs.stringify({
				// 	status: 0,
				// 	payload: Result
				// })
				//res.redirect('/redflags?' + string);
				res.json({
					"status": 200,
					Result: Result
				});
			} else {
				var string = _querystring2.default.stringify({
					status: 0,
					msg: 'There\'s no Redflag incident to view'
				});
				res.redirect('/redflags?' + string);
			}
		}

		//get a specific red-flag incident. DONE!

	}, {
		key: 'getARedFlag',
		value: async function getARedFlag(req, res) {
			var id = parseInt(req.params.id, 10);
			var result = undefined;

			// let red_flags = incidents.filter((reds) => reds.type === 'red-flag');
			// if((index = red_flags.findIndex((reds) => reds.id == id)) >= 0){
			// 	data = red_flags[index];
			// 	flag = true;
			// }

			result = await _manageReds2.default.getOne(id);

			if (result.rowCount > 0) {
				res.json({
					"status": 200,
					data: result
				});
			} else {
				res.send({
					"status": 404,
					message: "we could not find a red-flag incident with that id"
				});
			}
		}

		//delete a particular red-flag incidents !DONE

	}, {
		key: 'deleteRedFlag',
		value: async function deleteRedFlag(req, res) {
			var id = req.params.id * 1;
			var Result = void 0;

			// incidents.map((redEvent, position) => {
			// 	if(redEvent.id == id){
			// 		if(incidents.splice(position, 1))	//!
			// 			flag = true;	
			// 	}
			// });

			Result = await _manageReds2.default.delete(id);

			if (Result.rowCount > 0) {
				res.json({
					status: 201,
					message: 'red-flag incident with id [' + id + '] has been deleted'
				});
			} else {
				res.json({
					status: 404,
					message: "Sorry, it appears that there's no red-flag record with your id"
				});
			}
		}

		//add a location for a specific red-flag incident

	}, {
		key: 'updateLocation',
		value: async function updateLocation(req, res) {
			var rID = req.params.id * 1;
			var location = req.body.location;
			var Result = void 0;

			var obj = {
				rID: rID,
				location: location
			};

			Result = await _manageReds2.default.location(obj);

			// for(let incident of incidents){
			// 	if(incident.id == rID){
			// 		incident.location = req.body.location;
			// 		flag = true;
			// 	}	
			// }

			if (Result.rowCount > 0) {
				res.json({
					status: 200,
					message: 'location for red-flag incident with id [' + rID + '] was successfully updated.'
				});
			} else {
				res.json({
					status: 404,
					message: 'Could not set the location for ' + rID
				});
			}
		}

		//add a comment for a specific red-flag record

	}, {
		key: 'updateComment',
		value: async function updateComment(req, res) {
			var rID = req.params.id * 1;
			var comments = req.body.comment;
			var Result = void 0;

			// for(let incident of incidents){
			// 	if(incident.id == rID){
			// 		incident.comment = comments;
			// 		flag = true;
			// 	}	
			// }
			Result = await _manageReds2.default.comment({ rID: rID, comments: comments });

			if (Result.rowCount > 0) {
				res.json({
					status: 200,
					message: 'Comment for red-flag record [' + rID + '] was successfully updated'
				});
			} else {
				res.json({
					status: 404,
					message: 'Could not set comments for ' + rID
				});
			}
		}

		//accessible if admin

	}, {
		key: 'updateStatus',
		value: async function updateStatus(req, res) {
			var id = res.body.id;
			var newStatus = req.body.status;
			var Result = void 0;

			Result = await _manageReds2.default.changeStatus({ id: id, newStatus: newStatus });

			if (Result.rowCount > 0) {
				res.json({
					status: 200,
					message: 'Status for redflag record [' + rID + '] updated'
				});
			} else {
				res.json({
					status: 404,
					message: 'Could not set status for ' + rID
				});
			}
		}
	}]);

	return RedFlagController;
}();

//const redFlagController = new RedFlagController();


module.exports = new RedFlagController();