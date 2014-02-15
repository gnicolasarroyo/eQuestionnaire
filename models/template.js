/**
* Load Dependencies
* =================
*/
var mongoose = require('mongoose');


/**
* Template Model Schema
* ==========================
*/
var schema = new mongoose.Schema({
	title: { type: String, required: true },
	description: { type: String, required: true },
	group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' },
	questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }]
});

exports.schema = function () {
	return schema;
};

exports.model = function () {
	return mongoose.model('Template', schema);
};
