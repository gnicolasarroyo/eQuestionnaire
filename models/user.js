/**
* Load Dependencies
* =================
*/
var mongoose = require('mongoose');


/**
* User Model Schema
* ==========================
*
* STATUS_VALUES
*   1, 'Incompleta'
*   2, 'Habilitada'
*   3, 'Deshabilitada'
*    
*/
var schema = new mongoose.Schema({
    first_name: { type: String },
    last_name: { type: String },
    email: { type: String },
    salt: { type: String },
    hash: { type: String }, 
    status: { type: Number },
    is_admin_group: { type: Boolean, default: false }
});

exports.schema = function () {
	return schema;
};

exports.model = function () {
	return mongoose.model('User', schema);
};