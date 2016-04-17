'use strict';

/**
 * @ngdoc service
 * @name bdl6App.session
 * @description
 * # session
 * Factory in the bdl6App.
 */
angular.module('bdl6App')
  .factory('Session', function (Ref, $firebaseArray, $firebaseObject, $cookies, $rootScope, $location) {

    var currentSession = {};

    // Get a session and its quiz from the code then bind those to rootscope variable
    // if redirect is true we redirect to the session waiting page in the end
    var setSession = function (code, redirect) {

      //Get the session from firebase
      var session = Ref.child('Session/'+code);
      var sessionObj = $firebaseObject(session);

      //Once the session is loaded we can bind it to the rootScope
      sessionObj.$loaded().then(function(){
        sessionObj.$bindTo($rootScope, 'session');
        currentSession = sessionObj;

        //We then get the Quiz and also bind it to the rootScope
        var quizRef = Ref.child('Quiz/'+sessionObj.Teacher+'/'+sessionObj.Quiz);
        var quizObj = $firebaseObject(quizRef);

        quizObj.$loaded().then(function(){
          $rootScope.quiz = quizObj;
        });

        if (redirect) {
          $location.path('quiz/' +code+ '/waiting');
        }
      });
    };

    //look into the cookie for a current session code, if so we set it
    var cookieSession = $cookies.get('currentSessionID');
    if (cookieSession) {
      setSession(cookieSession);
    }

    // Public API here
    return {
      getSession: function () {
        return currentSession;
      },
      // Create a session from the quiz whose id is passed as arguments
      // Put the newly created session code in the cookies
      // call setSession
      launchSession : function(quizID){
        var user = Ref.getAuth();
        var id = user.uid;

        var min = 1000;
        var max = 9999;
        var code = Math.floor(Math.random() * (max - min + 1)) + min;

        var sessions = Ref.child('Session');

        var sessionsList = $firebaseArray(sessions);

        // Check that a session does not exist with the same id, if it does we generate a new code
        while(sessionsList.$indexFor(code) > 0){
          code = Math.floor(Math.random() * (max - min + 1)) + min;
        }

        var newSession = {
          Teacher : id,
          Quiz: quizID,
          Launched : false,
          QuestionPhase : false,
          QuestionIndex : -1,
          CurrentQuestion: {
            active : false
          },
          Timestamp : Date.now()
        };

        var addedSession = sessions.child(code).set(newSession, setSession(code, true));

        $cookies.put('currentSessionID', code);

        return code;
      },
      nextQuestion : function(callback){

          $rootScope.session.QuestionIndex = ($rootScope.session.QuestionIndex++)%$rootScope.quiz.Questions.length;

         //As long as we haven't reach the last question
         if ($rootScope.session.QuestionIndex < $rootScope.quiz.Questions.length) {

          var questionRef = Ref.child('Question/'+$rootScope.quiz.Questions[$rootScope.session.QuestionIndex]);
          var questionObj = $firebaseObject(questionRef);

          questionObj.$loaded().then(function(){

            console.log(questionObj);

            currentSession.CurrentQuestion = questionObj;

            currentSession.$save().then(function(){
              //If the question is a multiple choice we load the answers
              if (questionObj.Type === 'multiple') {
                var answerRef = Ref.child('Answer/'+$rootScope.quiz.Questions[$rootScope.session.QuestionIndex]);
                var answerArray = $firebaseArray(answerRef);

                console.log($rootScope.session.CurrentQuestion);

                answerArray.$loaded().then(function(){
                  $rootScope.session.CurrentQuestion.Answers = answerArray;
                  $rootScope.session.QuestionPhase = true;
                  callback();
                });

              }
            });
            
          });
          
         } else {
            console.log('Bouhouhou end of the quiz');
         }
      }
    };
  });
