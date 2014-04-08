/**
* Load Dependencies
* =================
*/
var mongoose = require('mongoose');


/**
* Contact List Model Schema
* ==========================
*/
var schema = new mongoose.Schema({
	name: { type: String, required: true },
	group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' },
	contacts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Contact' }]
});

exports.schema = function () {
	return schema;
};

exports.model = function () {
	return mongoose.model('ContactList', schema);
};