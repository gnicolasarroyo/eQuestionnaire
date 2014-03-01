define('choiceModel', 
	[
	'backbone'
	], function (Backbone) {
	
	
	/**
	* Choice Model
	* ============
	*/
	var ChoiceModel = Backbone.Model.extend({
		urlRoot: '/api/v1/choice/',
		idAttribute: '_id',
		defaults: {
			description: ''
		},
		initialize: function () {
			console.log('choiceModel module loaded.');
		}
	});

	return ChoiceModel;
});