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
          quizObj.$bindTo($rootScope, 'quiz');
        })

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
          CurrentQuestion: null,
          Timestamp : Date.now()
        };

        var addedSession = sessions.child(code).set(newSession, setSession(code, true));

        $cookies.put('currentSessionID', code);

        return code;
      }
    };
  });
