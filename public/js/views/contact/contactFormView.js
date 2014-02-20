define("contactFormView", 
	[
	"jquery", 
	"underscore", 
	"backbone", 
	"text!templates/contact/contactFormView_tpl.html",
	"text!templates/contact/contactDetailView_tpl.html"
	],  
    function($, _, Backbone, ContactFormViewTpl, ContactDetailViewTpl){  
  
    var ContactFormView = Backbone.View.extend({  
        el : '#content',  
        template: _.template(ContactFormViewTpl),
        detail_template: _.template(ContactDetailViewTpl),
        events: {
        	'click #btn-save': 'save',
        	'click #btn-delete': 'delete'
        },
        initialize: function() {  
            window.appEvents.trigger('loader:show');
            
            if (this.model.get('_id')) {
            	this.getModel(this, function(that) {
	            	that.render('edit');
					window.appEvents.trigger('loader:hide');
	            });
            } else {
            	this.render('new');
            	window.appEvents.trigger('loader:hide');
            }

            console.log('load contactFormView');
        },
        render: function (mode) {
        	switch(mode) {
				case 'new':
				 	this.$el.html(this.template({
						name: this.model.get('name'),
						email: this.model.get('email'),
						legend: 'Nuevo contacto',
						action_save: 'Crear'
					}));
				  	break;
				case 'edit':
			  		this.$el.html(this.template({
						name: this.model.get('name'),
						email: this.model.get('email'),
						legend: 'Editar contacto',
						action_save: 'Guardar cambios'
					}));
				  	break;
				case 'detail':
				  	this.$el.html(this.detail_template({
				  		_id: this.model.get('_id'),
						name: this.model.get('name'),
						email: this.model.get('email')
					}));
				  	break;
				default:
					this.$el.html('');
				  	window.appEvents.trigger('notifier:show', {
						type: 'danger', 
						title: 'Ha ocurrido un error',
						message: 'No se pudo recuperar el formulario de contacto, si el problema continua comunicate con personal de atención al cliente'
					});
			}

			return this;
        },
        getModel: function (that, callback) {
        	this.model.fetch({
    			success: function () {
    				callback(that);
    			},
    			error: function () {
    				window.appEvents.trigger('notifier:show', {
 						type: 'danger', 
 						title: 'Ha ocurrido un error',
 						message: 'No se pudo recuperar la información del contacto, si el problema continua comunicate con personal de atención al cliente'
 					});
    			}
    		});
        },
        save: function (e) {
        	e.preventDefault();

			this.hideErrors();

	 		this.model.set({
	 			name: this.$el.find('#c-name').val(),
	 			email: this.$el.find('#c-email').val()
	 		});
			
	 		if (!this.model.isValid()) {
	 			this.showErrors(this.model.validationError);
	 		} else {
	 			
	 			var that = this;
	 			this.model.save(null, {
	 				success: function () {
	 					that.render('detail');
	 				}, 
	 				error: function () {
	 					window.appEvents.trigger('notifier:show', {
	 						type: 'danger', 
	 						title: 'Ha ocurrido un error',
	 						message: 'Intenta nuevamente, si el problema continua comunicate con personal de atención al cliente'
	 					});
	 				}
	 			});

	 		}
	    },
	    showErrors: function(errors) {
	        _.each(errors, function (error) {
	            var controlGroup = this.$el.find('#' + error.name + "Field");
	            controlGroup.addClass('error');
	            controlGroup.find('.help-inline').text(error.message);
	        }, this);
	    },
	    hideErrors: function () {
	        this.$el.find('.control-group').removeClass('error');
	        this.$el.find('.help-inline').text('');
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
	    }
	    
    });  
  
    return ContactFormView;  
});  