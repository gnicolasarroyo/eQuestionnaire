define("contactListView", 
	[
	"jquery", 
	"underscore", 
	"backbone", 
	"text!templates/contact/listView_tpl.html",
	"text!templates/contact/deleteView_tpl.html"
	],  
    function($, _, Backbone, ListViewTpl, DeleteViewTpl){  
  
    var ListView = Backbone.View.extend({  
        el : '#content',  
        template: _.template(ListViewTpl),
        delete_template: _.template(DeleteViewTpl),
        events: {
        	'click #btn-delete-call': 'callDelete',
        	'click #btn-delete': 'delete',
        	'click #btn-delete-cancel': 'cancelDelete',
        	'keypress #input-search': 'search'
        },
        initialize: function() {  
            window.appEvents.trigger('loader:show');
            
        	this.getCollection(this, function(that) {
            	that.render('list');
				window.appEvents.trigger('loader:hide');
            });
            
            console.log('load contactListView');
        },
        render: function (mode) {
        	switch(mode) {
				case 'list':
				 	this.$el.html(this.template({
						collection: this.collection.toJSON(),
						legend: 'Lista de contactos',
						action_edit: 'Editar',
						action_delete: 'Borrar'
					}));
				  	break;
				case 'delete':
			  		this.$el.find('#delete-section').html(this.delete_template({
						name: this.model.get('name'),
						email: this.model.get('email'),
						legend: 'Borrar contacto',
						action_delete: 'Si, borrar',
						action_cancel: 'Cancelar'
					}));
				  	break;
				default:
					this.$el.html('');
				  	window.appEvents.trigger('notifier:show', {
						type: 'danger', 
						title: 'Ha ocurrido un error',
						message: 'No se pudo recuperar el listado de contactos, si el problema continua comunicate con personal de atención al cliente'
					});
			}

			return this;
        },
        getCollection: function (that, callback) {
        	
        	var conditions = function () {
        		var temp = {};
        		var search = that.$el.find('#input-search').val() ? that.$el.find('#input-search').val() : '';	
        		
        		if(search > '') temp.data = { name: search, email: search};
	        	
	        	temp.success = function () {
    				callback(that);
    			};

    			temp.error = function () {
    				window.appEvents.trigger('notifier:show', {
 						type: 'danger', 
 						title: 'Ha ocurrido un error',
 						message: 'No se pudo recuperar la información de los contactos, si el problema continua comunicate con personal de atención al cliente'
 					});
 					window.appEvents.trigger('loader:hide');
    			};

    			return temp;
        	};
        	
        	this.collection.fetch(conditions());
        },
        callDelete: function (e) {
        	e.preventDefault();

        	this.model = this.collection.get($(e.currentTarget).data('id'));
        	
        	this.render('delete');

        	$("html, body").animate({ scrollTop: 0 }, "slow");

        },
        delete: function (e) {
        	e.preventDefault();

        	var that = this; 
        	
        	this.model.destroy({
        		success: function () {
        			window.appEvents.trigger('loader:show');
            
		        	that.getCollection(that, function(that) {
		            	that.render('list');
						window.appEvents.trigger('loader:hide');
		            });
        		},
        		error: function () {
        			window.appEvents.trigger('notifier:show', {
 						type: 'danger', 
 						title: 'Ha ocurrido un error',
 						message: 'No se pudo borrar el contacto, puede que este contacto este relacionado a una lista de contactos o a un envio de encuesta. Si el problema continua comunicate con personal de atención al cliente'
 					});			
        		}
        	});

        	this.$el.find('#delete-section').html('');
        },
        cancelDelete: function (e) {
        	e.preventDefault();

        	this.$el.find('#delete-section').html('');
        },
	    remove: function() {
	    	this.$el.remove();
	    	//this.$el.html('');
	    	//this.$el.unbind();
	    	//this.unbind();
	    	//this.undelegateEvents();
	    	//this.stopListening();
	    	//console.log(this);
	    	
	    	return this;
	    },
	    search: function (e) {
	    	//e.preventDefault();

	    	if ($(e.currentTarget).val().length >= 3 && e.which == 13) {
	    		
    			window.appEvents.trigger('loader:show');
        
	        	this.getCollection(this, function(that) {
	            	that.render('list');
					window.appEvents.trigger('loader:hide');
	            });
		        
	    	} 
	    }
	    
    });  
  
    return ListView;  
});  