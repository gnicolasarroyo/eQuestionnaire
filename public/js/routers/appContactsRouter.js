define('appContactsRouter', 
  [
  'backbone',
  'contactModel',
  'contactCollection',
  'contactListModel',
  'contactListCollection'
  ], function (
    Backbone, 
    ContactModel, 
    ContactCollection, 
    ContactListModel, 
    ContactListCollection) {


    /**
    * app Contacts Router
    * ==================
    */
    var appContactsRouter = Backbone.Router.extend({
      routes: {
        "contacts/": "listContact",
        "contacts/new/": "newContact",
        "contacts/:id/edit/": "editContact",
        "contacts/:id/delete/": "deleteContact",
        "contacts/lists/": "listContactList",
        "contacts/lists/new/": "newContactList",
        "contacts/lists/:id/edit/": "editContactList",
        "contacts/lists/:id/delete/": "deleteContactList"
      },
      initialize: function () {
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
        window.appEvents.trigger('sidebar:render',{collection: this.sidebarOptions, active: 'contacts/'});
        console.log('this a contact list');
      },
      newContact: function() {
        window.appEvents.trigger('sidebar:render',{collection: this.sidebarOptions, active: 'contacts/new/'});

        //window.loaderView.open();
        window.appEvents.trigger('loader:show');

        setTimeout(function () {
          //window.loaderView.close();
          window.appEvents.trigger('loader:hide');
        }, 3000);
        console.log('this a contact new');
      },
      editContact: function(id) {
        console.log('this a contact edit ' + id);
      },
      deleteContact: function(id) {
        console.log('this a contact delete ' + id);
      },
      listContactList: function() {
        window.appEvents.trigger('sidebar:render',{collection: this.sidebarOptions, active: 'contacts/lists/'});
        console.log('this a contact list list');
      },
      newContactList: function() {
        window.appEvents.trigger('sidebar:render',{collection: this.sidebarOptions, active: 'contacts/lists/new/'});
        //window.loaderView.open();
        window.appEvents.trigger('loader:show');

        setTimeout(function () {
          //window.loaderView.close();
          window.appEvents.trigger('loader:hide');
        }, 3000);
        console.log('this a contact list new');
      },
      editContactList: function(id) {
        console.log('this a contact list edit ' + id);
      },
      deleteContactList: function(id) {
        console.log('this a contact list delete ' + id);
      }
    });

    return appContactsRouter;
});