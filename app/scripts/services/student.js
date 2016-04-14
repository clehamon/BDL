'use strict';

/**
 * @ngdoc service
 * @name bdl6App.student
 * @description
 * # student
 * Factory in the bdl6App.
 */
angular.module('bdl6App')
  .factory('student', function (Ref, $firebaseObject, $location) {

    var currentSession = {};

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
  			}
      		var playerRef = Ref.child('Session/'+sessionCode+'/Players/'+name);

  			playerRef.set(player);

  			$location.path('quiz/stuWait');
  		});
      }
    };
  });
