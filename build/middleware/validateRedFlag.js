'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.validateGetARed = exports.validateEditLocation = exports.validateEditComment = exports.validateDelete = undefined;

var _validator = require('validator');

var _validator2 = _interopRequireDefault(_validator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//validate getting a single red-flag id
function validateGetARed(request, response, next) {
    if (!request.params.redFlagID) {
        return response.json({
            status: 404,
            message: 'You are required to enter a red-flag ID here'
        });
    } else next();
}

//validate location edit
function validateEditLocation(request, response, next) {
    if (!request.params.redFlagID) {
        return response.json({
            status: 404,
            message: 'You need to provide a red-flag id'
        });
    } else if (!_validator2.default.isLatLong(request.body.location)) {
        return response.status(404).json({
            status: 400,
            message: 'The cordinates you entered are not not valid. Use (lat, long)'
        });
    } else next();
}
// validate comment edit
function validateEditComment(request, response, next) {
    if (!request.params.redFlagID) {
        return response.json({
            status: 404,
            message: 'You need to provide a red-flag id'
        });
    } else if (!request.body.comment) {
        return response.json({
            status: 404,
            message: 'You need to provide a comment'
        });
    } else next();
}

//validateDelete
function validateDelete(request, response, next) {
    if (!request.params.redFlagID) {
        return response.json({
            status: 404,
            message: 'You need to provide red-flag id to delete'
        });
    } else next();
}

exports.validateDelete = validateDelete;
exports.validateEditComment = validateEditComment;
exports.validateEditLocation = validateEditLocation;
exports.validateGetARed = validateGetARed;