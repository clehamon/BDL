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

    $scope.edit = function (id){
      $location.path('newQuiz/' + id);
    }

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

      var code = Session.launchSession(quizID);

    };

});
