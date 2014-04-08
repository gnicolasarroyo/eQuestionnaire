define("contactListEditView", 
	[
	"jquery", 
	"underscore", 
	"backbone",
	"text!templates/contactList/editView_tpl.html",
	"text!templates/contactList/detailView_tpl.html",
	"contactListModel",
	"contactCollection"
	],  
	function($, _, Backbone, EditViewTpl, DetailViewTpl, ContactListModel, ContactCollection) {  
  
	
	/**
	 * Contact List Edit View
	 */ 

	// TODO: refactor code
	var ContactListEditView = Backbone.View.extend({
		tagName: 'div',
		id: 'edit-view',
		model: {},
		no_selected_collection: [],
		selected_collection: [],
		pre_no_selected: [],
		pre_selected: [],
		row_no_selected_template: _.template('<% _.each(no_selected_collection, function (item) { %><tr><td><input type="checkbox" id="select-to-add" name="select-to-add" value="<%= item._id %>"></td><td><%= item.name %>, <small><%= item.email %></small></td></tr><% }); %>'),
		row_selected_template: _.template('<% _.each(selected_collection, function (item) { %><tr><td><input type="checkbox" id="select-to-remove" name="select-to-remove" value="<%= item._id %>"></td><td><%= item.name %>, <small><%= item.email %></small></td></tr><% }); %>'), 
		events: {
			'change #select-to-add'              : 'selectToAdd',
			'click #btn-no-selected-add'         : 'noSelectedAdd',
			'change #select-to-remove'           : 'selectToRemove',
			'click #btn-selected-remove'         : 'selectedRemove',
			'keypress #input-no-selected-search' : 'searchInNoSelected',
			'keypress #input-selected-search'    : 'searchInSelected',
			'click #btn-save'                    : 'save',
		},
		initialize: function (options) {
			/**
			 * initialize
			 */
			 // TODO: refactor code
			this.createTemplate(EditViewTpl, 'edit');
			this.createTemplate(DetailViewTpl, 'detail');

			this.model = new ContactListModel();
			this.model.set({ _id: options._id });

			this.no_selected_collection = new ContactCollection();
				
			this.getModel(function (self) {
				self.selected_collection = new ContactCollection(self.model.get('contacts'));
				self.no_selected_collection.remove(self.selected_collection.models);
				self.render('edit');
			}, this);
		},
		render: function (mode) {
			/**
			 * render
			 */
			switch(mode) {
				case 'edit':
				case undefined:
					this.$el.html(this.templates.edit({
						model: this.model.toJSON(),
						legend: 'Editar lista de contactos',
						input_label_name: 'Nombre', 
						input_label_description: 'Descripción',
						label_collection: 'Contactos',
						label_no_selected: 'Disponibles',
						input_no_selected_search_placeholder: 'Buscar',
						no_selected_collection: this.no_selected_collection.toJSON(),
						count_no_selected: 0,
						btn_label_add: 'Agregar',
						btn_label_select_all: 'Todos',
						label_selected: 'Seleccionados',
						input_selected_search_placeholder: 'Buscar',
						selected_collection: this.selected_collection.toJSON(),
						count_selected: 0,
						btn_label_remove: 'Quitar',
						btn_label_save: 'Crear'
					}));
					break;    
				case 'detail': 
					this.$el.html(this.templates.detail({
						model: this.model.toJSON(),
						legend: 'Detalle de lista de contactos',
						success_message: 'Todo correcto, se ha guardado correctamente la información de la lista de contactos.',
						label_name: 'Nombre',
						link_new: '#contacts/lists/new/reload/',
						link_label_new: 'Otro nuevo',
						link_edit: '#contacts/lists/:id/edit/reload/',
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
		getModel: function (callback, self) {
			/**
  			 * getModel
  			 * @param <Function> callback
  			 * @param <Object> self
  			 */

        	this.model.fetch({
    			success: function () {
    				self.no_selected_collection.fetch({
    					success: function () {
    						callback(self);
    					},
    					error: function () {
    						window.appEvents.trigger('notifier:show', {
		 						type: 'danger', 
		 						title: 'Ha ocurrido un error',
		 						message: 'No se pudo recuperar la información de la lista de contactos, si el problema continua comunicate con personal de atención al cliente'
		 					});
    					}
    				});
    			},
    			error: function () {
    				window.appEvents.trigger('notifier:show', {
 						type: 'danger', 
 						title: 'Ha ocurrido un error',
 						message: 'No se pudo recuperar la información de la lista de contactos, si el problema continua comunicate con personal de atención al cliente'
 					});
    			}
    		});
		},
		selectToAdd: function (e) {
			// TODO: refactor code
			$item = $(e.currentTarget);
  
			if ($item.is(':checked')) {
				this.pre_no_selected.push($item.val());
			} else {
				this.pre_no_selected = _.filter(this.pre_no_selected, function(item){ return item !== $item.val(); });
			}

			this.$el.find('#count-no-selected').html(this.pre_no_selected.length.toString());
		},
		selectToRemove: function (e) {
			// TODO: refactor code
			$item = $(e.currentTarget);
  
			if ($item.is(':checked')) {
				this.pre_selected.push($item.val());
			} else {
				this.pre_selected = _.filter(this.pre_selected, function(item){ return item !== $item.val(); });
			}

			this.$el.find('#count-selected').html(this.pre_selected.length.toString());
		},
		noSelectedAdd: function (e) {
			// TODO: refactor code
			e.preventDefault();
			if (this.pre_no_selected.length > 0) {
				// Inicio - obtengo los seleccionados
				var that = this; 
				var c = _.map(this.pre_no_selected, function (item){ return that.no_selected_collection.get(item);});
				// Los agrego dentro de los seleccionados
				this.selected_collection.add(c);
				this.no_selected_collection.remove(c);
				//this.selected_collection.sort();
				
				// Finaliza - limpio variables
				this.pre_no_selected = [];
				this.pre_selected = [];

				$('#input-no-selected-search').val('');

				// renderizo listas
				this.noSelectedRender(this.no_selected_collection.toJSON());
				this.selectedRender(this.selected_collection.toJSON());
				//$('input[name="select-to-add"]').attr('checked', false);
			}
			
		},
		selectedRemove: function (e) {
			// TODO: refactor code
			e.preventDefault();
			
			if (this.pre_selected.length > 0) {
				// Inicio - obtengo los seleccionados
				var that = this; 
				var c = _.map(this.pre_selected, function (item){ return that.selected_collection.get(item);});
				// Los agrego dentro de los seleccionados
				this.no_selected_collection.add(c);
				this.selected_collection.remove(c);
				
				// Finaliza - limpio variables
				this.pre_no_selected = [];
				this.pre_selected = [];

				$('#input-selected-search').val('');

				// renderizo listas
				this.noSelectedRender(this.no_selected_collection.toJSON());
				this.selectedRender(this.selected_collection.toJSON());
				//$('input[name="select-to-add"]').attr('checked', false);
			}   
		},
		noSelectedRender: function (collection) {
			// TODO: refactor code
			this.$el.find('#table-no-selected').html(this.row_no_selected_template({
				no_selected_collection: collection
			}));
			this.$el.find('#no-selected-collection-length').html(collection.length.toString());
			this.$el.find('#count-no-selected').html(this.pre_no_selected.length.toString());
		},
		selectedRender: function (collection) {
			// TODO: refactor code
			this.$el.find('#table-selected').html(this.row_selected_template({
				selected_collection: collection
			}));
			this.$el.find('#selected-collection-length').html(collection.length.toString());
			this.$el.find('#count-selected').html(this.pre_selected.length.toString());
		},
		searchInNoSelected: function (e) {
			/**
			 * search
			 * @param <Object> e
			 */
			 // TODO: refactor code
			if ($(e.currentTarget).val().length >= 3 && e.which == 13) {
				var filter = new RegExp($(e.currentTarget).val().trim(),'i');
				var collection = _.filter(this.no_selected_collection.toJSON(), function (item) {
					return filter.test(item.name) || filter.test(item.email);
				});
				
				this.noSelectedRender(collection);
			}

			if ($(e.currentTarget).val().length === 0 && e.which == 13) {
				this.noSelectedRender(this.no_selected_collection.toJSON());
			}

			this.pre_no_selected = [];
		},
		searchInSelected: function (e) {
			/**
			 * search
			 * @param <Object> e
			 */

			if ($(e.currentTarget).val().length >= 3 && e.which == 13) {
				var filter = new RegExp($(e.currentTarget).val().trim(),'i');
				var collection = _.filter(this.selected_collection.toJSON(), function (item) {
					return filter.test(item.name) || filter.test(item.email);
				});

				this.selectedRender(collection);
			}

			if ($(e.currentTarget).val().length === 0 && e.which == 13) {
				this.selectedRender(this.selected_collection.toJSON());
			}

			this.pre_selected = [];
			
		},
		save: function (e) {
			e.preventDefault();

			this.hideErrors();

			this.model.set({
				name: this.$el.find('#c-name').val(),
				contacts: this.selected_collection.toJSON()
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
	 * @return Contact List Edit View
	 */ 
	return ContactListEditView;

});