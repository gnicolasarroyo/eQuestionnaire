define('appGroupRouter', 
  [
  'backbone',
  'groupModel',
  'userModel',
  'userCollection',
  'mailAccountSettingModel',
  'mailAccountSettingCollection'
  ], function (Backbone) {


    /**
    * app Group Router
    * ==================
    */
    var appGroupRouter = Backbone.Router.extend({
      routes: {
        "group/": "detailGroup",
        "group/user/:id/accept-subscription/": "acceptUserSubscription",
        "group/user/:id/reject-subscription/": "rejectUserSubscription",
        "group/mail-account-settings/": "listMailAccountSetting",
        "group/mail-account-settings/new/": "newMailAccountSetting",
        "group/mail-account-settings/:id/edit/": "editMailAccountSetting",
        "group/mail-account-settings/:id/delete/": "deleteMailAccountSetting"
      },
      detailGroup: function() {
        console.log('this a group detail');
      },
      acceptUserSubscription: function(id) {
        console.log('this a accept user subscription');
      },
      rejectUserSubscription: function(id) {
        console.log('this a reject user subscription');
      },
      listMailAccountSetting: function() {
        console.log('this a mail account settings list');
      },
      newMailAccountSetting: function() {
        console.log('this a mail account settings new');
      },
      editMailAccountSetting: function(id) {
        console.log('this a mail account settings edit ' + id);
      },
      deleteMailAccountSetting: function(id) {
        console.log('this a mail account settings delete ' + id);
      }
    });

    return appGroupRouter;
});