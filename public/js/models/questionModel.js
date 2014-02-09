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
		defaults: {
			query: '',
			question_type: 0,
			group: {},
			order: 0,
			choices: []
		},
		initialize: function () {
			this.set({'group': new GroupModel(this.get('group'))});
			this.set({'choices': new ChoiceCollection(this.get('choices'))});
				
			console.log('questionModel module loaded.');
		}
	});

	return QuestionModel;
});