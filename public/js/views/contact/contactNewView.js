define("contactNewView", 
	[
	"jquery", 
	"underscore", 
	"backbone",
    "text!templates/contact/newView_tpl.html",
    "text!templates/contact/detailView_tpl.html",
    "contactModel"
	],  
    function($, _, Backbone, NewViewTpl, DetailViewTpl, ContactModel) {  
  
 	
 	/**
  	 * Contact New View
  	 */ 
  	var ContactNewView = Backbone.View.extend({
  		tagName: 'div',
        id: 'new-view',
        model: new ContactModel(),
        events: {
            'click #btn-save': 'save',
        },
        initialize: function () {
        	/**
  			 * initialize
  			 */
        	this.createTemplate(NewViewTpl, 'new');
        	this.createTemplate(DetailViewTpl, 'detail');
        	this.render('new');
        },
  		render: function (mode) {
  			/**
  			 * render
  			 */
  			switch(mode) {
				case 'new':
				case undefined:
		  			this.$el.html(this.templates.new({
		                legend: 'Nuevo contacto',
		                input_label_name: 'Nombre', 
		                input_label_email: 'Correo electrónico',
		                btn_label_save: 'Crear'
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
		                link_label_new: 'Otro nuevo',
		                link_edit: '#contacts/:id/edit/reload/',
		                link_label_edit: 'Editar'
		            }));
		        	break;
		        default:
					this.$el.html('');
			}
		    return this;
  		},
  		createTemplate: function (template, name) {
  			if (typeof this.templates === 'undefined') this.templates = [];
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