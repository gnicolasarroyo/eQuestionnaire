define("contactListView", 
	[
	"jquery", 
	"underscore", 
	"backbone",
    "text!templates/contact/listView_tpl.html",
	],  
    function($, _, Backbone, ListViewTpl){  
  
 	
 	/**
  	 * Contact List View
  	 */ 
  	var ContactListView = Backbone.View.extend({
  		tagName: 'div',
        id: 'list-view',
        template: _.template(ListViewTpl),
        events: {
            'click #prev-page': 'prevPage',
            'click #next-page': 'nextPage'
        },
        initialized: function () {
            /**
             * initialize
             */
            //this.listenTo(this.collection, "change", this.render, this);
            //this.listenTo(this.collection, "add", this.render, this);
            //this.listenTo(this.collection, "remove", this.render, this);
            //this.listenTo(this.collection, "reset", this.render, this);
        },
  		render: function () {
  			/**
  			 * render
  			 */
  			this.$el.html(this.template({
                collection: this.collection.toJSON(),
                has_prev_page: this.collection.hasPrevPage,
                has_next_page: this.collection.hasNextPage,
                link_label_prev_page: 'Anterior',
                link_label_next_page: 'Siguiente',
                tbl_header_name: 'Nombre',
                tbl_header_email: 'Correo electrónico',
                link_edit: '#contacts/:id/edit/',
                link_label_edit: 'Editar',
                link_delete: '#contacts/:id/delete/',
                link_label_delete: 'Borrar'
            }));
            return this;
  		},
        prevPage: function (e) {
            /**
             * prevPage
             */
            e.preventDefault();
            this.collection.prevPage();
        },
        nextPage: function (e) {
            /**
             * nextPage
             */
            e.preventDefault();
            this.collection.nextPage();
        }
  	});

  	/**
  	 * @return Contact List View
  	 */ 
  	return ContactListView;

});