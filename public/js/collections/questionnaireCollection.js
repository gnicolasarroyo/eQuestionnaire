define('questionnaireCollection', 
	[
	'backbone', 
	'questionnaireModel'
	], function (Backbone, QuestionnaireModel) {
	

	/**
	* Questionnaire Collection
	* ========================
	*/
	var QuestionnaireCollection = Backbone.Collection.extend({
		url: '/api/v1/questionnaire/',
		model: QuestionnaireModel,
		initialize: function () {
			console.log('questionnaireCollection module loaded.');
		}
	});

	return QuestionnaireCollection;
});