define('contactListCollection', 
	[
	'backbone', 
	'contactListModel'
	], function (Backbone, ContactListModel) {
	

	/**
	* Contact List Collection
	* =======================
	*/
	var ContactListCollection = Backbone.Collection.extend({
		url: '/api/v1/contactlist/',
		model: ContactListModel,
		initialize: function () {
			console.log('contactListCollection module loaded.');
		}
	});

	return ContactListCollection;
});