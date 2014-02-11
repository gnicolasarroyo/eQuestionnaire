/**
* Load Dependencies
* =================
*/
var mongoose = require('mongoose');


/**
* Questionnaire Model Schema
* ==========================
*/
var schema = new mongoose.Schema({
	title: { type: String, required: true },
	description: { type: String, required: true },
	creation_date: { type: Date, default: Date.now() },
	last_modified_date: { type: Date, default: Date.now() },
	send_date: { type: Date },
	status: { type: Number, required: true },
	group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' },
	mail_account_setting: { type: mongoose.Schema.Types.ObjectId, ref: 'MailAccountSetting' },
	contacts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Contact' }],
	contact_lists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ContactList' }],
	questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }]
});

exports.schema = function () {
	return schema;
};

exports.model = function () {
	return mongoose.model('Questionnaire', schema);
};
