define('templateCollection', 
	[
	'backbone', 
	'templateModel'
	], function (Backbone, TemplateModel) {
	

	/**
	* Template Collection
	* ===================
	*/
	var TemplateCollection = Backbone.Collection.extend({
		url: '/api/v1/template/',
		model: TemplateModel,
		initialize: function () {
			console.log('templateCollection module loaded.');
		}
	});

	return TemplateCollection;
});