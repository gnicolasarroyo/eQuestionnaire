define('contactCollection', 
	[
	'backbone', 
	'contactModel'
	], function (Backbone, ContactModel) {
	

	/**
	* Contact Collection 
	* ==================
	*/
	var ContactCollection = Backbone.Collection.extend({
		url: '/api/v1/contact/',
		model: ContactModel,
		initialize: function () {
			console.log('contactCollection module loaded.');
		}
	});

	return ContactCollection;
});