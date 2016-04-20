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
    var hasAnswer = false;


    var loadQuestion = function () {
      $location.path('student/selecting');
      $rootScope.currentAnswer = null;
      $rootScope.currentAnswerID = -1;
    };

    var loadResults = function () {
      $location.path('student/answers');
    };

    var endQuiz = function() {
      $location.path('student/end');
    }

    // Public API here
    return {
      session: function () {
        return currentSession;
      },
      setSession: function(sessionCode, name){
        currentSession = null;
      	var sessionRef = Ref.child('Session/'+sessionCode);
    		currentSession = $firebaseObject(sessionRef);

    		currentSession.$loaded().then( function(){
          // if (currentSession.$id === 'undefined') {
          //   return false;
          // }

    			var player = {
    				Active : true
    			};
      		playerRef = Ref.child('Session/'+sessionCode+'/Players/'+name);
          $rootScope.session = currentSession;
    			playerRef.set(player, function(){
            currentName = name;
            answersArray = $firebaseObject(playerRef);
            hasAnswer = false;

            currentSession.$watch(function(newValue){
              console.log('phase',currentSession.QuestionPhase);
              if (currentSession.Launched) {
                    if (currentSession.QuestionPhase) {
                      if (!hasAnswer) {
                        loadQuestion();
                      }
                    } else {
                      hasAnswer = false;
                      loadResults();
                    }
              } else if(currentSession.QuestionIndex>=0){
                endQuiz();
              }
            });

          });
            

          var quizRef = Ref.child('Quiz/'+currentSession.Teacher+'/'+currentSession.Quiz);
          var quizObj = $firebaseObject(quizRef);

          quizObj.$loaded().then(function(){
            $rootScope.quiz = quizObj;
          });

          $cookies.put('currentSessionID', currentSession.$id );

          $location.path('student/waiting');
          return true;
  		  });
      },
      removeSession: function (){
        currentSession = {};
        $cookies.remove('currentSessionID');
      },
      sendAnswer: function (answerID) {
        hasAnswer = true;
        $rootScope.currentAnswer = $rootScope.session.CurrentQuestion.Answers[answerID];
        $rootScope.currentAnswerID = answerID;
        console.log($rootScope.session.QuestionIndex, answerID);

        playerRef.child($rootScope.session.QuestionIndex).set(answerID);
        // currentSession.Players[currentName][currentSession.CurrentQuestion.Answers] = answerID;
      }
    };
  });
