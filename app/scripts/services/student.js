'use strict';

/**
 * @ngdoc service
 * @name bdl6App.student
 * @description
 * # student
 * Factory in the bdl6App.
 */
angular.module('bdl6App')
  .factory('student', function (Ref, $firebaseObject, $location, $cookies, $rootScope) {

    var currentSession = {};
    var answersArray;
    var currentName;
    var playerRef;


    var loadQuestion = function () {
      $location.path('student/selecting');
      $rootScope.currentAnswer = null;
    };

    var loadResults = function () {
      $location.path('student/answers');
    };

    // Public API here
    return {
      session: function () {
        return currentSession;
      },
      setSession: function(sessionCode, name){
      	var sessionRef = Ref.child('Session/'+sessionCode);
    		currentSession = $firebaseObject(sessionRef);

    		currentSession.$loaded().then( function(){
    			var player = {
    				Active : true
    			};
      		playerRef = Ref.child('Session/'+sessionCode+'/Players/'+name);
          $rootScope.session = currentSession;
    			playerRef.set(player, function(){
            currentName = name;
            answersArray = $firebaseObject(playerRef);
          });

          var quizRef = Ref.child('Quiz/'+currentSession.Teacher+'/'+currentSession.Quiz);
          var quizObj = $firebaseObject(quizRef);

          quizObj.$loaded().then(function(){
            $rootScope.quiz = quizObj;
          });

          $cookies.put('currentSessionID', currentSession.$id );

          currentSession.$watch(function(newValue){
            console.log('phase',currentSession.QuestionPhase);
            if (currentSession.Launched) {
              if (currentSession.QuestionPhase) {
                loadQuestion();
              } else {
                loadResults();
              }
            }
          });

    			$location.path('student/waiting');
  		  });
      },
      removeSession: function (){
        currentSession = {};
        $cookies.remove('currentSessionID');
      },
      sendAnswer: function (answerID) {
        $rootScope.currentAnswer = $rootScope.session.CurrentQuestion.Answers[answerID];
        $rootScope.currentAnswer.id = answerID;
        console.log($rootScope.session.CurrentQuestion.Answers, answerID);
        currentSession.Players[currentName][currentSession.CurrentQuestion.Answers] = answerID;
      }
    };
  });
