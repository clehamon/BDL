'use strict';

/**
 * @ngdoc function
 * @name bdl6App.controller:NewquizCtrl
 * @description
 * # NewquizCtrl
 * Controller of the bdl6App
 */
angular.module('bdl6App')
  .controller('NewquizCtrl', function ($scope, $firebaseObject, $firebaseArray, $routeParams, Ref, Auth) {
  	//$scope.quizID = $routeParams.quizID;
  	var quizID = $routeParams.quizID;
  	var quizRef = Ref.child('Quiz/' + Ref.getAuth().uid + '/' + quizID);
  	var quizObj = $firebaseObject(quizRef);


  	quizObj.$bindTo($scope, 'quiz');
    //$scope.quizRef = Ref.child('Quiz')
  });
