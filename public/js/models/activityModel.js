define('activityModel', 
	[
	'backbone', 
	'groupModel', 
	'userModel'
	], function (Backbone, GroupModel, UserModel) {
	
	
	/**
	* Activity Model
	* ==============
	*/
	var ActivityModel = Backbone.Model.extend({
		urlRoot: '/api/v1/activity/',
		defaults: {
			datetime: '',
			description: '',
			group: {},
			user: {}
		},
		initialize: function () {
			this.set({'group': new GroupModel(this.get('group'))});
			this.set({'user': new UserModel(this.get('user'))});
			
			console.log('activityModel module loaded.');
		}
	});

	return ActivityModel;
});