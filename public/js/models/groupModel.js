define('groupModel', 
	[
	'backbone'
	], function (Backbone) {
	
	
	/**
	* Group Model
	* ===========
	*/
	var GroupModel = Backbone.Model.extend({
		urlRoot: '/api/v1/group/',
		defaults: {
			name: '',
			description: ''
		},
		initialize: function () {
			console.log('groupModel module loaded.');
		},
		validate: function (attrs) {
		    var errors = [];

		    if (!attrs.name || attrs.name == '') {
		        errors.push({name: 'name', message: 'Debe ingresar un nombre.'});
		    }
		    if (!attrs.description || attrs.description == '') {
		        errors.push({name: 'description', message: 'Debe ingresar una descripción.'});
		    }

		    return errors.length > 0 ? errors : false;
		}
	});

	return GroupModel;
});