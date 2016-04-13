'use strict';

/**
 * @ngdoc function
 * @name bdl6App.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the bdl6App
 */
angular.module('bdl6App')
  .controller('HeaderCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
