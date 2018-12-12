"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _incidents = require("../models/incidents.js");

var _incidents2 = _interopRequireDefault(_incidents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RedFlagController = function () {
	function RedFlagController() {
		_classCallCheck(this, RedFlagController);
	}

	_createClass(RedFlagController, [{
		key: "createRedFlag",
		value: function createRedFlag(req, res) {
			var id = _incidents2.default.length + 1;
			var date = new Date();
			var flag = false;

			var post = {
				id: id,
				createdBy: "",
				createdOn: date,
				type: "red-flag",
				"status": "draft",
				"location": "",
				images: []
			};

			if (_incidents2.default.push(post)) {
				flag = true;
			}

			if (flag) {
				res.status(200).json({
					"status": 201,
					id: id,
					post: post,
					message: "Created red-flag record"
				});
			} else {
				res.json({
					status: 500,
					"message": "Post could not be created at this time."
				});
			}
		}

		//return all red-flag incidents. DONE!

	}, {
		key: "getAllRedFlags",
		value: function getAllRedFlags(req, res) {
			//use map to select only red-flag incidents
			var redFlagIncidents = _incidents2.default.filter(function (incident) {
				return incident.type == "red-flag";
			});

			if (redFlagIncidents.length > 0) {
				res.json({
					"status": 200,
					"data": redFlagIncidents
				});
			} else {
				res.json({
					"status": 404,
					"message": "No red-flag incidents found"
				});
			}
		}

		//get a specific red-flag incident. DONE!

	}, {
		key: "getARedFlag",
		value: function getARedFlag(req, res) {
			var redFlagId = parseInt(req.params.redFlagID, 10);
			var flag = false;
			var data = null;

			_incidents2.default.map(function (redIncident) {
				if (redIncident.id == redFlagId) {
					flag = true;
					data = redIncident;
				}
			});

			if (flag) {
				res.json({
					"status": 200,
					data: data
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
		key: "deleteRedFlag",
		value: function deleteRedFlag(req, res) {
			var id = req.params.redFlagID * 1;
			var flag = false;

			_incidents2.default.map(function (redEvent, position) {
				if (redEvent.id == id) {
					if (_incidents2.default.splice(position, 1)) //!
						flag = true;
				}
			});

			if (flag) {
				res.json({
					status: 201,
					message: "red-flag incident with id [" + id + "] was successfully deleted"
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
		key: "updateLocation",
		value: function updateLocation(req, res) {
			var flag = false;
			var rID = req.params.redFlagID * 1;
			var location = undefined;

			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = _incidents2.default[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var incident = _step.value;

					if (incident.id == rID) {
						incident.location = req.body.location;
						flag = true;
					}
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}

			if (flag) {
				res.json({
					status: 200,
					message: "location for red-flag incident with id [" + rID + "] was successfully updated."
				});
			} else {
				res.json({
					status: 404,
					message: "Could not set the location for " + rID
				});
			}
		}

		//add a comment for a specific red-flag record

	}, {
		key: "updateComment",
		value: function updateComment(req, res) {
			var rID = req.params.redFlagID * 1;
			var comments = req.body.comment;
			var flag = false;

			var _iteratorNormalCompletion2 = true;
			var _didIteratorError2 = false;
			var _iteratorError2 = undefined;

			try {
				for (var _iterator2 = _incidents2.default[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
					var incident = _step2.value;

					if (incident.id == rID) {
						incident.comment = comments;
						flag = true;
					}
				}
			} catch (err) {
				_didIteratorError2 = true;
				_iteratorError2 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion2 && _iterator2.return) {
						_iterator2.return();
					}
				} finally {
					if (_didIteratorError2) {
						throw _iteratorError2;
					}
				}
			}

			if (flag) {
				res.json({
					status: 200,
					message: "Comment for red-flag record [" + rID + "] was successfully updated"
				});
			} else {
				res.json({
					status: 404,
					message: "Could not set comments for " + rID
				});
			}
		}
	}]);

	return RedFlagController;
}();

//const redFlagController = new RedFlagController();


exports.default = new RedFlagController();