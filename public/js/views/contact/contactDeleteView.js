define("contactDeleteView", 
	[
	"jquery", 
	"underscore", 
	"backbone",
    "text!templates/contact/deleteView_tpl.html"
	],  
    function($, _, Backbone, DeleteViewTpl){  
  
 	
 	/**
  	 * Contact Delete View
  	 */ 
  	var ContactDeleteView = Backbone.View.extend({
  		tagName: 'div',
        id: 'delete-view',
        template: _.template(DeleteViewTpl), 
        events: {
            'click #btn-destroy': 'destroy',
        },
        initialize: function () {
            /**
             * initialize
             */
            this.getModel(function (self) { 
                self.render('destroy');
            }, this);
        },
  		render: function (mode) {
  			/**
  			 * render
  			 */
  			switch(mode) {
                case 'destroy':
                    this.$el.html(this.template({
                        model: this.model.toJSON(),
                        legend: 'Borrar contacto',
                        question_confirm_delete: '¿Seguro deseas eliminar este contacto?',
                        label_name: 'Nombre', 
                        label_email: 'Correo electrónico',
                        btn_label_destroy: 'Borrar',
                        link_back_to_list: '#contacts/',
                        link_label_back_to_list: 'Volver a la lista de contactos'
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
        destroy: function (e) {
        	/**
        	 * destroy
        	 * @param <Object> e
        	 */
        	e.preventDefault();
        	var self = this;
        	
        	this.$el.find('#btn-destroy').addClass('disabled').attr('disabled', true);

        	this.model.destroy({
        		success: function () {
		        	self.$el.find('#question-confirm-delete')
                        .fadeOut('slow')
                        .html('Se ha borrado correctamente el contacto, puedes contiuar.')
                        .fadeIn('slow');
        		},
        		error: function () {
        			self.$el.find('#btn-destroy').removeClass('disabled').attr('disabled', false);

        			window.appEvents.trigger('notifier:show', {
 						type: 'danger', 
 						title: 'Ha ocurrido un error',
 						message: 'No se pudo borrar el contacto, puede que este contacto este relacionado a una lista de contactos o a un envio de encuesta. Si el problema continua comunicate con personal de atención al cliente'
 					});			
        		}
        	});
        }
  	});

  	/**
  	 * @return Contact Delete View
  	 */ 
  	return ContactDeleteView;

});