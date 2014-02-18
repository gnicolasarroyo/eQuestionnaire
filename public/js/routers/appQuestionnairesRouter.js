define('appQuestionnairesRouter', 
	[
	'backbone',
	'questionnaireModel',
	'questionnaireCollection'
	], function (
		Backbone, 
		QuestionnaireModel, 
		QuestionnaireCollection) {


		/**
		* app Questionnaires Router
		* =========================
		*/
		var appQuestionnairesRouter = Backbone.Router.extend({
			routes: {
				"questionnaires/": "listQuestionnaire",
				"questionnaires/new/": "newQuestionnaire",
				"questionnaires/:id/edit/": "editQuestionnaire",
				"questionnaires/:id/delete/": "deleteQuestionnaire"
			},
			initialize: function () {
				this.sidebarOptions = [
						{ title: 'ENCUESTAS' },
						{ url: "questionnaires/", description: "Ver encuestas"},
						{ url: "questionnaires/new/", description: "Nueva encuesta" }
					];
			},
			listQuestionnaire: function() {
				window.appEvents.trigger('sidebar:render',{collection: this.sidebarOptions, active: 'questionnaires/'});
				console.log('this a questionnaire list');
			},
			newQuestionnaire: function() {        
				window.appEvents.trigger('sidebar:render',{collection: this.sidebarOptions, active: 'questionnaires/new/'});	
				console.log('this a questionnaire new');
			},
			editQuestionnaire: function(id) {
				console.log('this a questionnaire edit ' + id);
			},
			deleteQuestionnaire: function(id) {
				console.log('this a questionnaire delete ' + id);
			}
		});

		return appQuestionnairesRouter;
});