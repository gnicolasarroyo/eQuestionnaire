'use strict';


/**
* Configure Require
* =================
*/
require.config({
    paths: {
        // libs -->
        jquery: 'libs/jquery-1.10.2.min'
    }
});


/**
* Initialize signup
* ===================
*/
require(['jquery'], function ($) {
   	$(function () {


   		/**
        * Reset Form
        * ==========
        */
        var resetForm = function () {
            $('#emailField').removeClass("error");
            $('#passwordField').removeClass("error");
            
            $('#emailField span').html('');
            $('#passwordField span').html('');
        };


		/**
		* Valid Form
		* ==========
		*/   		
   		var validForm = function () {
			resetForm();

			var isValid = true,
				$inputEmail = $('form #email'),
			 	$inputPassword = $('form #password');
			
			/**
            * Email field
            */
			if ($inputEmail.val() === "") {
				$('#emailField').addClass("error");
				$('#emailField').find('span').html('Debe ingresar su correo electrónico.');
				isValid = false;
			}

			/** 
            * Password field
            */
			if ($inputPassword.val() === "") {
				$('#passwordField').addClass("error");
				$('#passwordField').find('span').html('Debe ingresar su contraseña.');
				isValid = false;
			} else if ($inputPassword.val().length < 8) {
				$('#passwordField').addClass("error");
				$('#passwordField').find('span').html('Su contraseña debe tener un minimo de 8 caracteres.');
				isValid = false;
			}
			
			return isValid;
		};


		/**
		* Submit Form
		* ===========
		*/
   		$('form #btn-login').on('click', function (event) {
   			if (validForm()) $('form').submit()
   		});

	});	
});