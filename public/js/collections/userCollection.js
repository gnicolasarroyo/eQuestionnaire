define('userCollection', 
	[
	'backbone', 
	'userModel'
	], function (Backbone, UserModel) {
	

	/**
	* User Collection
	* ===============
	*/
	var UserCollection = Backbone.Collection.extend({
		url: '/api/v1/user/',
		model: UserModel,
		initialize: function () {
			console.log('userCollection module loaded.');
		}
	});

	return UserCollection;
});