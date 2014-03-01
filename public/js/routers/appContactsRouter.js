define('appContactsRouter', 
  [
  'backbone',
  'contactModel',
  'contactCollection',
  'contactListModel',
  'contactListCollection',
  //'contactFormView',
  'contactListMasterView'
  ], function (
    Backbone, 
    ContactModel, 
    ContactCollection, 
    ContactListModel, 
    ContactListCollection,
    //ContactFormView,
    ContactListMasterView) {


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
        this.loadView('contacts/', function () { return new ContactListMasterView({ collection: new ContactCollection() }); });
        console.log('this a contact list');
      },
      newContact: function() {
        //this.loadView('contacts/new/', function () {return new ContactFormView({ model: new ContactModel() }); });
        console.log('new contact');
      },
      newContactReload: function () {
        this.navigate("contacts/new/", {trigger: true, replace: true});
      },
      editContact: function(id) {
        this.loadView('', function () {return new ContactFormView({ model: new ContactModel({ _id: id }) }); });
      },
      editContactReload: function(id) {
        this.navigate("contacts/"+id+"/edit/", {trigger: true, replace: true});
      },
      deleteContact: function(id) {
        this.loadView('', {});        
        console.log('this a contact delete ' + id);
      },
      listContactList: function() {
        this.loadView('contacts/lists/', function () { return new ContactListMasterView({ collection: new ContactCollection() }); });
        console.log('this a contact list list');
      },
      newContactList: function() {
        this.loadView('contacts/lists/new/', {});
        console.log('this a contact list new');
      },
      editContactList: function(id) {
        this.loadView('', {});
        console.log('this a contact list edit ' + id);
      },
      deleteContactList: function(id) {
        this.loadView('', {});
        console.log('this a contact list delete ' + id);
      },
      loadView: function (active, view) {
        window.appEvents.trigger('sidebar:render',{ collection: this.sidebarOptions, active: (active ? active : '') });
        
        if (typeof this.view === 'object') this.view.remove(); 
        this.view = view();
        $('#content').html(this.view.render().el);
        
        /*
        this.view && (this.view.close ? this.view.close() : this.view.remove());

        if (typeof view === 'function') {
          if ($('#content').length !== 0) $('<div id="content"></div>').insertAfter('#notifier');this.view = view();
        }
        */ 
      }
    });

    return appContactsRouter;
});