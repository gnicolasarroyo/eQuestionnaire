/**
* Load Dependencies
* =================
*/
var mongoose = require('mongoose');


/**
* Contact Model Schema
* ==========================
*/
var schema = new mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true },
	group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' }
});

exports.schema = function () {
	return schema;
};

exports.model = function () {
	return mongoose.model('Contact', schema);
};