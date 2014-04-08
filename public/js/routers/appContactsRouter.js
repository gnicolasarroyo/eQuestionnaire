define('appContactsRouter', 
  [
  'backbone',
  'contactListMasterView',
  'contactNewView',
  'contactEditView',
  'contactDeleteView',
  'contactListNewView',
  'contactListEditView',
  'contactListListMasterView'
  ], function (
    Backbone,
    ContactListMasterView,
    ContactNewView,
    ContactEditView,
    ContactDeleteView,
    ContactListNewView, 
    ContactListEditView,
    ContactListListMasterView) {


    /**
    * app Contacts Router
    * ==================
    */
    var appContactsRouter = Backbone.Router.extend({
        routes: {
            "contacts/": "listContact",
            "contacts/new/": "newContact",
            "contacts/new/reload/": "newContactReload",
            "contacts/:id/edit/": "editContact",
            "contacts/:id/edit/reload/": "editContactReload",
            "contacts/:id/delete/": "deleteContact",
            "contacts/lists/": "listContactList",
            "contacts/lists/new/": "newContactList",
            "contacts/lists/new/reload/": "newContactListReload",
            "contacts/lists/:id/edit/": "editContactList",
            "contacts/lists/:id/edit/reload/": "editContactListReload",
            "contacts/lists/:id/delete/": "deleteContactList"
        },
        initialize: function (options) {
            this.events = options.events;
            this.sidebarOptions = [
                {title: 'CONTACTOS'},
                {url: "contacts/", description: "Ver contactos"},
                {url: "contacts/new/", description: "Nuevo contacto"},
                {title: 'LISTAS DE CONTACTOS'},
                {url: "contacts/lists/", description: "Ver listas de contactos"},
                {url: "contacts/lists/new/", description: "Nueva lista de contactos"}
            ];
        },
        listContact: function() {
            /**
             * listContact
             */
            this.loadView({
                active: 'contacts/',
                view: ContactListMasterView,
                options: undefined
            });
        },
        newContact: function() {
            /**
             * newContact
             */
            this.loadView({
                active: 'contacts/new/',
                view: ContactNewView,
                options: undefined
            });
        },
        newContactReload: function () {
            /**
             * newContactReload
             */
            this.navigate("contacts/new/", {trigger: true, replace: true});
        },
        editContact: function(id) {
            /**
             * editContact
             */
            this.loadView({
                active: '',
                view: ContactEditView,
                options: { _id: id }
            });
        },
        editContactReload: function(id) {
            /**
             * editContactReload
             */
            this.navigate("contacts/"+id+"/edit/", {trigger: true, replace: true});
        },
        deleteContact: function(id) {
            /**
             * deleteContact
             */
            this.loadView({
                active: '',
                view: ContactDeleteView,
                options: { _id: id }
            });
        },
        listContactList: function() {
            /**
             * listContactList
             */
            this.loadView({
                active: 'contacts/lists/',
                view: ContactListListMasterView,
                options: undefined
            });
        },
        newContactList: function() {
            /**
             * listContactList
             */
            this.loadView({
                active: 'contacts/lists/new/',
                view: ContactListNewView,
                options: undefined
            });
        },
        newContactListReload: function () {
            /**
             * newContactListReload
             */
            this.navigate("contacts/lists/new/", {trigger: true, replace: true});
        },
        editContactList: function(id) {
            /**
             * editContactList
             */
            this.loadView({
                active: '',
                view: ContactListEditView,
                options: { _id: id }
            });
        },
        editContactListReload: function (id) {
            /**
             * editContactListReload
             */
            this.navigate("contacts/lists/"+id+"/edit/", {trigger: true, replace: true});
        },
        deleteContactList: function(id) {
            /**
             * deleteContactList
             */
            this.loadView({
                active: '',
                view: ContactListMasterView,
                options: { _id: id }
            });
        },
        loadView: function (data) {
            /**
             * loadView
             * @param <Object> data
             */
            this.events.trigger(
                'sidebar:render', 
                { 
                    collection: this.sidebarOptions, 
                    active: data.active
                }
            );

            this.events.trigger(
                'content:render', 
                {
                    view: data.view, 
                    options: data.options
                }
            );
        }
    });

    return appContactsRouter;
});