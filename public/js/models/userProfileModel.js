define('userProfileModel', 
	[
	'backbone', 
	'userModel', 
	'groupModel'
	], function (Backbone, UserModel, GroupModel) {
	

	/**
	* User Profile Model
	* ==================
	*/
	var UserProfileModel = Backbone.Model.extend({
		urlRoot: '/api/v1/userprofile/',
		defaults: {
			status: 0,
			is_admin_group: false,
			group: {},
			user: {}
		},
		initialized: function () {
			this.set({'group': new GroupModel(this.get('group'))});
			this.set({'user': new UserModel(this.get('user'))});

			console.log('userProfileModel module loaded.');
		}
	});

	return UserProfileModel;
});