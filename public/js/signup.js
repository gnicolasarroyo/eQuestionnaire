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
   $(function() {
        
        /**
        * Reset Form
        * ==========
        */
        var resetForm = function () {
            $('#nameField').removeClass("error");
            $('#emailField').removeClass("error");
            $('#passwordField').removeClass("error");
            $('#confirmPasswordField').removeClass("error");
            $('#acceptTermsField').removeClass("error");

            $('#nameField span').html('');
            $('#emailField span').html('');
            $('#passwordField span').html('');
            $('#confirmPasswordField span').html('');
            $('#acceptTermsField span').html('');
        };


        /**
        * Valid Form
        * ==========
        */          
        var validForm = function () {
            resetForm();

            var isValid = true,
                $inputFirstName = $('form #first_name'),
                $inputLastName = $('form #last_name'),
                $inputEmail = $('form #email'),
                $inputPassword = $('form #password'),
                $inputConfirmPassword = $('form #confirm_password'),
                $inputAceptTerms = $('form #accept_terms');

            /**
            * Name field
            */
            if ($inputFirstName.val() === "" || $inputLastName.val() === "") {
                $('#nameField').addClass("error");
                $('#nameField').find('span').html('Debe ingresar su Nombre completo.');
                isValid = false;
            }

            /**
            * Email field
            */
            if ($inputEmail.val() === "") {
                $('#emailField').addClass("error");
                $('#emailField').find('span').html('Debe ingresar un correo electrónico que use habitualmente.');
                isValid = false;
            }

            /** 
            * Password field
            */
            if ($inputPassword.val() === "") {
                $('#passwordField').addClass("error");
                $('#passwordField').find('span').html('Debe elegir e ingresar una contraseña.');
                isValid = false;
            } else if ($inputPassword.val().length < 8) {
                $('#passwordField').addClass("error");
                $('#passwordField').find('span').html('Su contraseña debe tener un minimo de 8 caracteres.');
                isValid = false;
            }
            
            /**
            * Confirm Password field
            */
            if ($inputConfirmPassword.val() === "") {
                $('#confirmPasswordField').addClass("error");
                $('#confirmPasswordField').find('span').html('Debe volver a ingresar su contraseña para confirmar que es la correcta.');
                isValid = false;
            } else if ($inputPassword.val() !== $inputConfirmPassword.val()) {
                $('#confirmPasswordField').addClass('error');
                $('#confirmPasswordField').find('span').html('La confirmación de la contraseña no coincide con la anterior.');
                isValid = false;
            }

            /**
            * Accept Terms field
            */
            if ($inputAceptTerms.prop('checked') === false) {
                $('#acceptTermsField').addClass('error');
                $('#acceptTermsField').find('span').html('Para continuar debe aceptar los términos y condiciones.');
                isValid = false;
            }

            return isValid;
        };


        /**
        * Submit Form
        * ===========
        */
        $('form #btn-nextStep').on('click', function (event) {
            if (validForm()) $('form').submit()
        });
   });
});