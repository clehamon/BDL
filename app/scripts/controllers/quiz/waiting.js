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
         Session.showResults(updateChart);
        }
      }, 1000, $rootScope.session.CurrentQuestion.Time);
    }

    $scope.launchQuiz = function(){
      
      Session.nextQuestion(startCountdown);
      $rootScope.session.Launched = true;

    }

    $scope.nextQuestion = function(){
      Session.nextQuestion(startCountdown);
    }

    $scope.skipQuestion = function(){
        $interval.cancel(currentCountdown);
        console.log('okoo');
        Session.showResults(updateChart);
    }

    $scope.showSession = function(){
        console.log('ok');
        console.log($rootScope.session);
    }

    $scope.showAnswers = function(){
        console.log($rootScope.session.CurrentQuestion);
    }

    var updateChart = function(answers) {
        console.log(answers)
        // if (answers !== undefined) {
        //      var ctx = document.getElementById("myChart");
        //     console.log(answers)
        //     var myChart = new Chart(ctx, {
        //         type: 'bar',
        //         data: {
        //             labels: ["Red", "Yellow", "Blue", "Purple"],
        //             datasets: [{
        //                 backgroundColor:['rgba(227,67,87,1)','rgba(248,231,28,1)','rgba(74,144,226,1)','rgba(177,106,239,1)'],
        //                 data: answers,
        //             }],
        //             options:{
        //                 display:false,
        //             }
        //         }
        //     });
        // }
       
    }




    $scope.endSession = function(){
      Session.endSession();

    }


  });
