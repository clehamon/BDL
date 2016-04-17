'use strict';

/**
 * @ngdoc function
 * @name bdl6App.controller:QuizWaitingCtrl
 * @description
 * # QuizWaitingCtrl
 * Controller of the bdl6App
 */
angular.module('bdl6App')
  .controller('QuizWaitingCtrl', function ($scope, $rootScope, $routeParams, $location, Ref, $firebaseArray, Session, $interval) {

    var currentCountdown;
    $scope.countdown = 999999;
    
    $scope.init = function(){

        

        // var refAnswer= Ref.child('Answer/1');
        // var objAnswer = $firebaseArray(refAnswer);

        // objAnswer.$loaded().then(function(){

        //   var answer = {
        //     Name: 'XVIe century',
        //     IsCorrect: false
        //   }
        //   objAnswer.$add(answer);

        //   answer = {
        //     Name: 'XVIIe century',
        //     IsCorrect: false
        //   }
        //   objAnswer.$add(answer);

        //   answer = {
        //     Name: 'XVIIIe century',
        //     IsCorrect: true
        //   }
        //   objAnswer.$add(answer);

        // })


        // var refQuestion = Ref.child('Question');

        // var question = {
        //   Name: 'Wich century did the American revolution took place in ?',
        //   Type: 'multiple',
        //   Time : 20,
        //   Image : 'http://vignette3.wikia.nocookie.net/assassinscreed/images/a/a2/ACIII-GI_(8).jpg',
        //   // Answers : [1,2,3]

        // }

        // refQuestion.child(1).set(question);


    }

    var startCountdown = function () {
      $scope.countdown = angular.copy($rootScope.session.CurrentQuestion.Time);
      console.log($scope.countdown);
      currentCountdown = $interval(function(){
        $scope.countdown--;
        if ($scope.countdown === 0) {
         Session.showResults();
        }
      }, 1000, $rootScope.session.CurrentQuestion.Time);
    }

    $scope.launchQuiz = function(){
      
      Session.nextQuestion(startCountdown);
      $rootScope.session.Launched = true;

    }

    $scope.showAnswers = function(){
      console.log($rootScope.session.CurrentQuestion);
    }


  });
