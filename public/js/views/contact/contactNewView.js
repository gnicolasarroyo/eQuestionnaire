define("contactNewView", 
	[
	"jquery", 
	"underscore", 
	"backbone",
    "text!templates/contact/newView_tpl.html",
    "text!templates/contact/detailView_tpl.html",
	],  
    function($, _, Backbone, NewViewTpl, DetailViewTpl){  
  
 	
 	/**
  	 * Contact New View
  	 */ 
  	var ContactNewView = Backbone.View.extend({
  		tagName: 'div',
        id: 'new-view',
        events: {
            'click #btn-save': 'save',
        },
        initialize: function () {
        	/**
  			 * initialize
  			 */
        	this.createTemplate(NewViewTpl, 'new');
        	this.createTemplate(DetailViewTpl, 'detail');
        },
  		render: function (mode) {
  			/**
  			 * render
  			 */
  			switch(mode) {
				case 'new' || 'undefined':
					//
		  			this.$el.html(this.templates.new({
		                model: this.model.toJSON(),
		                legend: 'Nuevo contacto',
		                label_name: 'Nombre', 
		                label_email: 'Correo electrónico',
		                btn_label_save: 'Crear'
		            }));
		        	break;    
		        case 'detail': 
		        	this.$el.html(this.templates.detail({
		                model: this.model.toJSON(),
		                legend: 'Detalle de contacto',
		                link_new: '#contacts/new/reload/',
		                link_label_new: 'Otro nuevo'
		                link_edit: '#contacts/:id/edit/reload/',
		                link_label_edit: 'Editar'
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
  		createTemplate: function (template, name) {
  			this.templates[name] = _.template(template);
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
	 			var self = this;
	 			this.model.save(null, {
	 				success: function () {
	 					self.render('detail');
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
	    }
  	});

  	/**
  	 * @return Contact New View
  	 */ 
  	return ContactNewView;

});