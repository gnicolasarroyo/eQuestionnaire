define("contactEditView", 
	[
	"jquery", 
	"underscore", 
	"backbone",
    "text!templates/contact/editView_tpl.html",
    "text!templates/contact/detailView_tpl.html",
	],  
    function($, _, Backbone, EditViewTpl, DetailViewTpl){  
  
 	
 	/**
  	 * Contact Edit View
  	 */ 
  	var ContactEditView = Backbone.View.extend({
  		tagName: 'div',
        id: 'edit-view',
        events: {
            'click #btn-save': 'save',
        },
        initialize: function () {
        	/**
  			 * initialize
  			 */
        	this.createTemplate(EditViewTpl, 'edit');
        	this.createTemplate(DetailViewTpl, 'detail');
        	this.getModel(function (self) {
				self.render('edit');
			}, this);
        },
  		render: function (mode) {
  			/**
  			 * render
  			 * @param <String> mode
  			 */
  			switch(mode) {
				case 'edit':
					this.$el.html(this.templates.edit({
		                model: this.model.toJSON(),
		                legend: 'Editar contacto',
		                input_label_name: 'Nombre', 
		                input_label_email: 'Correo electrónico',
		                btn_label_save: 'Guardar cambios'
		            }));
		        	break;
		        case 'detail': 
		        	this.$el.html(this.templates.detail({
		                model: this.model.toJSON(),
		                legend: 'Detalle de contacto',
		                success_message: 'Todo correcto, se ha guardado correctamente la información del contacto.',
		                label_name: 'Nombre',
		                label_email: 'Correo electrónico',
		                link_new: '#contacts/new/reload/',
		                link_label_new: 'Crear nuevo',
		                link_edit: '#contacts/:id/edit/reload/',
		                link_label_edit: 'Editar'
		            }));
		        	break;
		        default:
					this.$el.html('');
			}
		    return this;
  		},
  		getModel: function (callback, self) {
  			/**
  			 * getModel
  			 * @param <Function> callback
  			 * @param <Object> self
  			 */
        	this.model.fetch({
    			success: function () {
    				callback(self);
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
  		createTemplate: function (template, name) {
  			/**
  			 * createTemplate
  			 * @param <String> template
  			 * @param <String> name
  			 */
  			if (typeof this.templates === 'undefined') this.templates = [];
  			this.templates[name] = _.template(template);
  		},
        save: function (e) {
        	/**
  			 * save
  			 * @param <Object> e
  			 */
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
	    	/**
  			 * showErrors
  			 * @param <Object> errors
  			 */
	        _.each(errors, function (error) {
	            var controlGroup = this.$el.find('#' + error.name + "Field");
	            controlGroup.addClass('error');
	            controlGroup.find('.help-inline').text(error.message);
	        }, this);
	    },
	    hideErrors: function () {
	    	/**
  			 * hideErrors
  			 */
	        this.$el.find('.control-group').removeClass('error');
	        this.$el.find('.help-inline').text('');
	    }
  	});

  	/**
  	 * @return Contact Edit View
  	 */ 
  	return ContactEditView;

});