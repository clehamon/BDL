'use strict';

/**
 * @ngdoc overview
 * @name bdl6App
 * @description
 * # bdl6App
 *
 * Main module of the application.
 */
var bdl6App = angular.module('bdl6App', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'firebase',
    'firebase.ref',
    'firebase.auth',
    'ui.bootstrap'
  ]);

bdl6App.config(['$routeProvider', 
    function($routeProvider){
        $routeProvider.
            when('/home', {
                templateUrl: 'index.html',
                controller: 'homeCtrl'
            }).
            when('/student', {
                templateUrl: 'views/stuHome.html', 
                controller: 'StuHomeCtrl'
            }).
            when('/student/waiting', {
                templateUrl: 'views/stuWait.html',
                controller: 'StuHomeCtrl'
            }).
            when('/student/selecting', {
                templateUrl: 'views/stuSelect.html',
                controller: 'StuHomeCtrl'
            }).
            otherwise({
                redirectTo: '/home'
            });
    }]);