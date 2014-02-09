/**
* Load Dependencies
* =================
*/
var mongoose = require('mongoose');


/**
* User Group Model Schema
* ==========================    
*/
var schema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group'}
});

exports.schema = function () {
	return schema;
};

exports.model = function () {
	return mongoose.model('UserGroup', schema);
};