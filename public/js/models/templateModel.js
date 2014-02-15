define('templateModel', 
	[
	'backbone', 
	'groupModel', 
	'questionCollection'
	], function (Backbone, GroupModel, QuestionCollection) {
	

	/**
	* Template Model
	* ==============
	*/
	var TemplateModel = Backbone.Model.extend({
		urlRoot: '/api/v1/template/',
		defaults: {
			title: '',
			description: '',
			questions: []
		},
		initialize: function () {
			this.set({'questions': new QuestionCollection(this.get(questions))});

			console.log('templateModel module loaded.');
		}
	});

	return TemplateModel;
});