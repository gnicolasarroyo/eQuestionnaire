define('questionCollection', 
	[
	'backbone', 
	'questionModel'
	], function (Backbone, QuestionModel) {
	

	/**
	* Question Collection
	* ===================
	*/
	var QuestionCollection = Backbone.Collection.extend({
		url: '/api/v1/question/',
		model: QuestionModel,
		initialize: function () {
			console.log('questionCollection module loaded.');
		},
		getNextOrder: function () {
			return this.length + 1;
		},
		reorder: function () {
			var i = 1;
			_.each(this.models, function(item){
				item.set({"order": i });
				i++;
			});
		}
	});

	return QuestionCollection;
});