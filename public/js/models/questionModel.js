define('questionModel', 
	[
	'backbone', 
	'groupModel', 
	'choiceCollection'
	], function (Backbone, GroupModel, ChoiceCollection) {
	
	
	/**
	* Question Model
	* ==============
	*/
	var QuestionModel = Backbone.Model.extend({
		urlRoot: '/api/v1/question/',
		idAttribute: '_id',
		defaults: {
			query: '',
			question_type: 0,
			order: 0,
			choices: []
		},
		initialize: function () {
			this.set({'choices': new ChoiceCollection(this.get('choices'))});
				
			console.log('questionModel module loaded.');
		}
	});

	return QuestionModel;
});