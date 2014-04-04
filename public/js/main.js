'use strict';


/**
* Configure Require
* =================
*/
require.config({
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        }
    },
    paths: {
        // libs -->
        jquery: 'libs/jquery-1.10.2.min',
        underscore: 'libs/underscore-min',
        backbone: 'libs/backbone-min',
        text: 'libs/require-plugin-text',
        i18n: 'libs/require-plugin-i18n',
        eQuestionnaire_extra: 'libs/eQuestionnaire.extra',
        select2: 'libs/select2',
        // Models -->
        activityModel: 'models/activityModel',
        choiceModel: 'models/choiceModel',
        contactListModel: 'models/contactListModel',
        contactModel: 'models/contactModel',
        groupModel: 'models/groupModel',
        mailAccountSettingModel: 'models/mailAccountSettingModel',
        questionModel: 'models/questionModel',
        questionnaireModel: 'models/questionnaireModel',
        templateModel: 'models/templateModel',
        userModel: 'models/userModel',
        // Collections -->
        activityCollection: 'collections/activityCollection',
        choiceCollection: 'collections/choiceCollection',
        contactListCollection: 'collections/contactListCollection',
        contactCollection: 'collections/contactCollection',
        groupCollection: 'collections/groupCollection',
        mailAccountSettingCollection: 'collections/mailAccountSettingCollection',
        questionCollection: 'collections/questionCollection',
        questionnaireCollection: 'collections/questionnaireCollection',
        templateCollection: 'collections/templateCollection',
        userCollection: 'collections/userCollection',
        // Routers -->
        appAccountRouter: 'routers/appAccountRouter',
        appContactsRouter: 'routers/appContactsRouter',
        appDashboardRouter: 'routers/appDashboardRouter',
        appGroupRouter: 'routers/appGroupRouter',
        appQuestionnairesRouter: 'routers/appQuestionnairesRouter',
        // Views -->
        sidebarView: 'views/sidebarView',
        loaderView: 'views/loaderView',
        notifierView: 'views/notifierView',
        contactListMasterView: 'views/contact/contactListMasterView',
        contactListView: 'views/contact/contactListView',
        contactSearchView: 'views/contact/contactSearchView',
        contactNewView: 'views/contact/contactNewView',
        contactEditView: 'views/contact/contactEditView',
        contactDeleteView: 'views/contact/contactDeleteView',
        contactListNewView: 'views/contactList/contactListNewView',
        // Applcation -->
        application: 'application'
    }
});


/**
* Initialize Main App
* ===================
*/
require(['application'], function (app) {
    // Initialize
    window.equestionnaire = app.initialize();
});