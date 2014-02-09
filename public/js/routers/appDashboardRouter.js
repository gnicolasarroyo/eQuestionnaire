define('appDashboardRouter', 
  [
  'backbone',
  'activityModel',
  'activityCollection'
  ], function (Backbone) {


    /**
    * app Dashboard Router
    * ==================
    */
    var appDashboardRouter = Backbone.Router.extend({
      routes: {
        "": "recentActivity"
      },
      recentActivity: function() {
        console.log('this a recent activity');
      }
    });

    return appDashboardRouter;
});