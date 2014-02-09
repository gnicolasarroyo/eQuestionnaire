define('activityCollection', 
	[
	'backbone', 
	'activityModel'
	], function (Backbone, ActivityModel) {
	

	/**
	* Activity Collection
	* ===================
	*/
	var ActivityCollection = Backbone.Collection.extend({
		url: '/api/v1/activity/',
		model: ActivityModel,
		initialize: function () {
			console.log('activityCollection module loaded.');
		}
	});

	return ActivityCollection;
});