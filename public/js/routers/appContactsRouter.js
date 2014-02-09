define('appContactsRouter', 
  [
  'backbone',
  'contactModel',
  'contactCollection',
  'contactListModel',
  'contactListCollection'
  ], function (Backbone) {


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
      listContact: function() {
        console.log('this a contact list');
      },
      newContact: function() {
        console.log('this a contact new');
      },
      editContact: function(id) {
        console.log('this a contact edit ' + id);
      },
      deleteContact: function(id) {
        console.log('this a contact delete ' + id);
      },
      listContactList: function() {
        console.log('this a contact list list');
      },
      newContactList: function() {
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