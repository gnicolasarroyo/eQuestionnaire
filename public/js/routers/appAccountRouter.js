define('appAccountRouter', 
  [
  'backbone',
  'userProfileModel'
  ], function (Backbone) {


    /**
    * app Account Router
    * ==================
    */
    var appAccountRouter = Backbone.Router.extend({
      routes: {
        "account/userprofile/": "userProfileDetail",
        "account/exit/": "logOut"
      },
      userProfileDetail: function() {
        console.log('this is a user profile');
      },
      logOut: function () {
        console.log('Exit user');
      }
    });

    return appAccountRouter;
});  