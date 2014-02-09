define('groupCollection', 
	[
	'backbone', 
	'groupModel'
	], function (Backbone, GroupModel) {
	

	/**
	* Group Collection
	* ================
	*/
	var GroupCollection = Backbone.Collection.extend({
		url: '/api/v1/group/',
		model: GroupModel,
		initialize: function () {
			console.log('groupCollection module loaded.');
		}
	});

	return GroupCollection;
});