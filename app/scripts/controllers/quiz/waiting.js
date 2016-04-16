'use strict';

/**
 * @ngdoc function
 * @name bdl6App.controller:QuizWaitingCtrl
 * @description
 * # QuizWaitingCtrl
 * Controller of the bdl6App
 */
angular.module('bdl6App')
  .controller('QuizWaitingCtrl', function ($scope, $rootScope, $routeParams, $location, Ref, $firebaseObject, Session) {
    
    $scope.init = function(){
    // 	var sessionRef = Ref.child('Session/'+$routeParams.sessionCode);
  		// $scope.session = $firebaseObject(sessionRef);

      // var currentSession = Session.getSession();

      // currentSession.$bindTo($scope, 'session');

      // var quizRef = Ref.child('Quiz/'+$scope.session.Teacher+'/'+$scope.session.Quiz);
      // $scope.quiz = $firebaseObject(quizRef);


    }

    $scope.launchQuiz = function(){

    }


  });
