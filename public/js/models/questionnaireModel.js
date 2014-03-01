define('questionnaireModel', 
	[
	'backbone', 
	'groupModel', 
	'mailAccountSettingModel', 
	'contactCollection',
	'contactListCollection', 
	'questionCollection'
	], function (Backbone, GroupModel, MailAccountSettingModel, ContactCollection, ContactListCollection, QuestionCollection) {
	

	/**
	* Questionnaire Model
	* ===================
	*/
	var QuestionnaireModel = Backbone.Model.extend({
		urlRoot: '/api/v1/questionnaire/',
		idAttribute: '_id',
		defaults: {
			title: '',
			description: '',
			creation_date: '',
			last_modified_date: '',
			send_date: '',
			status: 1,
			//mail_account_setting: {},
			//contacts: [],
			//contact_lists: [],
			questions: []
		},
		initialize: function () {
			//this.set({'mail_account_setting': new MailAccountSettingModel(this.get('mail_account_setting'))});
			//this.set({'contacts': new ContactCollection(this.get('contacts'))});
			//this.set({'contact_lists': new ContactListCollection(this.get('contact_lists'))});
			this.set({'questions': new QuestionCollection(this.get('questions'))});

			console.log('questionnaireModel module loaded.');
		},
		validate: function (attrs) {
			var errors = [];

			if (!attrs.title || attrs.title == '') {
				errors.push({name: 'title', message: 'Debe ingresar un titulo.'});
			}
			if (!attrs.description || attrs.description == '') {
				errors.push({name: 'description', message: 'Debe ingresar una descripción.'});
			}
			/*
			if (!attrs.status == 2) {
				if (!attrs.lengh || attrs.description == '') {
					errors.push({name: '', message: ''});
				}
				if (!attrs.mail_account_setting || attrs.description == '') {
					errors.push({name: '', message: ''});
				}
				if (!attrs.description || attrs.description == '') {
					errors.push({name: '', message: ''});
				}
				if (!attrs.description || attrs.description == '') {
					errors.push({name: '', message: ''});
				}
			}
			*/
			
			return errors.length > 0 ? errors : false;
		}
	});

	return QuestionnaireModel;
});