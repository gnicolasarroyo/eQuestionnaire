define('application', 
	[
    'backbone',
    'underscore',
    'appAccountRouter',
    'appContactsRouter',
    'appDashboardRouter',
    'appGroupRouter',
    'appQuestionnairesRouter',
    'loaderView',
    'notifierView',
    'sidebarView'
    ], function (
        Backbone,
        _, 
        appAccountRouter,
        appContactsRouter,
        appDashboardRouter, 
        appGroupRouter, 
        appQuestionnairesRouter,
        LoaderView,
        NotifierView,
        SidebarView
        ) {

    /**
     * application
     */
    return {
    	el: '#content',
    	events: {},
    	widgets: {},
    	routers: [],
    	currentView: {},
    	initialize: function () {
    		/**
    		 * initialize 
    		 */
    		// load Events
		    this.events = _.extend({}, Backbone.Events);
		    this.events.on('notifier:show',  this.notifierShow, this);
		    this.events.on('loader:show',    this.loaderShow, this);
		    this.events.on('loader:hide',    this.loaderHide, this);
		    this.events.on('content:render', this.contentRender, this);
		    this.events.on('sidebar:render', this.sidebarRender, this);

		    // load Widgets
		    this.widgets.notifierView = new NotifierView();
		    this.widgets.loaderView   = new LoaderView();
			this.widgets.sidebarView  = new SidebarView();

		    // load Routers
		    this.routers.push(new appAccountRouter());
		    this.routers.push(new appContactsRouter({events: this.events}));
		    this.routers.push(new appDashboardRouter()); 
		    this.routers.push(new appGroupRouter()); 
		    this.routers.push(new appQuestionnairesRouter());
		    Backbone.history.start();

            this.loaderHide();
			return this;
    	},
    	notifierShow: function (data) {
    		/**
    		 * notifierShow
    		 * @param <object> data
    		 */
    		this.widgets.notifierView.show(data);
    	},
    	loaderShow: function () {
    		/**
    		 * loaderShow
    		 * @param <object> data
    		 */
    		this.widgets.loaderView.show();
    	},
    	loaderHide: function () {
    		/**
    		 * loaderHide
    		 * @param <object> data
    		 */
    		this.widgets.loaderView.hide();
    	},
    	contentRender: function (data) {
    		/**
    		 * contentRender
    		 * @param <Object> data
    		 */
    		if (this.currentView.remove) this.currentView.remove();
    		this.currentView = new data.view(data.options);
    		$(this.el).html(this.currentView.el);
    	},
    	sidebarRender: function (data) {
    		/**
    		 * sidebarRender
    		 * @param <Object> data
    		 */
    		this.widgets.sidebarView.render(data);
    	}
    };
});