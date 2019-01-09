"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _manageInts = require("../models/manageInts");

var _manageInts2 = _interopRequireDefault(_manageInts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//import user from '../models/manageUsers';

var InterventionCtrlr = function () {
	function InterventionCtrlr() {
		_classCallCheck(this, InterventionCtrlr);
	}

	_createClass(InterventionCtrlr, [{
		key: "getOne",
		value: async function getOne(request, response) {
			var id = request.params.id * 1;
			var data = null;

			data = await _manageInts2.default.getOne(id);

			if (data.length > 0) {
				response.status(200).json({
					"status": 200,
					data: data
				});
			} else {
				response.status(404).send({
					"status": 404,
					message: "No intervention incident with that id"
				});
			}
		}
	}, {
		key: "getAll",
		value: async function getAll(request, response) {
			var interventions = await _manageInts2.default.returnAll();

			if (interventions.length > 0) {
				response.status(200).json({
					status: 200,
					data: interventions
				});
			} else {
				response.status(404).json({
					status: 404,
					message: "No intervention incidents found"
				});
			}
		}
	}, {
		key: "create",
		value: async function create(request, response) {
			var Result = void 0;

			Result = await _manageInts2.default.create({
				createdBy: request.session.usr,
				status: 'draft',
				location: '0,0',
				comment: request.body.desc
			});

			if (Result.rowCount > 0) {
				res.status(200).json({
					status: 200,
					data: Result.rows
				});
			} else {
				var string = qs.stringify({
					status: 1,
					msg: 'Redflag creation failed'
				});
				res.redirect('/redflags?' + string);

				// res.json({
				// 	status: 500,
				// 	"message": "Post could not be created at this time.",
				// });
			}
		}
	}, {
		key: "updateLoc",
		value: async function updateLoc(request, response) {
			var rID = request.params.id * 1;
			var location = request.body.location;
			var result = void 0;

			var obj = {
				rID: rID,
				location: location
			};

			result = await _manageInts2.default.location(obj);

			// let interventionList = incidents.filter((incident) => incident.type === 'intervention');
			// if((index = interventionList.findIndex((match) => match.id == rID)) >= 0){	//find a match
			// 	if(interventionList[index].location = request.body.location);
			// 		flag = true;
			// }

			if (result.rowCount > 0) {
				response.json({
					status: 200,
					message: "location for red-flag incident with id [" + rID + "] updated."
				});
			} else {
				response.json({
					status: 404,
					message: "Could not set the location for " + rID
				});
			}
		}
	}, {
		key: "updateComment",
		value: async function updateComment(request, response) {
			var rID = request.params.id * 1;
			var comments = request.body.comment;
			var result = void 0;

			var obj = {
				rID: rID,
				comments: comments
			};

			result = await _manageInts2.default.comment(obj);

			// let interventionList = incidents.filter((incident) => incident.type === 'intervention');
			// if((index = interventionList.findIndex((match) => match.id == rID)) >= 0){	//find a match
			// 	if(interventionList[index].comment = comments);
			// 		flag = true;
			// }

			if (result.rowCount > 0) {
				response.json({
					status: 200,
					message: "Comment for intervention record [" + rID + "] updated"
				});
			} else {
				response.json({
					status: 404,
					message: "Could not set comments for " + rID
				});
			}
		}

		//accessible if admin

	}, {
		key: "updateStatus",
		value: async function updateStatus(request, response) {
			var id = request.body.id;
			var newStatus = request.body.status;
			var Result = void 0;

			Result = await _manageInts2.default.changeStatus({ id: id, newStatus: newStatus });

			if (Result.rowCount > 0) {
				response.json({
					status: 200,
					message: "Status for intervention record [" + rID + "] updated"
				});
			} else {
				response.json({
					status: 404,
					message: "Could not set status for " + rID
				});
			}
		}
	}, {
		key: "delete",
		value: async function _delete(request, response) {
			var id = request.params.id * 1;
			var result = void 0;

			result = await _manageInts2.default.delete(id);

			// incidents.map((intervention, position) => {
			// 	if(intervention.id == id){
			// 		if(incidents.splice(position, 1))	//!
			// 			flag = true;	
			// 	}
			// });

			if (result.rowCount > 0) {
				response.status(200).json({
					status: 200,
					message: "Intervention incident with id [" + id + "] deleted"
				});
			} else {
				response.status(404).json({
					status: 404,
					message: "No intervemtion record with that id"
				});
			}
		}
	}]);

	return InterventionCtrlr;
}();

module.exports = new InterventionCtrlr();
