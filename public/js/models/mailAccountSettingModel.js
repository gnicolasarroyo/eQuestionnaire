define('mailAccountSettingModel', 
	[
	'backbone', 
	'groupModel'
	], function (Backbone, GroupModel) {
	
	
	/**
	* Mail Account Setting Model
	* ==========================
	*/
	var MailAccountSettingModel = Backbone.Model.extend({
		urlRoot: '/api/v1/mailaccountsetting/',
		defaults: {
			name: '',
			description: '',
			host: '',
			port: 0,
			user: ''
		},
		initialize: function () {
			console.log('mailAccountSetting module loaded.');
		},
		validate: function (attrs) {
		    var errors = [];

		    if (!attrs.name || attrs.name == '') {
		        errors.push({name: 'name', message: 'Debe ingresar un nombre.'});
		    }
		    if (!attrs.description || attrs.description == '') {
		        errors.push({name: 'description', message: 'Debe ingresar una descripción.'});
		    }
		    if (!attrs.host || attrs.host == '') {
		        errors.push({name: 'host', message: 'Debe ingresar el host de servicio.'});
		    }
		    if (!attrs.port || attrs.port == 0) {
		        errors.push({name: 'port', message: 'Debe ingresar el puerto que acompaña a la dirección de host.'});
		    }
		    if (!attrs.user || attrs.user == '') {
		        errors.push({name: 'user', message: 'Debe ingresar un usuario para autenticarse.'});
		    }
		    if (!attrs.password || attrs.password == '') {
		        errors.push({name: 'password', message: 'Debe ingresar un password para autenticarse.'});
		    }
			
		    return errors.length > 0 ? errors : false;
		}
	});

	return MailAccountSettingModel;
});