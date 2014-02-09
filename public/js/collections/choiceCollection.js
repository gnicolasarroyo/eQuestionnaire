define('choiceCollection',
	[
	'backbone', 
	'choiceModel'
	], function (Backbone, ChoiceModel) {
	

	/**
	* Choice Collection
	* =================
	*/
	var ChoiceCollection = Backbone.Collection.extend({
		url: '/api/v1/choice/',
		model: ChoiceModel,
		initialize: function () {
			console.log('choiceCollection module loaded.');
		}
	});

	return ChoiceCollection;
});