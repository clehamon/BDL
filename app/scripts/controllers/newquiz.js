'use strict';

/**
 * @ngdoc function
 * @name bdl6App.controller:NewquizCtrl
 * @description
 * # NewquizCtrl
 * Controller of the bdl6App
 */
angular.module('bdl6App')
  .controller('NewquizCtrl', function ($scope, $firebaseObject, $firebaseArray, $routeParams) {
    $scope.quizRef = Ref.child('Quiz')
  });
