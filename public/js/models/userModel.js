define('userModel', 
	[
	'backbone'
	], function (Backbone) {


	/**
	* User Model
	* ==========
	*/
	var UserModel = Backbone.Model.extend({
		urlRoot: '/api/v1/user/',
		idAttribute: '_id',
		defaults: {
			username: ''
		},
		initialize: function () {
			console.log('userModel module loaded.');
		}
	});

	return UserModel;
});