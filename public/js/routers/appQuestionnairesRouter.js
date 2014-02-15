define('appQuestionnairesRouter', 
	[
	'backbone',
	'questionnaireModel',
	'questionnaireCollection',
	'sidebarView'
	], function (
		Backbone, 
		QuestionnaireModel, 
		QuestionnaireCollection, 
		SidebarView) {


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
				this.sidebar = new SidebarView({
					collection: [
						{ title: 'ENCUESTAS' },
						{ url: "questionnaires/", description: "Ver encuestas", active: true },
						{ url: "questionnaires/new/", description: "Nueva encuesta" }
					]
				});
			},
			listQuestionnaire: function() {
				this.sidebar.render('questionnaires/');
				console.log('this a questionnaire list');
			},
			newQuestionnaire: function() {        
				this.sidebar.render('questionnaires/new/');	
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