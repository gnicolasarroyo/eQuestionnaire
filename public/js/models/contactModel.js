define('contactModel', 
	[
	'backbone', 
	'groupModel'
	], function (Backbone, GroupModel) {
	
	
	/**
	* Contact Model
	* =============
	*/
	var ContactModel = Backbone.Model.extend({
		urlRoot: '/api/v1/contact/',
		defaults: {
			name: '',
			email: ''
		},
		initialize: function () {
			console.log('contactModel module loaded.');
		},
		validate: function (attrs) {
			var errors = [];

			if (!attrs.name || attrs.name == '') {
				errors.push({name: 'name', message: 'Debe ingresar un nombre.'});
			}
			if (!attrs.email || attrs.email == '') {
				errors.push({name: 'email', message: 'Debe ingresar un correo electrónico.'});
			}

			return errors.length > 0 ? errors : false;
		}
	});

	return ContactModel;
});