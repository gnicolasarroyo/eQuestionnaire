/**
* Load Dependencies
* =================
*/
var mongoose = require('mongoose');


/**
* Group Model Schema
* ==========================
*/
var schema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true }
});

exports.schema = function () {
	return schema;
};

exports.model = function () {
	return mongoose.model('Group', schema);
};