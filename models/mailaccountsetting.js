/**
* Load Dependencies
* =================
*/
var mongoose = require('mongoose');


/**
* Mail Account Setting Model Schema
* ==========================
*/
var schema = new mongoose.Schema({
	title: { type: String, required: true },
	description: { type: String, required: true },
	host: { type: String, required: true },
	port: { type: Number, required: true },
	user: { type: String, required: true },
	group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' }
});

exports.schema = function () {
	return schema;
};

exports.model = function () {
	return mongoose.model('MailAccountSetting', schema);
};
