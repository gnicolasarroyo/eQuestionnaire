define('userProfileCollection', 
	[
	'backbone', 
	'userProfileModel'
	], function (Backbone, UserProfileModel) {
	

	/**
	* User Profile Collection
	* =======================
	*/
	var UserProfileCollection = Backbone.Collection.extend({
		url: '/api/v1/userprofile/',
		model: UserProfileModel,
		initialize: function () {
			console.log('userProfileCollection module loaded.');
		}
	});

	return UserProfileCollection;
});