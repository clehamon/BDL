'use strict';

/**
 * @ngdoc function
 * @name bdl6App.controller:QuizQuestionCtrl
 * @description
 * # QuizQuestionCtrl
 * Controller of the bdl6App
 */
angular.module('bdl6App')
  .controller('QuizQuestionCtrl', function ($scope) {

    $scope.nextQuestion = function(){
      Session.nextQuestion(startCountdown);
    }

    $scope.showSession = function(){
        console.log('ok');
        console.log($rootScope.session);
    }

    $scope.showAnswers = function(){
      console.log($rootScope.session.CurrentQuestion);
    }

  });
