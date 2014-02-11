define('appQuestionnairesRouter', 
  [
  'backbone',
  'questionnaireModel',
  'questionnaireCollection',
  'sidebarView'
  ], function (Backbone, QuestionnaireModel, QuestionnaireCollection, SidebarView) {


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
            {title: 'ENCUESTAS'},
            {url: "questionnaires/", description: "Ver encuestas", active: true},
            {url: "questionnaires/new/", description: "Nueva encuesta"}
          ]
        });
      },
      listQuestionnaire: function() {
        this.sidebar.render('questionnaires/');
        var questionnaires = new QuestionnaireCollection().fetch();
      },
      newQuestionnaire: function() {
        this.sidebar.render('questionnaires/new/');
        var questionnaire = new QuestionnaireModel();

        questionnaire.set({
          title: 'Monitoreo de satisfacción por nuevos cambios OR',
          description: 'Es una encuesta para conocer el grado de conformidad de los clientes con respecto a los cambios en la OR de Posventa',
          status: 1
        });

        questionnaire.save();
      },
      editQuestionnaire: function(id) {
        var questionnaire = new QuestionnaireModel();

        questionnaire.set({
          id: id,
          title: 'Monitoreo de satisfacción por nuevos cambios OR',
          description: 'Es una encuesta para conocer el grado de conformidad de los clientes con respecto a los cambios en la OR de Posventa',
          creation_date: new Date(),
          last_modified_date: new Date(),
          status: 1
        });

        questionnaire.save();
      },
      deleteQuestionnaire: function(id) {
        var questionnaire = new QuestionnaireModel({id: id});

        questionnaire.destroy();
      }
    });

    return appQuestionnairesRouter;
});