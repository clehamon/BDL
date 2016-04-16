'use strict';

/**
 * @ngdoc function
 * @name bdl6App.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the bdl6App
 */
angular.module('bdl6App')
  .controller('DashboardCtrl', function ($scope, $uibModal, $location, Ref, $firebaseArray, Auth, Session) {

    $scope.quizArray = $firebaseArray(Ref.child('Quiz/' + Ref.getAuth().uid));
    // display any errors
    // $scope.quizArray.$loaded().catch(alert);
   
   $scope.animationsEnabled = true;

    $scope.open = function (size) {

      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: '../views/newquizmodal.html',
        // windowClass: '../styles/newquizmodal.css',
        controller: 'NewquizmodalCtrl',
        size: size,
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
      });
    };

    $scope.launchSession = function(quizID){
      // var user = Ref.getAuth();
      // var id = user.uid;

      // var min = 1000;
      // var max = 9999;
      // var code = Math.floor(Math.random() * (max - min + 1)) + min;

      // var sessions = Ref.child('Session');

      // var sessionsList = $firebaseArray(sessions);

      // // Check that a session does not exist with the same id, if it does we generate a new code
      // while(sessionsList.$indexFor(code) > 0){
      //   code = Math.floor(Math.random() * (max - min + 1)) + min;
      // }

      // var newSession = {
      //   Teacher : id,
      //   Quiz: quizID,
      //   Launched : false,
      //   QuestionPhase : false,
      //   CurrentQuestion: null,
      //   Timestamp : Ref.ServerValue.TIMESTAMP
      // }

      // var addedSession = sessions.child(code).set(newSession);

      var code = Session.launchSession(quizID);

      // $location.path('quiz/' +code+ '/waiting');

    };

});
