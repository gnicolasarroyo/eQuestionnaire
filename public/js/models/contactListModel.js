define('contactListModel', 
	[
	'backbone', 
	'groupModel', 
	'contactCollection'
	], function (Backbone, GroupModel, ContactCollection) {
	
	
	/**
	* Contact List Model
	* ==================
	*/
	var ContactListModel = Backbone.Model.extend({
		urlRoot: '/api/v1/contactlist/',
		defaults: {
			id: 0,
			name: '',
			description: '',
			group: {},
			contacts: []
		},
		initialize: function () {
			this.set({'group': new GroupModel(this.get('group'))});
			this.set({'contacts': new ContactCollection(this.get('contacts'))});

			console.log('contactListModel module loaded.');
		}
	});

	return ContactListModel;
});