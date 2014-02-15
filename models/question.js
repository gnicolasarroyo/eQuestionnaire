/**
* Load Dependencies
* =================
*/
var mongoose = require('mongoose');


/**
* Question Model Schema
* ==========================
*/
var schema = new mongoose.Schema({
	query: { type: String, required: true },
	question_type: { type: Number, required: true },
	group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' },
	choices: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Choice' }]
});

exports.schema = function () {
	return schema;
};

exports.model = function () {
	return mongoose.model('Question', schema);
};