'use strict';

/**
 * @ngdoc function
 * @name bdl6App.controller:QuizWaitingCtrl
 * @description
 * # QuizWaitingCtrl
 * Controller of the bdl6App
 */
angular.module('bdl6App')
  .controller('QuizWaitingCtrl', function ($scope, $routeParams, $location, Ref, $firebaseObject) {
    
    $scope.init = function(){
    	console.log($routeParams.sessionCode);
    	var sessionRef = Ref.child('Session/'+$routeParams.sessionCode);
  		$scope.session = $firebaseObject(sessionRef);

  		$scope.session.$loaded().then( function(){

  			console.log('Quiz/'+$scope.session.Teacher+'/'+$scope.session.Quiz);
  			var quizRef = Ref.child('Quiz/'+$scope.session.Teacher+'/'+$scope.session.Quiz);
  			$scope.quiz = $firebaseObject(quizRef);

  		});

  		

    }
  });
