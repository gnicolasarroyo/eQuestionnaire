define('appContactsRouter', 
  [
  'backbone',
  'contactModel',
  'contactCollection',
  'contactListModel',
  'contactListCollection',
  'sidebarView',
  ], function (
    Backbone, 
    ContactModel, 
    ContactCollection, 
    ContactListModel, 
    ContactListCollection, 
    SidebarView) {


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
        this.sidebar = new SidebarView({
          collection: [
            {title: 'CONTACTOS'},
            {url: "contacts/", description: "Ver contactos", active: true},
            {url: "contacts/new/", description: "Nuevo contacto"},
            {title: 'LISTAS DE CONTACTOS'},
            {url: "contacts/lists/", description: "Ver listas de contactos"},
            {url: "contacts/lists/new/", description: "Nueva lista de contactos"}
          ]
        });
      },
      listContact: function() {
        this.sidebar.render('contacts/');
        console.log('this a contact list');
      },
      newContact: function() {
        this.sidebar.render('contacts/new/');
        console.log('this a contact new');
      },
      editContact: function(id) {
        console.log('this a contact edit ' + id);
      },
      deleteContact: function(id) {
        console.log('this a contact delete ' + id);
      },
      listContactList: function() {
        this.sidebar.render('contacts/lists/');
        console.log('this a contact list list');
      },
      newContactList: function() {
        this.sidebar.render('contacts/lists/new/');
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