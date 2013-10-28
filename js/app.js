'use strict';

/*
 *  Title: Angular + TopCoat + PhoneGap Starter template
 *  Author: Bharani Muthukumaraswamy <bharani@abhayam.co.in>
 *  Author URL: http://abhayam.co.in
 */

// Declare app level module which depends on filters, and services
angular.module('App', [
    'ngMobile',
    'ajoslin.mobile-navigate',
    'App.filters',
    'App.services',
    'App.directives',
    'App.controllers',
    ])

.config(function ($compileProvider){
    $compileProvider.urlSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
})

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {templateUrl: 'partials/home.html', controller: 'HomeController', reverse: true});
    $routeProvider.when('/about', {templateUrl: 'partials/about.html' });
}]);



// Module declarations
angular.module('App.filters', []);
angular.module('App.services', []);
angular.module('App.directives', []);
angular.module('App.controllers', []);
