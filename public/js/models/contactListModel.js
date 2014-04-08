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
		idAttribute: '_id',
		defaults: {
			name: '',
			contacts: []
		},
		initialize: function () {
			this.set({'contacts': new ContactCollection(this.get('contacts'))});

			console.log('contactListModel module loaded.');
		},
		validate: function (attrs) {
			var errors = [];

			if (!attrs.name || attrs.name == '') {
				errors.push({name: 'name', message: 'Debe ingresar un nombre.'});
			}
			if (!attrs.contacts || !attrs.contacts.length > 0) {
				errors.push({name: 'contacts', message: 'Debe seleccionar al menos un contacto.'});
			}
			return errors.length > 0 ? errors : false;
		}
	});

	return ContactListModel;
});