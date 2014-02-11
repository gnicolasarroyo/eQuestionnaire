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
        userProfileModel: 'models/userProfileModel',
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
        userProfileCollection: 'collections/userProfileCollection',
        // Routers -->
        appAccountRouter: 'routers/appAccountRouter',
        appContactsRouter: 'routers/appContactsRouter',
        appDashboardRouter: 'routers/appDashboardRouter',
        appGroupRouter: 'routers/appGroupRouter',
        appQuestionnairesRouter: 'routers/appQuestionnairesRouter',
        // Views -->
        sidebarView: 'views/sidebarView'
    }
});


/**
* Initialize Main App
* ===================
*/
require([
    'backbone',
    'appAccountRouter',
    'appContactsRouter',
    'appDashboardRouter',
    'appGroupRouter',
    'appQuestionnairesRouter'
    ], function (
        Backbone, 
        appAccountRouter,
        appContactsRouter,
        appDashboardRouter, 
        appGroupRouter, 
        appQuestionnairesRouter
        ) {
    
    // Initialize routing and start Backbone.history()
    new appAccountRouter();
    new appContactsRouter();
    new appDashboardRouter(); 
    new appGroupRouter(); 
    new appQuestionnairesRouter();

    Backbone.history.start();

});