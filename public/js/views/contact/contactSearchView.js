define("contactSearchView", 
	[
	"jquery", 
	"underscore", 
	"backbone",
    "text!templates/contact/searchView_tpl.html",
	],  
    function($, _, Backbone, SearchViewTpl){  
  
 	
 	/**
  	 * Contact Search View
  	 */ 
  	var ContactSearchView = Backbone.View.extend({
  		tagName: 'div',
        id: 'search-view',
        template: _.template(SearchViewTpl),
        events: {
            'keypress #input-search': 'search',
            'click #btn-remove-filter': 'undoSearch'
        },
        initialized: function () {
            /**
             * initialize
             */
            this.filter= '';
        },
  		render: function () {
  			/**
  			 * render
  			 */
  			this.$el.html(this.template({
                count_records: this.collection.length,
                legend: 'Lista de contactos',
                no_records: 'Aún no has cargado ningún contacto, para añadir contactos a tu grupo dirigete al menu "Nuevo contacto" que se visualiza a la izquierda de esta pantalla.',
                not_found_records: 'No se han encontrado resultados que coincidan con ',
                found_records: 'Resultados para ',
                input_search_placeholer: 'Buscar',
                btn_label_remove_filter: 'quitar filtro',
                filter: this.filter
            }));
            return this;
  		},
        search: function (e) {
            /**
             * search
             * @param <Object> e
             */
            if ($(e.currentTarget).val().length >= 3 && e.which == 13) {
                this.filter = $(e.currentTarget).val();
                this.collection.search({ name: this.filter, email: this.filter });
            }
        },
        undoSearch: function (e) {
            /**
             * undoSearch
             * @param <Object> e
             */
            e.preventDefault();

            this.filter = '';
            this.collection.search({});
        }
  	});

  	/**
  	 * @return Contact Search View
  	 */ 
  	return ContactSearchView;

});